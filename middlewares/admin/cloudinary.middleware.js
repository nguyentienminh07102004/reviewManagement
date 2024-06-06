const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const upload = (req, res, next) => {
    // Kiểm tra xem có file hay không do có thể người dùng không upload ảnh
    if(req.file){
      let streamUpload = (req) => {
          return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };
    const upload = async (req) => {
      let result = await streamUpload(req);
      console.log(result);
      req.body[req.file.fieldname] = result.url;
      next();
    }
    upload(req);
  } else {
    next();
  }
}

module.exports = { upload };
