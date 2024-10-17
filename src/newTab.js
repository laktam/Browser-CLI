import {
  closeTerminal,
  displayAllTabs,
  openTerminal,
} from "./actions/contentActions.js";
import { clear, find, ls, pwd } from "./actions/domActions.js";

// document.addEventListener("DOMContentLoaded", () => {
//   chrome.extension.sendMessage({action: "ping"}, function(resp) {
//       console.log(JSON.stringify(resp));
//   });
// });

// chrome.runtime.sendMessage({ action: "getTabsInfo" }, displayAllTabs);
console.log("from new tab script");

let terminal = document.getElementById('terminal');

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("message on new tab", sender,  message);
  // if (message.action === "open-terminal") {
  //   terminal = openTerminal();
  // } else if (message.action === "close-terminal") {
  //   closeTerminal(terminal);
  // } else 
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
