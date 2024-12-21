export const terminalContainer = document.createElement('div');
terminalContainer.id = "terminal-container";

terminalContainer.innerHTML = `
  <div id="terminal-header">
    <div id="start">
        Command Prompt
    </div>
    <div id="end">
      <span class="terminal-header-button" id="minimize-button">_</span>
      <span class="terminal-header-button" id="maximize-button">□</span>
      <span class="terminal-header-button" id="close-button">X</span>
    </div>
  </div>
  <div id="terminal">
    <div class="output" id="output">
      Browser CLI
      <br>
      Type help to view command list or help {command} for specific command syntax.
      <br><br>
    </div>
    <div class="terminal-input">
      <span class="cli-prompt">></span>
      <input type="text" id="commandInput" autocomplete="off">
    </div>
  </div>
`;