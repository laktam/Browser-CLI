import { sendInput } from "./contentActions";

function createTerminalContainer() {
  const terminal = document.createElement("div");

  terminal.style.position = "fixed";
  terminal.style.bottom = "0";
  terminal.style.width = "100%";
  terminal.style.backgroundColor = "#f0f0f0";
  terminal.style.padding = "10px 25px";
  terminal.style.boxSizing = "border-box";
  terminal.style.borderTop = "1px solid #ccc";

  return terminal;
}

function createResultSection() {
  const div = document.createElement("div");
  div.setAttribute("id", "terminalResultSection");
  div.style.height = "40%";
  div.style.boxSizing = "border-box";
  div.style.width = "100%";
  div.style.padding = "10px 31px";

  return div;
}

function createTerminalInput() {
  const input = document.createElement("input");
  input.setAttribute("id", "terminal-input");
  input.style.width = "100%";
  //   input.style.height = "30px";
  input.style.padding = "6px";
  input.style.boxSizing = "border-box";
  input.style.border = "1px solid #ccc";
  input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      console.log(input.value);
      sendInput(input.value);
    }
  });
  return input;
}

function ls(data) {
  const resultSection = document.getElementById("terminalResultSection");
  console.log("resultsecion", resultSection);
  let s = "";
  for (let tab of data) {
    s += `<p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${tab}</p>`;
  }
  resultSection.innerHTML = s;
}

function find(data) {
  const resultSection = document.getElementById("terminalResultSection");
  console.log("resultsecion", resultSection);
  let s = "";
  for (let tab of data) {
    s += `<p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${tab}</p>`;
  }
  resultSection.innerHTML = s;
}

function pwd(data) {
  const resultSection = document.getElementById("terminalResultSection");
  resultSection.innerHTML = `<p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${data}</p>`;
}

export {
  createTerminalContainer,
  createTerminalInput,
  createResultSection,
  ls,
  find,
  pwd,
};
