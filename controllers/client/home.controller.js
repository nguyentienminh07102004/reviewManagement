const index = (req, resp) => {
  resp.render("client/pages/home/index.pug", {
    title: "Home Page"
  });
};
module.exports = {index};