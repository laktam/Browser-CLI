(()=>{"use strict";async function t(){let t=await chrome.tabs.query({}),e=[];console.log(t);let a=1;for(let n of t){let t="("+a+") "+n.title+" : "+n.url;n.highlighted&&(t+=" *"),e.push(t),a++}return e}chrome.runtime.onMessage.addListener((function(e,a,n){return"command"===e.action&&(console.log(e.command),async function(e){const a=function(t){let e=(t=t.replace("s{2,}"," ")).split(" ");const a={command:t=e[0]};if(e.length>1){let t=0;for(;t<e.length;)e[t].startsWith("-")&&t+1<e.length&&(a[e[t]]=e[t+1],t++),t++;const n=e.findLastIndex((t=>t.startsWith("-")))+2;n<e.length&&(a.arguments=e.slice(n))}return console.log("command object",a),a}(e);let n;"ls"==a.command?n=await t():"cd"==a.command?n=await async function(t){let e=await chrome.tabs.query({});chrome.tabs.update(e[Number.parseInt(t.arguments[0])-1].id,{active:!0})}(a):"rm"==a.command?n=await async function(t){if(null!=t["-g"]){let[e]=await chrome.tabGroups.query({title:t["-g"].slice(1,t["-g"].length-1)}),a=e.id,n=await chrome.tabs.query({}),c=[];for(let t of n)t.groupId==a&&c.push(t.id);await chrome.tabs.remove(c)}else{let e=await chrome.tabs.query({});chrome.tabs.remove(e[Number.parseInt(t.arguments[0])-1].id)}}(a):"find"==a.command?n=await async function(e){let a=e.arguments[0].slice(1,e.arguments[0].length-1),n=await t();return n=n.filter((t=>t.includes(a))),n}(a):"pwd"==a.command?n=await async function(){let[t]=await chrome.tabs.query({active:!0,currentWindow:!0});return t.title+" : "+t.url}():"create"==a.command&&(n=await async function(t){let e=!1,a="";null!=t["--active"]?(e=!0,a=t["--active"].slice(1,t["--active"].length-1)):null!=t["-a"]?(e=!0,a=t["-a"].slice(1,t["-a"].length-1)):a=t.arguments[0].slice(1,t.arguments[0].length-1),a.includes("http")||(a="http://"+a),chrome.tabs.create({active:e,url:a})}(a)),chrome.runtime.sendMessage({action:a.command,data:n})}(e.command),n()),!0}))})();