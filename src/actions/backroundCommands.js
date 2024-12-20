import { getOpenTabId } from "./backgroundUtils";

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

/**
 * Executes a command with the given command object.
 * @param {CommandObj} commandObj - The command object.
 */
async function cd(commandObj) {
  let tabs = await chrome.tabs.query({});

  // send message to current tab to clean input 
  getOpenTabId().then((tabId)=> chrome.tabs.sendMessage(tabId, {action: "cd"}) );
  // change active tab
  chrome.tabs.update(tabs[Number.parseInt(commandObj.arguments[0]) - 1].id, { active: true });
  return 
}

/**
 * Executes a command with the given command object.
 * @param {CommandObj} commandObj - The command object.
 */
async function rm(commandObj) {
  //if it's a goup
  if (commandObj["-g"] != undefined) {
    let [group] = await chrome.tabGroups.query({
      title: commandObj["-g"].slice(1, commandObj["-g"].length - 1),
    });

    let groupId = group.id;
    let tabs = await chrome.tabs.query({});
    let tabIds = [];
    for (let tab of tabs) {
      if (tab.groupId == groupId) {
        tabIds.push(tab.id);
      }
    }
    await chrome.tabs.remove(tabIds);
  } else {
    let tabs = await chrome.tabs.query({});// get all tabs
    chrome.tabs.remove(tabs[Number.parseInt(commandObj.arguments[0]) - 1].id);// remove tab by index
  }
}

/**
 * find {"search keyword"}: search tabs with the keyword
 * 
 */
async function find(commandObj) {
  let searchKeyword = commandObj.arguments[0].slice(1, commandObj.arguments[0].length - 1);
  searchKeyword = searchKeyword.toLowerCase()
  let tabs = await ls();
  tabs = tabs.map(t => t.toLowerCase())
  tabs = tabs.filter((tab) => tab.includes(searchKeyword));
  return tabs;
}

async function pwd() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab.title + " : " + tab.url;
}

/**
 * create {tab url} : create a tab with a url
 * --active {tab url} || -a {tab url} 
 * 
 */
async function create(commandObj) {
  let active = false;
  let url = "";
  if (commandObj["--active"] != undefined) {
    active = true;
    url = commandObj["--active"].slice(1, commandObj["--active"].length - 1);
  } else if( commandObj["-a"] != undefined){
    active = true;
    url = commandObj["-a"].slice(1, commandObj["-a"].length - 1);
  } else {
    url = commandObj.arguments[0].slice(1, commandObj.arguments[0].length - 1);
  }
  
  if(!url.startsWith("http") && !url.startsWith("https")){
    if(url.startsWith("www")){
      url = 'http://' + url
    }else {
      url = "https://www.google.com/search?q=" + url;
    }
  }
  chrome.tabs.create({
    active,
    url,
  });
}

/**
 * group : create a new group or add tabs to a group
 * --new {group name} {index list} : new group
 * --name {group name} {index list} : add to existing group
 * 
 */
async function group(commandObj) {
  let groupId;
  if (commandObj["--new"] != undefined) {
    let name = commandObj["--new"].slice(1, commandObj["--new"].length - 1);
    let tabIds = await tabIndexToId(commandObj.arguments);

    groupId = await chrome.tabs.group({ tabIds });
    await chrome.tabGroups.update(groupId, {
      collapsed: false,
      title: name,
    });
  } else if (commandObj["--name"] != undefined) {
    let name = commandObj["--name"].slice(1, commandObj["--name"].length - 1);
    let tabIds = await tabIndexToId(commandObj.arguments);
    let tabGroups = await chrome.tabGroups.query({ title: name });
    console.log("groups found ", tabGroups);
    await chrome.tabs.group({ tabIds, groupId: tabGroups[0].id });
  }
}

/**
 * ungroup : ungroup a group or specific tabs from a group
 * --tabs  {index list} : remove these tabs from there groups
 * --name {group name} : ungroup this group
 * 
 */
async function ungroup(commandObj) {
  if (commandObj["--tabs"] != undefined || commandObj["-t"] != undefined) {
    let indexes = commandObj.allLastArguments
    let tabIds = await tabIndexToId(indexes);
    await chrome.tabs.ungroup(tabIds);
  } else if (commandObj["--name"] != undefined) {
    let title = commandObj["--name"].slice(1, commandObj["--name"].length - 1)
    let [group] = await chrome.tabGroups.query({
      title,
    });
    let groupId = group.id;
    let tabs = await chrome.tabs.query({});
    let tabIds = [];
    for (let tab of tabs) {
      if (tab.groupId == groupId) {
        tabIds.push(tab.id);
      }
    }
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
