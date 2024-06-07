const buttonChangeStatus = document.querySelectorAll('[button-change-status]');
if (buttonChangeStatus) {
  buttonChangeStatus.forEach(button => {
    let formChangeStatus = document.querySelector('[form-change-status]');
    button.addEventListener('click', () => {
      const path = formChangeStatus.getAttribute('data-path');
      const id = button.getAttribute('button-data-id');
      let status = button.getAttribute('button-data-status');
      if(status === "active") status = "inactive";
      else status = "active";
      formChangeStatus.action = path + `/${id}/${status}?_method=PATCH`; // cài method_override để gửi lên bằng phương thức patch
      formChangeStatus.submit();
    });
  });
}

// Xoá 1 sản phẩm
const deleteButton = document.querySelectorAll("[button-delete]");
if(deleteButton.length > 0){
  deleteButton.forEach(button => {
    let formDelete = document.querySelector('[form-delete-product]');
    button.addEventListener('click', () => {
      const isDelete = window.confirm("Do you want to delete this product ?");
      if(isDelete === false) return;
      const path  =formDelete.getAttribute('data-path');
      const id = button.getAttribute('data-id');
      formDelete.action = path + `/${id}?_method=DELETE`;
      formDelete.submit();
    });
  });
}
