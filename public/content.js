(()=>{"use strict";function e(){let e=function(){const e=document.createElement("div");return e.style.position="fixed",e.style.bottom="0",e.style.width="100%",e.style.backgroundColor="#f0f0f0",e.style.padding="10px 25px",e.style.boxSizing="border-box",e.style.borderTop="1px solid #ccc",e}(),t=function(){const e=document.createElement("div");return e.setAttribute("id","terminalResultSection"),e.style.height="40%",e.style.boxSizing="border-box",e.style.width="100%",e.style.padding="10px 31px",e}(),n=function(){const e=document.createElement("input");return e.style.width="100%",e.style.padding="6px",e.style.boxSizing="border-box",e.style.border="1px solid #ccc",e.addEventListener("keyup",(function(t){var n;"Enter"===t.key&&(console.log(e.value),n=e.value,chrome.runtime.sendMessage({action:"command",command:n}))})),e}();return e.appendChild(t),e.appendChild(n),document.body.appendChild(e),n.focus(),e}let t;console.log("from content script"),chrome.runtime.onMessage.addListener((function(n,o,i){return console.log(n),"open-terminal"===n.action?t=e():"close-terminal"===n.action?function(e){e.remove()}(t):"ls"==n.action&&function(e){const t=document.getElementById("terminalResultSection");console.log("resultsecion",t);let n="";for(let t of e)n+=`<p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${t}</p>`;t.innerHTML=n}(n.data),i(),!0}))})();