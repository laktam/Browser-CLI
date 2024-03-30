import { displayAllTabs, openTerminal } from "./actions/contentActions.js";

chrome.runtime.sendMessage({ action: "getTabsInfo" }, displayAllTabs);
console.log("from content script");
//shortcut

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "open-terminal") {
    openTerminal();
  }
  return true;
});
