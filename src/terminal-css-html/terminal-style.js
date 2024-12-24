const terminalStyle = `
  #terminal-container {
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    all: unset; 
    font-family: monospace; 
    font-size: 14px;

    background-color: black; /* #282a36; */
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
    box-sizing: border-box;
    padding: 20px;
    width: 100%;
    height: 95%;
    overflow-y: scroll;
  }

  .terminal-input {
    display: flex;
    align-items: center;
  }

  .cli-prompt {
    color: #50fa7b;
    margin-right: 10px;
  }

  #commandInput{
    background-color: black;
  }

  input[type="text"] {
    background-color: transparent;
    border: none;
    color: #f8f8f2;
    font-family: inherit;
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

  #start {
    padding-left : 8px;
  }
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
    justify-content: center; 
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