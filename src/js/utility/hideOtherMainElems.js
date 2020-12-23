// function hide all main child elemnts except one, passed as arg
// self invoking to avoid unnesessary code in module
export default (function () {
  // closure used to set timeout on toggle fullscreen if app in fullscreen mode
  let currentMode = "visible";

  return function (notHiddenElem) {
    // get main children
    const main = document.querySelector("main");
    const mainElements = Array.from(main.children);

    // set timeout time depends on closure statement
    const timeout = currentMode === "visible" ? 0 : 300;

    // change closure statement value
    currentMode = timeout === 0 ? "hidden" : "visible";

    // hide elements by toggle class
    mainElements.map((e) => {
      if (e !== notHiddenElem) {
        setTimeout(() => {
          e.classList.toggle("hiden-mode");
        }, timeout);
      }
      return null;
    });
  };
})();
