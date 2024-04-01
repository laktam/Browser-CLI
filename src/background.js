import {
  sendCloseTerminalCmdToTabs,
  sendOpenTerminalCmd,
} from "./actions/backgroundActions.js";

let openTerminal = false;
//ids of tabs where terminal is open so we can close them all
let tabsWithOpenTerminal = [];

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "getTabsInfo") {
    chrome.tabs.query({}, function (tabs) {
      sendResponse(tabs);
    });
  } else if (message.action === "command") {
    console.log(message.command);
    sendResponse();
  }
  // Return true to indicate that sendResponse will be called asynchronously
  return true;
});

//send open terminal command on current tab when shortcut is clicked
chrome.commands.onCommand.addListener(function (command) {
  if (command === "open-terminal") {
    if (openTerminal) {
      openTerminal = false;
      sendCloseTerminalCmdToTabs(tabsWithOpenTerminal);
    } else {
      openTerminal = true;
      sendOpenTerminalCmd(tabsWithOpenTerminal);
    }
  }
  //fix error ???
  return true;
});

//when tab change open terminal in the new tab
chrome.tabs.onActivated.addListener(function (activeInfo) {
  if (openTerminal) {
    sendOpenTerminalCmd(tabsWithOpenTerminal);
  }

  //fix error ???
  return true;
});

//if terminal is open it should be open in new created tab
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    if (openTerminal) {
      sendOpenTerminalCmd(tabsWithOpenTerminal);
    }
  }

  //fix error ???
  return true;
});

// chrome.tabs.onCreated.addListener(function (activeInfo) {
//   console.log("on created");
//   if (openTerminal) {
//     sendOpenTerminalCmd(tabsWithOpenTerminal);
//   }
//   //fix error ???
//   return true;
// });
