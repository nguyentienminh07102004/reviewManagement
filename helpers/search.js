let Search = (query) => {
  let key = {
    keyword: ""
  };
  if(query.keyword){
    key.keyword = query.keyword;
    const regex = new RegExp(key.keyword, "i"); // i là không phân biệt chữ hoa chữ thường
    key.regex = regex;
  }
  return key;
}

module.exports = Search;