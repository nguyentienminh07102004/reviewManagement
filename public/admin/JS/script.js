let buttons = window.document.querySelectorAll("[button-status]");
let url = new URL(window.location.href);
if (buttons.length > 0) {
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      //let url = new URL(window.location.href);
      let status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
      console.log(url.href);
    });
  });
}

// form Search
let formSearch = document.querySelector("#form-search");
if(formSearch){

  //addEventListener là lắng nghe sự kiện
  formSearch.addEventListener("submit", (evt) => {
    evt.preventDefault(); // ngăn chặn việc submit sẽ ngay lập tức reload lại trang và sẽ xoá hết các dưx liệu tìm kiếm khác như bộ lọc mà chỉ còn kiếm bằng từ khoá
    const keyword = evt.target.elements.keyword.value;
    if(keyword){
      url.searchParams.set("keyword", keyword);
    }else{
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
    console.log(url.href);
  });
}

// Pagination
let buttonsPagination = document.querySelectorAll("[button-page]");
if(buttonsPagination){
  buttonsPagination.forEach(button => {
    let url = new URL(window.location.href);
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-page");
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}

// Check Multi
const checkBoxMulti = document.querySelector('[check-box-multi]');
if(checkBoxMulti){
  let checkboxAll = checkBoxMulti.querySelector("input[name='checkall']");
  let checkboxs = checkBoxMulti.querySelectorAll('input[name="id"]');

  checkboxAll.addEventListener('click', () => {
    checkboxs.forEach(checkbox => checkbox.checked = checkboxAll.checked);
  });

  checkboxs.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
      const countChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked").length;
      checkboxAll.checked = countChecked === checkboxs.length ? true : false;
    });
  }); 
}
// End Check multi

//Form change multi
const formChangeMulti = document.querySelector('[form-change-multi]');
if(formChangeMulti){
  formChangeMulti.addEventListener("submit", (evt) => {
    evt.preventDefault();
    let inputIDs = formChangeMulti.querySelector("input[name='ids']");
    const checkedBoxes = document.querySelector("[check-box-multi]").querySelectorAll("input[name='id']:checked");

    if(evt.target.elements.type.value === 'delete-multi'){
      const isDelete = window.confirm('Do you want to delete all ?');
      if(!isDelete) return;
    }

    if(checkedBoxes.length > 0){
      if(evt.target.elements.type.value === 'change-position'){
        inputIDs.value = Array.from(checkedBoxes).map(checkbox => checkbox.value + "-" + checkbox.closest('tr').querySelector("input[name='position']").value).join(", ");
      }
      else inputIDs.value = Array.from(checkedBoxes).map(checkBox => checkBox.value).join(", ");
      
      formChangeMulti.submit();
    } else{
      window.alert("Please choose item !!!!");
    }
  });
}

// Show alert
const showAlert = document.querySelector('[show-alert]');
if(showAlert){
  const time = parseInt(showAlert.getAttribute('data-time'));
  const closeAlert = showAlert.querySelector('[close-alert]');
  closeAlert.addEventListener('click', () => {
    showAlert.classList.add('alert-hidden');
  });

  setTimeout(() => {
    showAlert.classList.add('alert-hidden');
  }, time);
}

// Preview image
const imageInputGroup = document.querySelector("[image-input-group]");
if(imageInputGroup){
  let imageInput = imageInputGroup.querySelector("[image-input]");
  let imagePreview = imageInputGroup.querySelector("[image-preview");
  let buttonClear = imageInputGroup.querySelector("[clear-image-preview]");
  imageInput.addEventListener("change", (evt) => {
    let file = evt.target.files[0];
    console.log(file);
    if(file){
      imagePreview.src = URL.createObjectURL(file);
      buttonClear.classList.remove("button-clear-none");
    }
  });
  buttonClear.addEventListener("click", () => {
    imagePreview.src = "#";
    imageInput.value = "";
    buttonClear.classList.add("button-clear-none");
  });
}

// Sắp xếp theo tiêu chí
const sortByCriteria = document.querySelector("[sort]");
if(sortByCriteria){
  const sortSelect = sortByCriteria.querySelector("[sort-select]");
  if(sortSelect){
    sortSelect.addEventListener("change", (e) => {
      const [sortKey, sortValue] = e.target.value.split("-");
      url.searchParams.set("sortKey", sortKey);
      url.searchParams.set("sortValue", sortValue);
      window.location.href = url;
    });
  }
  const buttonClear = sortByCriteria.querySelector("[sort-clear]");
  buttonClear.addEventListener("click", () => {
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");
    window.location.href = url;
  });

  const sortKey = url.searchParams.get("sortKey");
  if(sortKey){
    sortSelect.querySelector(`option[value='${sortKey}-${url.searchParams.get("sortValue")}']`).selected = true;
  }
}