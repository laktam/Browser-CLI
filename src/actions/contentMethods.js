import { terminalDisplayed } from "../content";

export function centerTerminal(terminalContainer) {
    const width = terminalContainer.offsetWidth;
    const height = terminalContainer.offsetHeight;
    
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
  
    // Set initial position in pixels
    terminalContainer.style.left = left + 'px';
    terminalContainer.style.top = top + 'px';
  }

export function makeHeaderButtonsNotDraggable() {
    let buttons = document.getElementsByClassName('terminal-header-button');
    for (let button of buttons) {
      button.addEventListener('mousedown', (e) => {
        e.stopPropagation();
      });
    }
  }


export function makeTerminalDraggable(terminalContainer) {
    let mouseClickX = 0;
    let mouseClickY = 0;
    let x = Number(terminalContainer.style.left.slice(0, -2));
    let y = Number(terminalContainer.style.top.slice(0, -2));
    let drag = false;
  
    terminalContainer.querySelector("#terminal-header").addEventListener("mousedown", (e) => {
      drag = true;
      mouseClickX = e.clientX;
      mouseClickY = e.clientY;
      x = Number(terminalContainer.style.left.slice(0, -2));
      y = Number(terminalContainer.style.top.slice(0, -2));
    });
  
    document.addEventListener("mouseup", () => {
      drag = false;
    });
  
    document.addEventListener("mousemove", (e) => {
      if (drag) {
        let currentMouseX = e.clientX;
        let currentMouseY = e.clientY;
  
        terminalContainer.style.left = x + currentMouseX - mouseClickX + "px";
        terminalContainer.style.top = y + currentMouseY - mouseClickY + "px";
      }
    });
  }


export function addEventListeners(terminalContainer){
    const input = terminalContainer.querySelector('#commandInput');
    const terminal = terminalContainer.querySelector('#terminal');
    const closeButton = terminalContainer.querySelector('#close-button');
    const maximizeButton = terminalContainer.querySelector('#maximize-button');
    const minimizeButton = terminalContainer.querySelector('#minimize-button');

    closeButton.addEventListener('click', () => {
    //use the shorcut instead because this close only the current tab and make behaviour inconsistent

    // terminalContainer.style.display = "none";
    // terminalDisplayed = false;
    });

    maximizeButton.addEventListener('click', () => {
    terminalContainer.style.width = "100%";
    terminalContainer.style.height = "100%";
    });

    minimizeButton.addEventListener('click', () => {
    terminalContainer.style.display = "none";
    });

    terminal.addEventListener("click", () => {
    input.focus();
    });

    input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        console.log(input.value);
        sendInput(input.value);
    }
    });

    function sendInput(command) {
    chrome.runtime.sendMessage({ action: "command", command });
    }
}