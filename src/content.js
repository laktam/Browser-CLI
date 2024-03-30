import {
  closeTerminal,
  displayAllTabs,
  openTerminal,
} from "./actions/contentActions.js";

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
