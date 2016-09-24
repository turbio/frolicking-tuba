(() => { // eslint-disable-line max-statements
  const modalHTML = `
      %HTML%
    `;
  const modalCSS = `
    <style>
      %CSS%
    </style>`;
  const apiEndpoint = 'http://localhost:3000/annotate';

  let modalElem = null;
  let formElem = null;
  let commentElem = null;
  let cssAdded = false;
  let selectedText = '';

  const half = 2;
  const arrowHeight = 20;
  const padding = 20;


  const getSelectedText = () => {
    let text = '';

    if (typeof window.getSelection !== 'undefined') {
      text = window.getSelection().toString();
    } else if (
        typeof document.selection !== 'undefined'
        && document.selection.type === 'Text') {
      text = document.selection.createRange().text;
    }

    return text;
  };

  const setupModal = (event) => {
    const xpos = event.clientX - (modalElem.clientWidth / half);
    const ypos = event.clientY
      - (modalElem.clientHeight + arrowHeight + padding);

    modalElem.style.top = `${ypos}px`;
    modalElem.style.left = `${xpos}px`;

    modalElem.style.opacity = 1;
    modalElem.style.transform = 'translate(0, 0)';
  };

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
      comment: commentElem.value,
      selected: selectedText
    }));

    hideModal();
  };

  const showModal = (event) => {
    if (!cssAdded) {
      document.body.innerHTML += modalCSS;
      cssAdded = true;
    }

    if (!modalElem) {
      document.body.innerHTML += modalHTML;
      modalElem = document.getElementById('frolicking-tuba-modal');
      formElem = document.getElementById('frolicking-tuba-modal-feedback');
      commentElem = document.getElementById('frolicking-tuba-modal-comment');
      formElem.onsubmit = submitForm;
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
})();
