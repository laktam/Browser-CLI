import {
  executeCommand,
  sendOpenTerminalMessage,
} from "./actions/backgroundUtils.js";

console.log("log in content script")
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

// listen for shortcut
chrome.commands.onCommand.addListener((command) => {
  console.log("Command triggered:", command);
  if (command === "open-terminal") {
    console.log("shortcut clicked")
    sendOpenTerminalMessage(); 
  }
});