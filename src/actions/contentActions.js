import { createTerminalContainer, createTerminalInput } from "./domActions";

function displayAllTabs(response) {
  // console.log(response);
  // response.forEach(function (tab) {
  //   let body = document.getElementsByTagName("body")[0];
  //   let p = document.createElement("p");
  //   p.textContent = tab.title;
  //   body.appendChild(p);
  // });
}

function openTerminal() {
  let container = createTerminalContainer();
  let input = createTerminalInput();
  container.appendChild(input);
  // Append the div to the document body
  document.body.appendChild(container);
  return container;
}

function closeTerminal(terminal) {
  terminal.remove();
}

export { displayAllTabs, openTerminal, closeTerminal };
