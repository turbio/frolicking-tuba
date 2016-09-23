(() => {
  console.log('loaded...');

  const modalHTML = `
  <div
      style="
        background: #fff;
        border: 2px #ccc solid;
        overflow: hidden;
        max-width: 200px;
        position: absolute;
        font-family: Helvetica,sans-serif"
      id="frolicking-tuba-modal">
    <div
        style="
          position: absolute;
          top: 0;
          right: 0;"
        id="frolicking-tuba-modal-close">
      <a href="#" style="text-decoration: none; color: #888;"><b>X</b></a>
    </div>
    <form
        id="frolicking-tuba-modal-feedback"
        method="POST"
        action="#"
        accept-charset="UTF-8">
      <textarea
        style="
          border: none;
          outline: none;
          height: 90%;
          width: 90%;
          padding: 5%;
          resize: none;
          font-family: Helvetica,sans-serif;
          font-size: 16px"
        required
        name="message"
        cols="48"
        rows="8"
        placeholder="message"></textarea>
      <hr
        style="
          height: 2px;
          background: #ccc;
          border: none;
          margin: 0;"/>
      <input
        style="
          background: none;
          border: none;
          color: #3b98ff;
          font-size: 16px;
          font-weight: 600;
          margin: 8px;
          float: right;"
        type="submit"
        name="feedbackForm"
        value="send">
    </form>
  </div>`;

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

  // When the user clicks on <span> (x), close the modal
  closeLink.onclick = () => {
    modal.style.display = 'none';
    loadListeners();
  };

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
