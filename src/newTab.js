import { clear, find, ls, pwd } from "./actions/domActions.js";

let terminal = document.getElementById('terminal');

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action == "ls") {
    ls(message.data);
  } else if (message.action == "find") {
    find(message.data);
  } else if (message.action == "pwd") {
    pwd(message.data);
  } else if (message.action == "clear") {
    clear(terminal);
  }
  // commands  handled in bg script
  // cd
  // create
  // group
  //ungroup
  //???

  //clear input after each background message
  terminal.querySelector("#commandInput").value = "";
  terminal.scrollTo(0, terminal.scrollHeight);

  sendResponse();
  return true;
});
