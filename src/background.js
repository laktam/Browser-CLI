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
    // Query all tabs and send their information back to the content script
    chrome.tabs.query({}, function (tabs) {
      sendResponse(tabs);
    });
    // Return true to indicate that sendResponse will be called asynchronously
    return true;
  }
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
});

//when tab change open terminal in new tab
chrome.tabs.onActivated.addListener(function (activeInfo) {
  console.log(activeInfo);
  if (openTerminal) {
    sendOpenTerminalCmd(tabsWithOpenTerminal);
  }
});
