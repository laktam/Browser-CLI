import {
  closeTerminal,
  displayAllTabs,
  openTerminal,
} from "./actions/contentActions.js";
import { find, ls, pwd } from "./actions/domActions.js";

// document.addEventListener("DOMContentLoaded", () => {
//   chrome.extension.sendMessage({action: "ping"}, function(resp) {
//       console.log(JSON.stringify(resp));
//   });
// });

// chrome.runtime.sendMessage({ action: "getTabsInfo" }, displayAllTabs);
console.log("from content script");

let terminal;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(message);
  if (message.action === "open-terminal") {
    terminal = openTerminal();
  } else if (message.action === "close-terminal") {
    closeTerminal(terminal);
  } else if (message.action == "ls") {
    ls(message.data);
  }else if (message.action == "find") {
    find(message.data);
  }else if (message.action == "pwd") {
    pwd(message.data);
  }
  // cd command is handled in bg script

  //???

  //clear input after each background message
  terminal.querySelector("#terminal-input").value = "";
  sendResponse();
  return true;
});
