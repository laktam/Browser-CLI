(()=>{"use strict";async function t(){let t=await chrome.tabs.query({}),e=[];console.log(t);let a=1;for(let n of t){let t="("+a+") "+n.title+" : "+n.url;n.highlighted&&(t+=" *"),e.push(t),a++}return e}async function e(t){let e=await chrome.tabs.query({});t=t.map((t=>Number.parseInt(t)-1));let a=[];for(let n of t)a.push(e[n].id);return console.log("tab ids in function ",a),a}async function a(){let[t]=await chrome.tabs.query({active:!0,currentWindow:!0});return console.log(t.id),t.id}console.log("log in content script"),chrome.runtime.onMessage.addListener((function(n,o,r){return"command"===n.action&&(console.log(n.command),async function(n){const o=function(t){let e=(t=t.replace("s{2,}"," ")).split(" ");const a={command:t=e[0]};if(e.length>1){let t=0;for(;t<e.length;)e[t].startsWith("-")&&t+1<e.length&&(a[e[t]]=e[t+1],t++),t++;const n=e.findLastIndex((t=>t.startsWith("-")))+2;n<e.length&&(a.arguments=e.slice(n));const o=e.findLastIndex((t=>t.startsWith("-")))+1;o<e.length&&(a.allLastArguments=e.slice(o))}return console.log("command object",a),a}(n);let r;"ls"==o.command?r=await t():"cd"==o.command?r=await async function(t){let e=await chrome.tabs.query({});a().then((t=>chrome.tabs.sendMessage(t,{action:"cd"}))),chrome.tabs.update(e[Number.parseInt(t.arguments[0])-1].id,{active:!0})}(o):"rm"==o.command?r=await async function(t){if(null!=t["-g"]){let[e]=await chrome.tabGroups.query({title:t["-g"].slice(1,t["-g"].length-1)}),a=e.id,n=await chrome.tabs.query({}),o=[];for(let t of n)t.groupId==a&&o.push(t.id);await chrome.tabs.remove(o)}else{let e=await chrome.tabs.query({});chrome.tabs.remove(e[Number.parseInt(t.arguments[0])-1].id)}}(o):"find"==o.command?r=await async function(e){let a=e.arguments[0].slice(1,e.arguments[0].length-1);a=a.toLowerCase();let n=await t();return n=n.map((t=>t.toLowerCase())),n=n.filter((t=>t.includes(a))),n}(o):"pwd"==o.command?r=await async function(){let[t]=await chrome.tabs.query({active:!0,currentWindow:!0});return t.title+" : "+t.url}():"create"==o.command?r=await async function(t){let e=!1,a="";null!=t["--active"]?(e=!0,a=t["--active"].slice(1,t["--active"].length-1)):null!=t["-a"]?(e=!0,a=t["-a"].slice(1,t["-a"].length-1)):a=t.arguments[0].slice(1,t.arguments[0].length-1),a.startsWith("http")||a.startsWith("https")||(a=a.startsWith("www")?"http://"+a:"https://www.google.com/search?q="+a),chrome.tabs.create({active:e,url:a})}(o):"group"==o.command?r=await async function(t){let a;if(null!=t["--new"]){let n=t["--new"].slice(1,t["--new"].length-1),o=await e(t.arguments);a=await chrome.tabs.group({tabIds:o}),await chrome.tabGroups.update(a,{collapsed:!1,title:n})}else if(null!=t["--name"]){let a=t["--name"].slice(1,t["--name"].length-1),n=await e(t.arguments),o=await chrome.tabGroups.query({title:a});console.log("groups found ",o),await chrome.tabs.group({tabIds:n,groupId:o[0].id})}}(o):"ungroup"==o.command?r=await async function(t){if(null!=t["--tabs"]||null!=t["-t"]){let a=t.allLastArguments,n=await e(a);await chrome.tabs.ungroup(n)}else if(null!=t["--name"]){let e=t["--name"].slice(1,t["--name"].length-1),[a]=await chrome.tabGroups.query({title:e}),n=a.id,o=await chrome.tabs.query({}),r=[];for(let t of o)t.groupId==n&&r.push(t.id);await chrome.tabs.ungroup(r)}}(o):"clear"==o.command?r="Terminal cleared":"help"==o.command?r="Help command executed":(r=o.command,o.command="no-command-found"),a().then((t=>{chrome.tabs.sendMessage(t,{action:o.command,data:r,command:n,commandObj:o})}))}(n.command),r()),!0})),chrome.commands.onCommand.addListener((t=>{console.log("Command triggered:",t),"open-terminal"===t&&(console.log("shortcut clicked"),a().then((t=>{chrome.tabs.sendMessage(t,{shortcut:"open-terminal"},(t=>{chrome.runtime.lastError?console.error(`Error injecting HTML into tab ${tab.id}: ${chrome.runtime.lastError.message}`):console.log(`Response from tab ${tab.id}:`,t)}))})))}))})();