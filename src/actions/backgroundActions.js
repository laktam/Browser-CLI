import { cd, ls } from "./backroundCommands";

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

async function executeCommand(command) {
  //get keyword list
  const keywords = getKeywords(command);
  let cmd = keywords[0];
  let arg = keywords[1];
  let id = await getOpenTabId();
  let data;
  if (cmd == "ls") {
    data = await ls();
  } else if (cmd == "cd") {
    data = await cd(arg);
  }
  chrome.tabs.sendMessage(id, {
    action: cmd,
    data: data,
  });

  // getOpenTabId().then((id) => {
  // if (command === "ls") {
  // let tabs = ls();
  // ls().then((tabs) => {
  //   chrome.tabs.sendMessage(id, {
  //     action: "ls",
  //     data: tabs,
  //   });
  // });
  // } else {
  // }
  // });
  // if (command === "ls") {
  //   ls().then((tabs) => {
  //     getOpenTabId().then((id) => {
  //       chrome.tabs.sendMessage(id, {
  //         action: "ls",
  //         data: tabs,
  //       });
  //     });
  //   });
  // } else {
  //   getOpenTabId().then((id) => {
  //     chrome.tabs.sendMessage(id, {
  //       action: "other",
  //       data: "no data",
  //     });
  //   });
  // }
}

function getKeywords(command) {
  // const keyword = [];
  return command.split(" ");
}
export { sendCommandToTab, getOpenTabId, executeCommand };
