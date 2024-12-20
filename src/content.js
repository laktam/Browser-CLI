import { addEventListeners, centerTerminal, makeHeaderButtonsNotDraggable, makeTerminalDraggable } from "./actions/contentMethods.js";
import { clear, find, help, ls, noCommandFound, printToConsole, pwd } from "./actions/domActions.js";
import { terminalContainer } from "./terminal-css-html/terminal-html.js";
import terminalStyle from "./terminal-css-html/terminal-style.js";

export let terminalDisplayed = false;

console.log("content script loaded")
// Adding inline CSS styles for the terminal
const style = document.createElement('style');
style.textContent = terminalStyle;
document.head.appendChild(style); // Append styles to head


// Inject the terminal container into the body of the page
document.body.appendChild(terminalContainer);

addEventListeners(terminalContainer);


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.shortcut === "open-terminal") { 
    if(terminalDisplayed){
      terminalContainer.style.display = "none";
      terminalDisplayed = false;
    }else{
      terminalContainer.style.display = "block";
      terminalDisplayed = true;
    }
    sendResponse({status: "Terminal opened"});
  }

  // Return true to indicate that the response will be sent asynchronously
  return true;
});

// Handling messages from background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action == "ls") {
    ls(message);
  } else if (message.action == "find") {
    find(message);
  } else if (message.action == "pwd") {
    pwd(message);
  } else if (message.action == "clear") {
    clear(terminal);
  } else if (message.action == "help") {
    help(message);
  } else if (message.action == "no-command-found") {
    noCommandFound(message);
  } else if (message.action != undefined){ // so shorcut don't print undefined
    // Default behavior for unknown commands
    
    printToConsole("<br>", message); // print only the command no output
  }

  terminal.querySelector("#commandInput").value = "";
  terminal.scrollTo(0, terminal.scrollHeight);

  sendResponse();
  return true;
});

makeTerminalDraggable(terminalContainer);
makeHeaderButtonsNotDraggable();

centerTerminal(document.querySelector('#terminal-container'));
// hide it using js after centering 
// when i use display: none; in css it is not displayed properly after showing it
terminalContainer.style.display = "none";