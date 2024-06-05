const pagination = (page, query, countProducts) => {
  if (query.page) {
    page.currentPage = parseInt(query.page);
  }

  page.skip = (page.currentPage - 1) * page.limitItem;

  page.totalPage = Math.ceil(countProducts / page.limitItem);

  if(page.totalPage === 1){
    page.currentPage = 1;
  }
}

module.exports = pagination;