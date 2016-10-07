(() => { // eslint-disable-line max-statements
  const modalHTML = `
      %HTML%
    `;
  const modalCSS = `
      %CSS%
    `;
  const apiEndpoint = '/api/annotate';

  let frolickingTubaSelectedFile = null;
  let fileInputEle = null;
  let modalElem = null;
  let formElem = null;
  let cssAdded = false;
  let selectedText = '';
  // let commentElem = null;
  // let toElem = null;
  // let fromElem = null;
  // let titleElem = null;

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

    const dataForm = new FormData(formElem);
    const request = new XMLHttpRequest();

    dataForm.append('selected', selectedText);
    dataForm.append('key', '%KEY%');
    request.open('POST', apiEndpoint, true);
    request.send(dataForm);
    hideModal();
  };

  const createModalEle = () => {
    const modalEle = document.createElement('div');

    modalEle.id = 'frolicking-tuba-modal';
    modalEle.innerHTML = modalHTML;
    console.log(modalEle);
    document.body.appendChild(modalEle);
  };

  const handleFileInput = (event) => {
    //check to see if user's browser can handle the file input method
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      frolickingTubaSelectedFile = event.target.files[0];
      console.log('selected file is: ', frolickingTubaSelectedFile);
    } else {
      console.log('File input is not fully supported by your browser.');
    }
  };

  const getElements = () => {
    //document.body.innerHTML += modalHTML;
    createModalEle();
    modalElem = document.getElementById('frolicking-tuba-modal');
    formElem = document.getElementById('frolicking-tuba-modal-feedback');
    // commentElem = document.getElementById('frolicking-tuba-modal-comment');
    // toElem = document.getElementById('frolicking-tuba-modal-enterTo');
    // fromElem = document.getElementById('frolicking-tuba-modal-enterFrom');
    // titleElem = document.getElementById('frolicking-tuba-modal-enterTitle');
    fileInputEle = document.getElementById('frolicking-tuba-modal-attachment');
    fileInputEle.addEventListener('change', handleFileInput);
    formElem.onsubmit = submitForm;
  };

  const createModalStyleEle = () => {
    const modalStyleEle = document.createElement('style');

    modalStyleEle.innerHTML = modalCSS;
    document.body.appendChild(modalStyleEle);
  };

  const showModal = (event) => {
    if (!cssAdded) {
      createModalStyleEle();
      //document.body.innerHTML += modalCSS;
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

  //fileInputEle.addEventListener('change', handleFileInput);

  document.addEventListener('mouseup', clicked);
})();
