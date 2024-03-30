function displayAllTabs(response) {
  console.log(response);
  response.forEach(function (tab) {
    let body = document.getElementsByTagName("body")[0];
    let p = document.createElement("p");
    p.textContent = tab.title;
    body.appendChild(p);
  });
}

function openTerminal() {
  console.log("open terminal in content script");
  let container = document.createElement("div");
  // container;
}

export { displayAllTabs, openTerminal };
