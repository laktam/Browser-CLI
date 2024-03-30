// chrome.tabs.query({}, function (tabs) {
//   tabs.forEach(function (tab) {
//     console.log(tab.title + " - " + tab.url);
//     let p = document.createElement("p");
//     p.textContent = tab.title;
//     document.appendChild(p);
//   });
// });
chrome.runtime.sendMessage({ action: "getTabsInfo" }, function (response) {
  console.log(response);
  response.forEach(function (tab) {
    let body = document.getElementsByTagName("body")[0];
    let p = document.createElement("p");
    p.textContent = tab.title;
    body.appendChild(p);
  });
});
