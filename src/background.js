import {
  executeCommand,
  getOpenTabId,
  sendCommandToTab,
} from "./actions/backgroundActions.js";

// let openTerminal = false;
// tabid (int): terminalOpen (boolean)
let tabsWithOpenTerminal = {};

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

//send open terminal command on current tab when shortcut is clicked
chrome.commands.onCommand.addListener(function (command) {
  if (command === "open-terminal") {
    getOpenTabId().then((id) => {
      console.log(
        "open terminal command,  tabsWithOpenTerminal[id]:",
        tabsWithOpenTerminal[id]
      );
      if (
        tabsWithOpenTerminal[id] == undefined ||
        tabsWithOpenTerminal[id] == false
      ) {
        tabsWithOpenTerminal[id] = true;
        sendCommandToTab(id, "open-terminal");
      } else if (tabsWithOpenTerminal[id] === true) {
        tabsWithOpenTerminal[id] = false;
        sendCommandToTab(id, "close-terminal");
      }
    });
  }
  //fix error ???
  return true;
});
