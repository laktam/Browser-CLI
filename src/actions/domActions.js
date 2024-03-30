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

function createTerminalInput() {
  const input = document.createElement("input");
  input.style.width = "100%";
  //   input.style.height = "30px";
  input.style.padding = "6px";
  input.style.boxSizing = "border-box";
  input.style.border = "1px solid #ccc";
  return input;
}

export { createTerminalContainer, createTerminalInput };
