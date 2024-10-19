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

async function cd(commandObj) {
  let tabs = await chrome.tabs.query({});
  chrome.tabs.update(tabs[Number.parseInt(commandObj.arguments[0]) - 1].id, { active: true });
}

/**
 * rm -g {"group_name"}: close group tabs
 * 
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
  let tabs = await ls();
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
  if (!url.includes("http")) {
    url = "http://" + url;
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
  } else if (keywords[1] == "-g") {
    let [group] = await chrome.tabGroups.query({
      title: keywords[2].slice(1, keywords[2].length - 1),
    });
    console.log("group to ungroup ", group);
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
