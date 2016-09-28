(() => { // eslint-disable-line max-statements
  const modalHTML = `
      %HTML%
    `;
  const modalCSS = `
    <style>
      %CSS%
    </style>`;
  const apiEndpoint = 'http://localhost:3000/api/annotate';

  let modalElem = null;
  let formElem = null;
  let commentElem = null;
  let toElem = null;
  let fromElem = null;
  let titleElem = null;
  let cssAdded = false;
  let selectedText = '';

  const half = 2;
  const arrowHeight = 20;
  const padding = 20;


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
      title: titleElem.value,
      comment: commentElem.value,
      to: toElem.value,
      from: fromElem.value,
      selected: selectedText
    }));

    hideModal();
  };

  const getElements = () => {
    document.body.innerHTML += modalHTML;
    modalElem = document.getElementById('frolicking-tuba-modal');
    formElem = document.getElementById('frolicking-tuba-modal-feedback');
    commentElem = document.getElementById('frolicking-tuba-modal-comment');
    toElem = document.getElementById('frolicking-tuba-modal-enterTo');
    fromElem = document.getElementById('frolicking-tuba-modal-enterFrom');
    titleElem = document.getElementById('frolicking-tuba-modal-enterTitle');
    formElem.onsubmit = submitForm;
  };

  const showModal = (event) => {
    if (!cssAdded) {
      document.body.innerHTML += modalCSS;
      cssAdded = true;
    }

    if (!modalElem) {
      getElements();
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
