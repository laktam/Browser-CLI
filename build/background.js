(()=>{"use strict";async function t(){let t=await chrome.tabs.query({}),e=[];console.log(t);let a=1;for(let n of t){let t="("+a+") "+n.title+" : "+n.url;n.highlighted&&(t+=" *"),e.push(t),a++}return e}async function e(t){let e=await chrome.tabs.query({});t=t.map((t=>Number.parseInt(t)-1));let a=[];for(let n of t)a.push(e[n].id);return console.log("tab ids in function ",a),a}chrome.runtime.onMessage.addListener((function(a,n,o){return"command"===a.action&&(console.log(a.command),async function(a){const n=function(t){let e=(t=t.replace("s{2,}"," ")).split(" ");const a={command:t=e[0]};if(e.length>1){let t=0;for(;t<e.length;)e[t].startsWith("-")&&t+1<e.length&&(a[e[t]]=e[t+1],t++),t++;const n=e.findLastIndex((t=>t.startsWith("-")))+2;n<e.length&&(a.arguments=e.slice(n));const o=e.findLastIndex((t=>t.startsWith("-")))+1;o<e.length&&(a.allLastArguments=e.slice(o))}return console.log("command object",a),a}(a);let o;"ls"==n.command?o=await t():"cd"==n.command?o=await async function(t){let e=await chrome.tabs.query({});chrome.tabs.update(e[Number.parseInt(t.arguments[0])-1].id,{active:!0})}(n):"rm"==n.command?o=await async function(t){if(null!=t["-g"]){let[e]=await chrome.tabGroups.query({title:t["-g"].slice(1,t["-g"].length-1)}),a=e.id,n=await chrome.tabs.query({}),o=[];for(let t of n)t.groupId==a&&o.push(t.id);await chrome.tabs.remove(o)}else{let e=await chrome.tabs.query({});chrome.tabs.remove(e[Number.parseInt(t.arguments[0])-1].id)}}(n):"find"==n.command?o=await async function(e){let a=e.arguments[0].slice(1,e.arguments[0].length-1),n=await t();return n=n.filter((t=>t.includes(a))),n}(n):"pwd"==n.command?o=await async function(){let[t]=await chrome.tabs.query({active:!0,currentWindow:!0});return t.title+" : "+t.url}():"create"==n.command?o=await async function(t){let e=!1,a="";null!=t["--active"]?(e=!0,a=t["--active"].slice(1,t["--active"].length-1)):null!=t["-a"]?(e=!0,a=t["-a"].slice(1,t["-a"].length-1)):a=t.arguments[0].slice(1,t.arguments[0].length-1),a.includes("http")||(a="http://"+a),chrome.tabs.create({active:e,url:a})}(n):"group"==n.command?o=await async function(t){let a;if(null!=t["--new"]){let n=t["--new"].slice(1,t["--new"].length-1),o=await e(t.arguments);a=await chrome.tabs.group({tabIds:o}),await chrome.tabGroups.update(a,{collapsed:!1,title:n})}else if(null!=t["--name"]){let a=t["--name"].slice(1,t["--name"].length-1),n=await e(t.arguments),o=await chrome.tabGroups.query({title:a});console.log("groups found ",o),await chrome.tabs.group({tabIds:n,groupId:o[0].id})}}(n):"ungroup"==n.command?o=await async function(t){if(null!=t["--tabs"]||null!=t["-t"]){let a=t.allLastArguments,n=await e(a);await chrome.tabs.ungroup(n)}else if(null!=t["--name"]){let e=t["--name"].slice(1,t["--name"].length-1),[a]=await chrome.tabGroups.query({title:e}),n=a.id,o=await chrome.tabs.query({}),c=[];for(let t of o)t.groupId==n&&c.push(t.id);await chrome.tabs.ungroup(c)}}(n):"clear"==n.command||(o=n.command,n.command="no-command-found"),chrome.runtime.sendMessage({action:n.command,data:o,command:a})}(a.command),o()),!0}))})();