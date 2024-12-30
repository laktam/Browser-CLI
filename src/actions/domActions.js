import { fullHelp, helpConstants } from "./constants";

/**
 * 
 * @param {string} toPrint - a command result to print bellow the command prompt (in html)
 * @param {string} message - used to print message.command (the full command)
 */
function printToConsole(toPrint, message){
  const resultSection = document.getElementById("output");
  let s = `<div><span class="cli-prompt">></span><span>${message.command}</span></div>`;
  s += toPrint;
  resultSection.insertAdjacentHTML("beforeend", s)

}
function ls(message) {
  console.log("message.data in ls ", message.data)
  
  if(message.commandObj["-g"] == undefined){
    let s = ""
    for (let tab of message.data) {
      s += `<p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;margin: 0px;">${tab}</p>`;
    }
    printToConsole(s, message)
  }
  else{
    const tree = renderTabGroupTree(message.data);
    printToConsole(tree, message)
  }
}

function find(message) {
  let s = "";
  for (let tab of message.data) {
    s += `<p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;margin: 0px;">${tab}</p>`;
  }
  printToConsole(s, message);
}

function pwd(message) {
  let s = `<p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${message.data}</p>`;
  printToConsole(s, message)
}

function clear(terminalBody) {
  terminalBody.querySelector("#output").innerHTML = "";
}
function noCommandFound(message) {
  if(message.command == ""){
    printToConsole("", message)
  }else{
    let s = `'${message.data}' is not recognized as a command`;
    printToConsole(s, message)
  }
}

function help(message){
  let {commandObj} = message
  if(commandObj.arguments == undefined){
    // full help
    printToConsole(fullHelp, message) // use a file for costants for help sub pages
  }else{
    printToConsole(helpConstants[commandObj.arguments[0] + 'Help'], message)
  }
}

function renderTabGroupTree(groups) {
  let tree = '<div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">';
  groups.forEach((group, groupIndex) => {
    const isLastGroup = groupIndex === groups.length - 1;
    const groupPrefix = isLastGroup ? '└─' : '├─';
    tree += `<div style="color: ${group.color}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${groupPrefix} ${group.title}</div>`;
    
    group.tabs.forEach((tab, tabIndex) => {
      const isLastTab = tabIndex === group.tabs.length - 1;
      const tabPrefix = isLastGroup ? '&nbsp;&nbsp;' : '│&nbsp;';
      const tabLine = isLastTab ? '└─' : '├─';
      tree += `<div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-left: 20px;">${tabPrefix}${tabLine} ${tab.title}</div>`;
    });
  });
  return tree + '</div>';
}


 
export {
  ls,
  find,
  pwd,
  clear,
  noCommandFound,
  help,
  printToConsole
};
