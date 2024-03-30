import { openTerminal } from "./actions/backgroundActions.js";

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "getTabsInfo") {
    // Query all tabs and send their information back to the content script
    chrome.tabs.query({}, function (tabs) {
      sendResponse(tabs);
    });
    // Return true to indicate that sendResponse will be called asynchronously
    return true;
  }
});

// chrome.commands.onCommand.addListener(function (command) {
//   if (command === "open-terminal") {
//     openTerminal();
//   }
// });

