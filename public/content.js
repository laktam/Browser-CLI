(()=>{"use strict";let e;chrome.runtime.sendMessage({action:"getTabsInfo"},(function(e){})),console.log("from content script"),chrome.runtime.onMessage.addListener((function(n,t,o){return"open-terminal"===n.action?e=function(){let e=function(){const e=document.createElement("div");return e.style.position="fixed",e.style.bottom="0",e.style.width="100%",e.style.backgroundColor="#f0f0f0",e.style.padding="10px 25px",e.style.boxSizing="border-box",e.style.borderTop="1px solid #ccc",e}(),n=function(){const e=document.createElement("input");return e.style.width="100%",e.style.padding="6px",e.style.boxSizing="border-box",e.style.border="1px solid #ccc",e}();return n.addEventListener("keyup",(function(e){var t;"Enter"===e.key&&(console.log(n.value),t=n.value,chrome.runtime.sendMessage({action:"command",command:t}))})),n.focus(),e.appendChild(n),document.body.appendChild(e),e}():"close-terminal"===n.action&&function(e){e.remove()}(e),!0}))})();