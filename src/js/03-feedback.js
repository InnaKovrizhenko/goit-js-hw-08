import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  inputEmail: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.inputEmail.addEventListener('input', throttle(setLocalStorage, 500));
refs.textarea.addEventListener('input', throttle(setLocalStorage, 500));

populateTextarea();

function setLocalStorage() {
  const userData = {
    email: refs.inputEmail.value,
    message: refs.textarea.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
}

function onFormSubmit(event) {
  event.preventDefault();

  if (!refs.inputEmail.value || !refs.textarea.value) {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
  console.log({
    email: refs.inputEmail.value,
    message: refs.textarea.value,
  });

  event.target.reset();
}

function populateTextarea() {
  const userDataSaved = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (userDataSaved) {
    refs.textarea.value = userDataSaved.message;
    refs.inputEmail.value = userDataSaved.email;
  }
}
