function sendOpenTerminalCmd(tabsWithOpenTerminal) {
  //get active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //send msg to active tab
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "open-terminal",
    });
    tabsWithOpenTerminal.push(tabs[0].id);
  });
}

//close terminal on tabs where we opened it
function sendCloseTerminalCmdToTabs(tabsWithOpenTerminal) {
  for (let tab of tabsWithOpenTerminal) {
    chrome.tabs.sendMessage(tab, {
      action: "close-terminal",
    });
  }
}
export { sendOpenTerminalCmd, sendCloseTerminalCmdToTabs };
