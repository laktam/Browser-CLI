function sendOpenTerminalCmd() {
  //get active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //send msg to active tab
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "open-terminal",
    });
  });
}

export { sendOpenTerminalCmd };
