import { addEventListeners, centerTerminal, makeHeaderButtonsNotDraggable, makeTerminalDraggable } from "./actions/contentMethods.js";
import { clear, find, help, ls, noCommandFound, printToConsole, pwd } from "./actions/domActions.js";
import { terminalContainer } from "./terminal-css-html/terminal-html.js";
import terminalStyle from "./terminal-css-html/terminal-style.js";

export let terminalDisplayed = false;

console.log("from content script")

const style = document.createElement('style');
style.textContent = terminalStyle;
document.head.appendChild(style);


// Inject the terminal container into the body of the page
// maybe inject it only when the shortcut is clicked
// and remove the node when it is recliked
document.body.appendChild(terminalContainer);

addEventListeners(terminalContainer);

const terminalBody = terminalContainer.querySelector('#terminal-body');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.shortcut === "open-terminal") { 
    if(terminalDisplayed){
      terminalContainer.style.display = "none";
      terminalDisplayed = false;
    }else{
      terminalContainer.style.display = "block";
      terminalDisplayed = true;
      centerTerminal(terminalContainer);
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
    clear(terminalBody);
  } else if (message.action == "help") {
    help(message);
  } else if (message.action == "cd") {
    // cd is done with bg script this is just to clear the input
    terminalBody.querySelector("#cli-command-input").value = "";
    terminalBody.scrollTo(0, terminalBody.scrollHeight);
  } else if (message.action == "no-command-found") {
    noCommandFound(message);
  } else if (message.action != undefined){ // so shorcut don't print undefined
    // this test because when shourtuc is pressed the bg script send a message 
    // that contains message.shortcut and not message.action so it is undefined
    // and it get printed, so we need to exclude that case
    
    printToConsole("<br>", message); // print only the command no output
  }

  terminalBody.querySelector("#cli-command-input").value = "";
  terminalBody.scrollTo(0, terminalBody.scrollHeight);

  sendResponse();
  return true;
});

makeTerminalDraggable(terminalContainer);
makeHeaderButtonsNotDraggable();

centerTerminal(document.querySelector('#terminal-container'));
// hide it using js after centering 
// when i use display: none; in css it is not displayed properly after showing it
terminalContainer.style.display = "none";