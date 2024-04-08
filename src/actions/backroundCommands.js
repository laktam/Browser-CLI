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

async function group(command) {
  let keywords = getKeywords(command);
  let tabs = await chrome.tabs.query({});
  let groupId;
  if (keywords[1] == "--new") {
    let [cmd, option, name, ...indexes] = keywords;
    name = keywords[2].slice(1, keywords[2].length - 1);
    let tabIds = await tabIndexToId(indexes);

    groupId = await chrome.tabs.group({ tabIds });
    await chrome.tabGroups.update(groupId, {
      collapsed: false,
      title: name,
    });
  } else if (keywords[1] == "--name") {
    let [cmd, option, name, ...indexes] = keywords;
    name = keywords[2].slice(1, keywords[2].length - 1);
    let tabIds = await tabIndexToId(indexes);
    let tabGroups = await chrome.tabGroups.query({ title: name });
    console.log("groups found ", tabGroups);
    await chrome.tabs.group({ tabIds, groupId: tabGroups[0].id });
  }
}

async function ungroup(command) {
  let keywords = getKeywords(command);
  if (keywords[1] == "--tabs" || keywords[1] == "-t") {
    //this take tab ids
    let [cmd, option, ...indexes] = keywords;
    let tabIds = await tabIndexToId(indexes);
    await chrome.tabs.ungroup(tabIds);
  }
}

function getKeywords(command) {
  // const keyword = [];
  return command.split(" ");
}

async function tabIndexToId(indexes) {
  let tabs = await chrome.tabs.query({});
  indexes = indexes.map((id) => Number.parseInt(id) - 1);
  let tabIds = [];
  for (let index of indexes) {
    tabIds.push(tabs[index].id);
  }
  console.log("tab ids in function ", tabIds);
  return tabIds;
}

export { ls, cd, rm, find, pwd, create, group, ungroup };
