(()=>{"use strict";var n={d:(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},o:(n,e)=>Object.prototype.hasOwnProperty.call(n,e)};function e(n){const e=n.offsetWidth,t=n.offsetHeight,i=(window.innerWidth-e)/2,o=(window.innerHeight-t)/2;n.style.left=i+"px",n.style.top=o+"px"}n.d({},{Y:()=>r});const t={cdHelp:"<div>\n    Move to a specific tab (use ls for tab indexes)\n    <br><br>\n    cd [tab index]\n    <br><br>\n    </div>",rmHelp:"<div>\n    close a tab or group tabs\n    <br><br>\n    <div id='help-container'>\n        <div id='help-commands'>\n            <div>-g </div>\n        </div>\n        <div id='help-text'>\n            <div>the name of the group to close</div>\n        </div>\n    </div>\n    <br>\n    Examples\n    <br>\n    rm 15\n    <br>\n    rm -g \"group name\"\n    <br>\n    </div>\n    ",lsHelp:"<div>\n    List open tabs with there index\n    </div>\n    <br><br>\n    ",findHelp:'<div>\n    Search for tabs with given keyword in the tab title or URL\n    Example \n    find "keyword"\n    </div>\n    <br>\n    ',createHelp:"<div>\n    Create a new tab with a given URL or with a google search\n    if the argument dons't start with http or https or www google search is used\n    <br><br>\n    <div id='help-container'>\n    <div id='help-commands'>\n        <div>-a</div>\n        <div>--active</div>\n    </div>\n    <div id='help-text'>\n        <div>move to the tab after creation</div>\n        <div>move to the tab after creation</div>\n    </div>\n    </div>\n    <br>\n    Examples\n    <br>\n    create \"search this on google\"\n    <br>\n    create -a \"http://example.com\"\n    </div>\n    <br>\n    ",groupHelp:"<div>\n    Create a new group or add tabs to a group\n    <br><br>\n    <div id='help-container'>\n    <div id='help-commands'>\n        <div>--new</div>\n        <div>--name</div>\n    </div>\n    <div id='help-text'>\n        <div>create a tab with the given name and tab indexes</div>\n        <div>add tabs to existing group with the given name</div>\n    </div>\n    </div>\n    <br>\n    Examples\n    <br>\n    group --new \"Java\" 1 5 15\n    <br>\n    group --name \"C\" 4 5\n    <br>\n    </div>\n    ",ungroupHelp:"<div>\n    Ungroup a group or specific tabs from a group\n    <br><br>\n    <div id='help-container'>\n    <div id='help-commands'>\n        <div>--tabs</div>\n        <div>--name</div>\n    </div>\n    <div id='help-text'>\n        <div>tab indexes</div>\n        <div>group name</div>\n    </div>    \n    </div>\n    <br>\n    Examples\n    <br>\n    ungroup --tabs 1 5 15\n    <br>\n    ungroup --name \"Java\"\n    <br>\n    </div>\n    ",clearHelp:"<div>\n    Clear terminal\n    <br>\n    </div>\n    "};function i(n,e){const t=document.getElementById("output");let i=`<div><span class="cli-prompt">></span><span>${e.command}</span></div>`;i+=n,t.insertAdjacentHTML("beforeend",i)}const o=document.createElement("div");o.id="terminal-container",o.innerHTML='\n  <div id="terminal-header">\n    <div id="start">\n        Command Prompt\n    </div>\n    <div id="end">\n      <span class="terminal-header-button" id="minimize-button">_</span>\n      <span class="terminal-header-button" id="maximize-button">□</span>\n      <span class="terminal-header-button" id="close-button">X</span>\n    </div>\n  </div>\n  <div id="terminal-body">\n    <div class="output" id="output">\n      Browser CLI\n      <br>\n      Type help to view command list or help {command} for specific command syntax.\n      <br><br>\n    </div>\n    <div class="terminal-input-container">\n      <span class="cli-prompt">></span>\n      <input type="text" id="cli-command-input" autocomplete="off">\n    </div>\n  </div>\n';let r=!1;console.log("content script loaded");const d=document.createElement("style");d.textContent="\n  #terminal-container {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n\n    all: unset; \n    font-family: monospace; \n    font-size: 14px;\n\n    background-color: black; /* #282a36; */\n    font-family: 'Courier New', Courier, monospace;\n    color: white;\n    display: flex;\n    flex-direction : column;\n    justify-content: center; /* Horizontal centering */\n    align-items: center;    /* Vertical centering */\n    position: fixed;\n    \n    \n\n    width: 700px;\n    height: 350px;\n    user-select: none;\n\n    z-index: 9999;\n  }\n\n  #terminal-body {\n    box-sizing: border-box;\n    padding: 20px;\n    width: 100%;\n    height: 95%;\n    overflow-y: scroll;\n  }\n\n  .terminal-input-container {\n    display: flex;\n    align-items: center;\n  }\n\n  .cli-prompt {\n    color: #50fa7b;\n    margin-right: 10px;\n  }\n\n  #cli-command-input{\n    background-color: black;\n\n    background-color: transparent;\n    border: none;\n    color: #f8f8f2;\n    font-family: inherit;\n    flex-grow: 1;\n    outline: none;\n  }\n\n  #terminal-header {\n    height: 25px;\n    width: 100%;\n    display: flex;\n    justify-content: space-between;\n    background-color: white;\n    border: 1px solid black;\n    color: black;\n  }\n\n  #start {\n    padding-left : 8px;\n  }\n  #start, #end {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n\n  #cmd-img {\n    padding-inline: 8px;\n  }\n\n  .terminal-header-button {\n    padding-left: 10px;\n    padding-right: 10px;\n    display: flex;\n    align-items: center;\n    justify-content: center; \n    height: 100%;\n    cursor: pointer;\n    font-weight: bold;\n  }\n\n  .terminal-header-button:hover {\n    background-color: gainsboro;\n  }\n\n  #close-button:hover{\n    color: white;\n    background-color: red;\n  }\n\n  #maximize-button {\n    color: black;\n  }\n\n  #help-container {\n    display: flex;\n  }\n\n  #help-commands {\n    flex: 0 0 80px;\n  }\n\n  #help-text {\n    flex: 1;\n  }\n",document.head.appendChild(d),document.body.appendChild(o),function(n){const t=n.querySelector("#cli-command-input");t.focus();const i=n.querySelector("#terminal-body"),o=n.querySelector("#close-button"),d=n.querySelector("#maximize-button"),a=n.querySelector("#minimize-button");o.addEventListener("click",(()=>{n.style.display="none",r=!1,n.style.width="700px",n.style.height="350px"}));let l=!1;d.addEventListener("click",(()=>{l?(n.style.width="700px",n.style.height="350px",e(n),l=!1):(n.style.width="100%",n.style.height="100%",e(n),l=!0)})),a.addEventListener("click",(()=>{n.style.display="none"})),i.addEventListener("click",(()=>{t.focus()})),t.addEventListener("keyup",(function(n){var e;"Enter"===n.key&&(console.log(t.value),e=t.value,chrome.runtime.sendMessage({action:"command",command:e}))}))}(o),chrome.runtime.onMessage.addListener(((n,t,i)=>("open-terminal"===n.shortcut&&(r?(o.style.display="none",r=!1):(o.style.display="block",r=!0,e(o)),i({status:"Terminal opened"})),!0))),chrome.runtime.onMessage.addListener((function(n,e,o){return"ls"==n.action?function(n){let e="";for(let t of n.data)e+=`<p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;margin: 0px;">${t}</p>`;i(e,n)}(n):"find"==n.action?function(n){let e="";for(let t of n.data)e+=`<p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;margin: 0px;">${t}</p>`;i(e,n)}(n):"pwd"==n.action?function(n){i(`<p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${n.data}</p>`,n)}(n):"clear"==n.action?function(n){n.querySelector("#output").innerHTML=""}(terminal):"help"==n.action?function(n){let{commandObj:e}=n;null==e.arguments?i("<div>\nFor more information on a specific command, type: help [command-name]\n<br><br>\n<div id='help-container'>\n<div id='help-commands'>\n    <div>cd</div>\n    <div>ls</div>\n    <div>create</div>\n    <div>group</div>\n    <div>ungroup</div>\n    <div>rm</div>\n    <div>clear</div>\n    <div>find</div>\n</div>\n\n<div id='help-text'>\n    <div>move to a specific tab (use ls for tab indexes)</div>\n    <div>print open tabs with there index</div>\n    <div>create a new tab with a given url</div>\n    <div>create a new group or add a tab to existing group</div>\n    <div>ungroup a group or remove a tab from a group</div>\n    <div>close a tab or group tabs</div>\n    <div>clear terminal</div>\n    <div>search for tabs with a specific keyword</div>\n</div>\n</div>\n<br><br>\n</div>\n",n):i(t[e.arguments[0]+"Help"],n)}(n):"cd"==n.action?(terminal.querySelector("#cli-command-input").value="",terminal.scrollTo(0,terminal.scrollHeight)):"no-command-found"==n.action?function(n){""==n.command?i("",n):i(`'${n.data}' is not recognized as a command`,n)}(n):null!=n.action&&i("<br>",n),terminal.querySelector("#cli-command-input").value="",terminal.scrollTo(0,terminal.scrollHeight),o(),!0})),function(n){let e=0,t=0,i=Number(n.style.left.slice(0,-2)),o=Number(n.style.top.slice(0,-2)),r=!1;n.querySelector("#terminal-header").addEventListener("mousedown",(d=>{r=!0,e=d.clientX,t=d.clientY,i=Number(n.style.left.slice(0,-2)),o=Number(n.style.top.slice(0,-2))})),document.addEventListener("mouseup",(()=>{r=!1})),document.addEventListener("mousemove",(d=>{if(r){let r=d.clientX,a=d.clientY;n.style.left=i+r-e+"px",n.style.top=o+a-t+"px"}}))}(o),function(){let n=document.getElementsByClassName("terminal-header-button");for(let e of n)e.addEventListener("mousedown",(n=>{n.stopPropagation()}))}(),e(document.querySelector("#terminal-container")),o.style.display="none"})();