import {
  executeCommand,
} from "./actions/backgroundActions.js";


// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "command") {
    console.log(message.command);
    executeCommand(message.command);
    sendResponse();
  }
  // Return true to indicate that sendResponse will be called asynchronously
  return true;
});
