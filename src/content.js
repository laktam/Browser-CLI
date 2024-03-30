import { displayAllTabs, openTerminal } from "./actions/contentActions.js";

chrome.runtime.sendMessage({ action: "getTabsInfo" }, displayAllTabs);
console.log("from content script");
//shortcut
document.addEventListener("keydown", (event) => {
  console.log("key down");
  if (event.altKey && event.key === "x") {
    console.log("ctrl + X pressed!");
    openTerminal();
  }
});
