import { ls } from "./backroundCommands";

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

function executeCommand(command) {
  //get keyword list
  const keywords = getKeywords(command);
  if (command === "ls") {
    ls().then((tabs) => {
      getOpenTabId().then((id) => {
        chrome.tabs.sendMessage(id, {
          action: "ls",
          data: tabs,
        });
      });
    });
  }
}

function getKeywords(command) {
  // const keyword = [];
  return command.split(" ");
}
export { sendCommandToTab, getOpenTabId, executeCommand };
