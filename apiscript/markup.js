(() => { // eslint-disable-line max-statements
  const modalHTML = `
      %HTML%
    `;
  const modalCSS = `
    <style>
      %CSS%
    </style>`;

  let modalElem = null;
  let cssAdded = false;
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
  };

  const showModal = (event) => {
    console.log(event);
    if (!cssAdded) {
      document.body.innerHTML += modalCSS;
      cssAdded = true;
    }

    document.body.innerHTML += modalHTML;
    modalElem = document.getElementById('frolicking-tuba-modal');
    setupModal(event);
  };

  const clicked = (event) => {
    const selectedText = getSelectedText();

    if (modalElem && !event.target.id.startsWith('frolicking-tuba-modal')) {
      hideModal(event);
    } else if (selectedText) {
      showModal(event);
    }
  };

  document.addEventListener('mouseup', clicked);
})();
