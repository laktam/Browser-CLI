function createTerminalContainer() {
  const terminal = document.createElement("div");

  // Style the div to resemble a typing box
  terminal.style.position = "fixed";
  terminal.style.bottom = "0";
  terminal.style.width = "100%";
  terminal.style.backgroundColor = "#f0f0f0";
  terminal.style.padding = "10px";
  terminal.style.boxSizing = "border-box";
  terminal.style.borderTop = "1px solid #ccc";
  // Set content or placeholder text

  return terminal;
}

function createTerminalInput() {
  const input = document.createElement("input");
  input.style.width = "100%";
  input.style.height = "30px";
  input.style.padding = "10px";
  input.style.border = "1px solid #ccc";
  return input;
}

export { createTerminalContainer, createTerminalInput };
