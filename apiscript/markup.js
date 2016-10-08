/*eslint max-statements: "off"*/
/*eslint quotes: "off"*/

let modalElem = null;
let formElem = null;
let commentInputElem = null;
let toInputElem = null;
let fromInputElem = null;
let titleInputElem = null;
let buttonElem = null;
let selectedText = '';

const apiEndpoint = 'http://getmarkup.com/api/annotate';

const half = 2;
const arrowHeight = 20;
const padding = 20;
const elemPrefix = 'frolicking-tuba-modal';

const hideModal = () => {
  modalElem.parentNode.removeChild(modalElem);
  modalElem = null;
  formElem = null;
};

const clicked = (event) => {
  const selection = window.getSelection();

  if (selection) {
    selectedText = selection;
    showModal(event);
  } else if (modalElem && !event.target.id.startsWith(elemPrefix)) {
    hideModal();
  }
};

const buildButton = () => {
  buttonElem = document.createElement('div');
  buttonElem.id = 'frolicking-tuba-open-button';

  buttonElem.addEventListener('click', clicked);

  return buttonElem;
};

const buildModal = () => {
  modalElem = document.createElement('div');
  modalElem.id = elemPrefix;

  formElem = document.createElement('form');
  formElem.id = `${elemPrefix}-feedback`;

  titleInputElem = document.createElement('input');
  titleInputElem.id = `${elemPrefix}-title-input`;
  titleInputElem.type = 'text';
  titleInputElem.minlength = 1;
  titleInputElem.placeholder = 'Title';

  commentInputElem = document.createElement('textarea');
  commentInputElem.id = `${elemPrefix}-comment`;
  commentInputElem.minlength = 1;
  commentInputElem.placeholder = 'Enter your comments here';

  toInputElem = document.createElement('input');
  toInputElem.id = `${elemPrefix}-to-input`;
  toInputElem.type = 'text';
  toInputElem.minlength = 1;
  toInputElem.placeholder = 'Message to';

  fromInputElem = document.createElement('input');
  fromInputElem.id = `${elemPrefix}-from-input`;
  fromInputElem.type = 'text';
  fromInputElem.minlength = 1;
  fromInputElem.placeholder = 'Message from';

  const submitElem = document.createElement('input');

  submitElem.id = `${elemPrefix}-submit`;
  submitElem.type = 'submit';
  submitElem.value = 'send';

  modalElem.appendChild(formElem);
  formElem.appendChild(titleInputElem);
  formElem.appendChild(commentInputElem);
  formElem.appendChild(toInputElem);
  formElem.appendChild(fromInputElem);
  formElem.appendChild(submitElem);

  formElem.onsubmit = submitForm;

  return modalElem;
};

const submitForm = (event) => {
  event.preventDefault();

  const request = new XMLHttpRequest();

  request.open('POST', apiEndpoint, true);
  request.setRequestHeader('Content-Type', 'application/json');

  request.send(JSON.stringify({
    title: titleInputElem.value,
    comment: commentInputElem.value,
    to: toInputElem.value,
    from: fromInputElem.value,
    selected: selectedText,
    key: '%KEY%',
    location: location.href
  }));

  hideModal();
};

const showModal = () => {
  if (!modalElem) {
    document.body.appendChild(buildModal());
  }

  setTimeout(() => {
    modalElem.style.opacity = 1;
    modalElem.style.transform = 'translate(0, 0)';
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const modalStyleElem = document.createElement('style');

  modalStyleElem.innerHTML = `%CSS%`;
  document.body.appendChild(modalStyleElem);

  document.body.appendChild(buildButton());
});
