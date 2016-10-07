let modalElem = null;
let formElem = null;
let commentInputElem = null;
let toInputElem = null;
let fromInputElem = null;
let titleInputElem = null;
let cssAdded = false;
let selectedText = '';

const modalCSS = '%CSS%';

const apiEndpoint = 'http://getmarkup.com/api/annotate';

const half = 2;
const arrowHeight = 20;
const padding = 20;

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

const buildModal = () => {
  modalElem = document.createElement('div');
  modalElem.id = 'frolicking-tuba-modal';

  formElem = document.createElement('form');
  formElem.id = 'frolicking-tuba-modal-feedback';

  titleInputElem = document.createElement('input');
  titleInputElem.id = 'frolicking-tuba-modal-title-input';
  titleInputElem.type = 'text';
  titleInputElem.minlength = 1;
  titleInputElem.placeholder = 'Title';

  commentInputElem = document.createElement('textarea');
  commentInputElem.id = 'frolicking-tuba-modal-comment';
  commentInputElem.minlength = 1;
  commentInputElem.placeholder = 'Enter your comments here';

  toInputElem = document.createElement('input');
  toInputElem.id = 'frolicking-tuba-modal-to-input';
  toInputElem.type = 'text';
  toInputElem.minlength = 1;
  toInputElem.placeholder = 'Message to';

  fromInputElem = document.createElement('input');
  fromInputElem.id = 'frolicking-tuba-modal-from-input';
  fromInputElem.type = 'text';
  fromInputElem.minlength = 1;
  fromInputElem.placeholder = 'Message from';

  const submitElem = document.createElement('input');

  submitElem.id = 'frolicking-tuba-modal-submit';
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

const getSelectedText = () => {
  const selection = window.getSelection();

  if (selection.toString()) {
    return selection.toString();
  }

  return false;
};

const setupModal = (event) => {
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

const createModalStyleEle = () => {
  const modalStyleEle = document.createElement('style');

  modalStyleEle.innerHTML = modalCSS;
  document.body.appendChild(modalStyleEle);
};

const showModal = (event) => {
  if (!cssAdded) {
    createModalStyleEle();
    cssAdded = true;
  }

  if (!modalElem) {
    document.body.appendChild(buildModal());
  }

  setupModal(event);
};

const clicked = (event) => {
  const selection = getSelectedText();

  if (selection) {
    selectedText = selection;
    showModal(event);
  } else if (
      modalElem
      && !event.target.id.startsWith('frolicking-tuba-modal')) {
    hideModal();
  }
};

document.addEventListener('mouseup', clicked);
