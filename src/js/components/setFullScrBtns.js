import hideItherMainElems from "../utility/hideOtherMainElems";

// add full screen buttons to each main element
export default function () {
  // get all main elements
  const main = document.querySelector("main");
  const mainElements = Array.from(main.children);

  // create button for each element, add even listener, prepend button to parent block
  mainElements.map((e) => {
    const fullScreenButton = document.createElement("div");
    fullScreenButton.classList.add("fullscreen-btn");
    fullScreenButton.addEventListener("click", () => {
      fullScreenButton.classList.toggle("fullscreen-btn--on");
      fullScreenButton.parentElement.classList.toggle("full-screen-mode");
      hideItherMainElems(fullScreenButton.parentElement);
    });
    e.prepend(fullScreenButton);
    return null;
  });
}
