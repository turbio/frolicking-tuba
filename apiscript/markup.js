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

const buildButton = () => {
  buttonElem = document.createElement('div');
  buttonElem.id = 'frolicking-tuba-open-button';

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

const positionModal = (event) => {
  let xpos = event.pageX - (modalElem.clientWidth / half);
  let ypos = event.pageY
    - (modalElem.clientHeight + arrowHeight + padding);
  const mw = 328;

  ypos = ypos < 0 ? 0 : ypos;
  xpos = xpos < 0 ? 0 : xpos;
  xpos = xpos > window.innerWidth - mw ? window.innerWidth - mw : xpos;

  modalElem.style.top = `${ypos}px`;
  modalElem.style.left = `${xpos}px`;

  modalElem.style.opacity = 1;
  modalElem.style.transform = 'translate(0, 0)';
};

const showModal = (event) => {
  if (!modalElem) {
    document.body.appendChild(buildModal());
  }

  positionModal(event);
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

document.addEventListener('mouseup', clicked);

document.addEventListener('DOMContentLoaded', () => {
  const modalStyleEle = document.createElement('style');

  modalStyleEle.innerHTML = `%CSS%`;
  document.body.appendChild(modalStyleEle);

  document.body.appendChild(buildButton());
});
