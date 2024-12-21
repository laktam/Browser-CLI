import React, { useState } from 'react';
import './terminal.css';  

function Terminal() {
  const [input, setInput] = useState("");
  console.log("from react function")
  return (
    <div id="terminal-container">
      <div id="terminal-header">
        <div id="start">Command Prompt</div>
        <div id="end">
          <button id="minimize-button">_</button>
          <button id="maximize-button">□</button>
          <button id="close-button">X</button>
        </div>
      </div>
      <div id="terminal-body">
        <div className="output" id="output">
        </div>
        <div className="terminal-input">
          <span className="cli-prompt">{">"}</span>
          <input
            type="text"
            id="cli-command-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            // onKeyDown={handleCommandInput}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
