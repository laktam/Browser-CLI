function sendOpenTerminalCmd(tabsWithOpenTerminal) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //see if it is not already open in this tab
    console.log(tabs);
    if (
      !tabsWithOpenTerminal.includes(tabs[0].id) &&
      tabs[0].status === "complete" &&
      tabs[0].url !== "" &&
      tabs[0].url !== "chrome://newtab/"
    ) {
      //send msg to active tab
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "open-terminal",
      });
      tabsWithOpenTerminal.push(tabs[0].id);
    }
  });
}

//close terminal on tabs where we opened it
function sendCloseTerminalCmdToTabs(tabsWithOpenTerminal) {
  for (let tab of tabsWithOpenTerminal) {
    chrome.tabs.sendMessage(tab, {
      action: "close-terminal",
    });
  }
  tabsWithOpenTerminal.length = 0;
}
export { sendOpenTerminalCmd, sendCloseTerminalCmdToTabs };
