import {
  closeTerminal,
  displayAllTabs,
  openTerminal,
  sendInput,
} from "./actions/contentActions.js";

// document.addEventListener("DOMContentLoaded", () => {
//   chrome.extension.sendMessage({action: "ping"}, function(resp) {
//       console.log(JSON.stringify(resp));
//   });
// });

chrome.runtime.sendMessage({ action: "getTabsInfo" }, displayAllTabs);
console.log("from content script");
//shortcut
let terminal;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "open-terminal") {
    terminal = openTerminal();
  } else if (message.action === "close-terminal") {
    closeTerminal(terminal);
  }
  return true;
});
