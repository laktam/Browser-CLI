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

export { ls, cd, rm, find };
