async function getOpenTabId() {
  let id;
  // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //   id = tabs[0].id;
  // });
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log(tab.id);
  return tab.id;
}

function sendCommandToTab(id, command) {
  chrome.tabs.sendMessage(id, {
    action: command,
  });
}

export { sendCommandToTab, getOpenTabId };
