let formRestore = document.querySelector('[form-restore]');
const path = formRestore.getAttribute('data-path');

const restoreButton = document.querySelectorAll('[button-restore]');
if(restoreButton.length > 0){
  restoreButton.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      formRestore.action = path + `/restore/${id}?_method=PATCH`;
      formRestore.submit();
    });
  });
}

const deletePermaently = document.querySelectorAll('[button-delete-permaently]');
if(deletePermaently.length > 0){
  deletePermaently.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      formRestore.action = path + `/delete-permaently/${id}?_method=PATCH`;
      formRestore.submit();
    });
  });
}