async function ls() {
  let tabs = await chrome.tabs.query({});
  let result = [];
  console.log(tabs);
  for (let tab of tabs) {
    let tabString = tab.url + " : " + tab.title;
    if (tab.highlighted) {
      tabString += " *"; //active tab
    }
    result.push(tabString);
  }
  return result;
}

export { ls };
