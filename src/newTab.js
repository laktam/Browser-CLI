import { clear, find, ls, noCommandFound, printToConsole, pwd } from "./actions/domActions.js";

let terminal = document.getElementById('terminal');

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action == "ls") {
    ls(message);
  } else if (message.action == "find") {
    find(message);
  } else if (message.action == "pwd") {
    pwd(message);
  } else if (message.action == "clear") {
    clear(terminal);
  }
  else if(message.action == "no-command-found"){
    noCommandFound(message)
  }else {
  // commands  handled in bg script
  // cd
  // create
  // group
  //ungroup
  //???
    printToConsole("<br>", message) // print only the command no output
  }

  //clear input after each background message
  terminal.querySelector("#commandInput").value = "";
  terminal.scrollTo(0, terminal.scrollHeight);

  sendResponse();
  return true;
});
