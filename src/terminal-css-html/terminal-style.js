const terminalStyle = `
  * {
    box-sizing: border-box;
  }
  #terminal-container {
    margin: 0;
    padding: 0;

    background-color: white; /* #282a36; */
    font-family: 'Courier New', Courier, monospace;
    color: white;
    display: flex;
    flex-direction : column;
    justify-content: center; /* Horizontal centering */
    align-items: center;    /* Vertical centering */
    position: fixed;
    
    

    width: 700px;
    height: 350px;
    user-select: none;

    z-index: 9999;
  }

  #terminal {
    background-color: black; /* #1e1f29; */
    padding: 20px;
    width: 100%;
    height: 95%;
    overflow-y: scroll;
    /* position: relative; */
  }

  .terminal-input {
    display: flex;
    align-items: center;
  }

  .prompt {
    color: #50fa7b;
    margin-right: 10px;
  }

  input[type="text"] {
    background-color: transparent;
    border: none;
    color: #f8f8f2;
    font-family: inherit;
    /* font-size: 1rem; */
    flex-grow: 1;
    outline: none;
  }

  input[type="text"]::placeholder {
    color: #6272a4;
  }

  #terminal-header {
    height: 25px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: white;
    border: 1px solid black;
    color: black;
  }

  /* start : contains icon and "Command Prompt" end : 3 buttons */
  #start, #end {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #cmd-img {
    padding-inline: 8px;
  }

  .terminal-header-button {
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center; /* horizontal centering as well */
    height: 100%;
    cursor: pointer;
    font-weight: bold;
  }

  .terminal-header-button:hover {
    background-color: gainsboro;
  }

  #close-button:hover{
    color: white;
    background-color: red;
  }

  #maximize-button {
    color: black;
  }

  #help-container {
    display: flex;
  }

  #help-commands {
    flex: 0 0 80px;
  }

  #help-text {
    flex: 1;
  }
`;

export default terminalStyle;