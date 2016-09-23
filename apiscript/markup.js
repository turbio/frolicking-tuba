(() => { // eslint-disable-line max-statements
  const modalHTML = `
  <div id="frolicking-tuba-modal" style="width: 200px">
    <form
        id="frolicking-tuba-modal-feedback"
        method="POST"
        action="#"
        accept-charset="UTF-8">
      <textarea
        required
        id="frolicking-tuba-modal-comment"
        placeholder="message"></textarea>
      <hr id="frolicking-tuba-modal-hr"/>
      <input type="submit" id="frolicking-tuba-modal-submit" value="send">
    </form>
  </div> `;

  const modalCSS = `
    <style>
    #frolicking-tuba-modal:after, #frolicking-tuba-modal:before {
        top: 100%;
        left: 50%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }
    #frolicking-tuba-modal:after {
        border-top-color: #fff;
        border-width: 20px;
        margin-left: -20px;
    }
    #frolicking-tuba-modal:before {
        border-top-color: #ccc;
        border-width: 22px;
        margin-left: -22px;
    }
    #frolicking-tuba-modal{
      background: #fff;
      border: 2px #ccc solid;
      position: absolute;
      font-family: Helvetica,sans-serif;

      opacity: 0;
      transform: translate(0, 10px);
      transition: all .25s;
    }
    #frolicking-tuba-modal-comment{
      border: none;
      outline: none;
      height: 50px;
      width: 90%;
      padding: 5%;
      resize: none;
      font-family: Helvetica,sans-serif;
      font-size: 16px;
    }
    #frolicking-tuba-modal-submit{
      cursor: pointer;
      background: none;
      border: none;
      color: #3b98ff;
      font-size: 16px;
      font-weight: 600;
      margin: 8px;
      float: right;
    }
    #frolicking-tuba-modal-hr{
      height: 2px;
      background: #ccc;
      border: none;
      margin: 0;
    }
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
