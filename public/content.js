(()=>{"use strict";chrome.runtime.sendMessage({action:"getTabsInfo"},(function(e){console.log(e),e.forEach((function(e){let n=document.getElementsByTagName("body")[0],t=document.createElement("p");t.textContent=e.title,n.appendChild(t)}))})),console.log("from content script"),chrome.runtime.onMessage.addListener((function(e,n,t){return"open-terminal"===e.action&&(console.log("open terminal in content script"),document.createElement("div")),!0}))})();