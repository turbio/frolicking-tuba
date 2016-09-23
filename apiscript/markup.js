(() => {
  console.log('loaded...');

  const modalHTML = `
  <div id="frolicking-tuba-modal">
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
  </div>
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
      max-width: 200px;
      position: absolute;
      font-family: Helvetica,sans-serif;
    }
    #frolicking-tuba-modal-comment{
      border: none;
      outline: none;
      height: 90%;
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

  document.write(modalHTML);

  // Get the modal
  const modal = document.getElementById('frolicking-tuba-modal');
  const closeLink = document.getElementById('frolicking-tuba-modal-close');
  const form = document.getElementById('frolicking-tuba-modal-feedback');

  let selectedText = '';

  const getSelectedText = () => {
    let text = '';

    if (typeof window.getSelection !== 'undefined') {
      //console.log("window",window.getSelection())
      text = window.getSelection().toString();
    } else if (
        typeof document.selection !== 'undefined'
        && document.selection.type === 'Text') {
      text = document.selection.createRange().text;
    }

    return text;
  };

  const doSomethingWithSelectedText = () => {
    const text = getSelectedText();

    if (text !== '') {
      selectedText = text;
      modal.style.display = 'block';
    }
  };

  const loadListeners = () => {
    document.addEventListener('mouseup', doSomethingWithSelectedText);
    document.addEventListener('keyup', doSomethingWithSelectedText);
  };

  const removeListener = () => {
    document.removeEventListener('mouseup', doSomethingWithSelectedText);
    document.removeEventListener('keyup', doSomethingWithSelectedText);
  };

  const checkForm = (event) => {
    event.preventDefault();

    const form = (event.target) ? event.target : event.srcElement;

    if (form.name.value === '') {
      form.name.focus();

      return false;
    } else if (form.email.value === '') {
      form.email.focus();

      return false;
    } else if (form.message.value === '') {
      form.message.focus();

      return false;
    }

    return true;
  };


  //window.attachEvent("onload", modal_init);

  form.onsubmit = (event) => {
    if (checkForm(event)) {
      console.log('submitted', selectedText);
      modal.style.display = 'none';
      removeListener();
    }
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      loadListeners();
    }
  };

  //make this an add event listener, and then remove this listener when we load
  loadListeners();
})();
