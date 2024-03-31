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
  input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      console.log(input.value);
      sendInput(input.value);
    }
  });
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
