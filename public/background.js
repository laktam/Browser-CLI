(()=>{"use strict";async function t(){let t=await chrome.tabs.query({}),e=[];console.log(t);let a=1;for(let n of t){let t="("+a+") "+n.title+" : "+n.url;n.highlighted&&(t+=" *"),e.push(t),a++}return e}function e(t){return t.split(" ")}async function a(t){let e=await chrome.tabs.query({});t=t.map((t=>Number.parseInt(t)-1));let a=[];for(let n of t)a.push(e[n].id);return console.log("tab ids in function ",a),a}async function n(){let[t]=await chrome.tabs.query({active:!0,currentWindow:!0});return console.log(t.id),t.id}function o(t,e){chrome.tabs.sendMessage(t,{action:e})}let i={};chrome.runtime.onMessage.addListener((function(o,i,r){return"command"===o.action&&(console.log(o.command),async function(o){const i=function(t){return t.split(" ")}(o);let r,c=i[0],s=i[1],l=await n();"ls"==c?r=await t():"cd"==c?r=await async function(t){let e=await chrome.tabs.query({});chrome.tabs.update(e[Number.parseInt(t)-1].id,{active:!0})}(s):"rm"==c?r=await async function(t){let e=await chrome.tabs.query({});chrome.tabs.remove(e[Number.parseInt(t)-1].id)}(s):"find"==c?r=await async function(e){e=e.slice(1,e.length-1),console.log("arg ",e);let a=await t();return a=a.filter((t=>t.includes(e))),console.log("found tabs ",a),a}(s):"pwd"==c?r=await async function(){let[t]=await chrome.tabs.query({active:!0,currentWindow:!0});return t.title+" : "+t.url}():"create"==c?r=await async function(t){let a=e(t),n=!1,o="";"--active"==a[1]||"-a"==a[1]?(n=!0,o=a[2].slice(1,a[2].length-1)):o=a[1].slice(1,a[1].length-1),o.includes("http")||(o="https://"+o),chrome.tabs.create({active:n,url:o})}(o):"group"==c?r=await async function(t){let n,o=e(t);if(await chrome.tabs.query({}),"--new"==o[1]){let[t,e,i,...r]=o;i=o[2].slice(1,o[2].length-1);let c=await a(r);n=await chrome.tabs.group({tabIds:c}),await chrome.tabGroups.update(n,{collapsed:!1,title:i})}else if("--name"==o[1]){let[t,e,n,...i]=o;n=o[2].slice(1,o[2].length-1);let r=await a(i),c=await chrome.tabGroups.query({title:n});console.log("groups found ",c),await chrome.tabs.group({tabIds:r,groupId:c[0].id})}}(o):"ungroup"==c&&(r=await async function(t){let n=e(t);if("--tabs"==n[1]||"-t"==n[1]){let[t,e,...o]=n,i=await a(o);await chrome.tabs.ungroup(i)}else if("-g"==n[1]){let[t]=await chrome.tabGroups.query({title:n[2].slice(1,n[2].length-1)});console.log("group to ungroup ",t);let e=t.id,a=await chrome.tabs.query({}),o=[];for(let t of a)t.groupId==e&&o.push(t.id);await chrome.tabs.ungroup(o)}}(o)),chrome.tabs.sendMessage(l,{action:c,data:r})}(o.command),r()),!0})),chrome.commands.onCommand.addListener((function(t){return"open-terminal"===t&&n().then((t=>{console.log("open terminal command,  tabsWithOpenTerminal[id]:",i[t]),null==i[t]||0==i[t]?(i[t]=!0,o(t,"open-terminal")):!0===i[t]&&(i[t]=!1,o(t,"close-terminal"))})),!0}))})();