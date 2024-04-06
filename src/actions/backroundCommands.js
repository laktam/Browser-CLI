async function ls() {
  let tabs = await chrome.tabs.query({});
  let result = [];
  console.log(tabs);
  let counter = 1;
  for (let tab of tabs) {
    let tabString = "(" + counter + ") " + tab.title + " : " + tab.url;
    if (tab.highlighted) {
      tabString += " *"; //active tab
    }
    result.push(tabString);
    counter++;
  }
  return result;
}

async function cd(arg) {
  let tabs = await chrome.tabs.query({});
  chrome.tabs.update(tabs[Number.parseInt(arg) - 1].id, { active: true });
}

async function rm(arg) {
  let tabs = await chrome.tabs.query({});
  chrome.tabs.remove(tabs[Number.parseInt(arg) - 1].id);
}

async function find(arg) {
  arg = arg.slice(1, arg.length - 1);
  console.log("arg ", arg);
  let tabs = await ls();
  tabs = tabs.filter((tab) => tab.includes(arg));
  console.log("found tabs ", tabs);
  return tabs;
  // let data = {};
  // for(let tab of tabs){

  // }
}

async function pwd() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab.title + " : " + tab.url;
}

async function create(command) {
  let keywords = getKeywords(command);
  let active = false;
  let url = "";
  if (keywords[1] == "--active" || keywords[1] == "-a") {
    active = true;
    url = keywords[2].slice(1, keywords[2].length - 1);
  } else {
    url = keywords[1].slice(1, keywords[1].length - 1);
  }
  chrome.tabs.create({
    active,
    url,
  });
}

function getKeywords(command) {
  // const keyword = [];
  return command.split(" ");
}
export { ls, cd, rm, find, pwd, create };
