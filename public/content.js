(()=>{"use strict";let e,t="#F8F8FF";function n(){let e=function(){const e=document.createElement("div");return e.style.position="fixed",e.style.bottom="0",e.style.width="100%",e.style.height="60%",e.style.backgroundColor="#f0f0f0",e.style.padding="10px 25px",e.style.boxSizing="border-box",e.style.borderTop="1px solid #ccc",e.style.overflowY="scroll",e.style.backgroundColor=t,e}(),n=function(){const e=document.createElement("div");return e.setAttribute("id","terminalResultSection"),e.style.boxSizing="border-box",e.style.width="100%",e.style.padding="10px 0px",e}(),o=document.createElement("span");o.textContent="Browser CLI >";let l=function(){const e=document.createElement("input");return e.setAttribute("id","terminal-input"),e.style.width="100%",e.style.all="unset",e.style.padding="6px",e.style.boxSizing="border-box",e.style.border="0px",e.style.backgroundColor=t,e.style.caret,e.addEventListener("keyup",(function(t){var n;"Enter"===t.key&&(console.log(e.value),n=e.value,chrome.runtime.sendMessage({action:"command",command:n}))})),e}();return e.appendChild(n),e.appendChild(o),e.appendChild(l),document.body.appendChild(e),l.focus(),e}console.log("from content script"),chrome.runtime.onMessage.addListener((function(t,o,l){var i;return console.log(t),"open-terminal"===t.action?e=n():"close-terminal"===t.action?function(e){e.remove()}(e):"ls"==t.action?function(e){const t=document.getElementById("terminalResultSection");console.log("resultsecion",t);let n="";for(let t of e)n+=`<p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${t}</p>`;t.innerHTML=n}(t.data):"find"==t.action?function(e){const t=document.getElementById("terminalResultSection");console.log("resultsecion",t);let n="";for(let t of e)n+=`<p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${t}</p>`;t.innerHTML=n}(t.data):"pwd"==t.action?(i=t.data,document.getElementById("terminalResultSection").innerHTML=`<p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${i}</p>`):"clear"==t.action&&function(e){e.querySelector("#terminalResultSection").innerHTML=""}(e),e.querySelector("#terminal-input").value="",e.scrollTo(0,e.scrollHeight),l(),!0}))})();