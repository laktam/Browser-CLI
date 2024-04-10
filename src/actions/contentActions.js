import {
  createResultSection,
  createTerminalContainer,
  createTerminalInput,
} from "./domActions";

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
  let resultSection = createResultSection();
  let span = document.createElement("span");
  span.textContent = "Browser CLI >";
  let input = createTerminalInput();

  container.appendChild(resultSection);
  container.appendChild(span);
  container.appendChild(input);
  document.body.appendChild(container);
  input.focus();
  return container;
}

function closeTerminal(terminal) {
  terminal.remove();
}

function sendInput(command) {
  chrome.runtime.sendMessage({ action: "command", command });
}

export { displayAllTabs, openTerminal, closeTerminal, sendInput };
