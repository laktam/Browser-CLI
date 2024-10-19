import {
  cd,
  create,
  find,
  group,
  ls,
  pwd,
  rm,
  ungroup,
} from "./backroundCommands";

async function getOpenTabId() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log(tab.id);
  return tab.id;
}

function sendCommandToTab(id, command) {
  chrome.tabs.sendMessage(id, {
    action: command,
  });
}

async function executeCommand(command) {
  const commandObj = getCommandObject(command);
  // let cmd = keywords[0];
  // let arg = keywords[1];
  let data;
  if (commandObj.command == "ls") {
    data = await ls();
  } else if (commandObj.command == "cd") {
    data = await cd(commandObj);
  } 
  else if (commandObj.command == "rm") {
    data = await rm(commandObj);
  } 
  else if (commandObj.command == "find") {
    data = await find(commandObj);
  } 
  // else if (cmd == "pwd") {
  //   data = await pwd();
  // } else if (cmd == "create") {
  //   data = await create(command);
  // } else if (cmd == "group") {
  //   data = await group(command);
  // } else if (cmd == "ungroup") {
  //   data = await ungroup(command);
  // }

  chrome.runtime.sendMessage(
    {
        action: commandObj.command,
        data: data,
      }
  );

}

function getCommandObject(command) {
  command = command.replace("\s{2,}", " ")
  let keywords = command.split(" ")
  command = keywords[0]
  const commandObj ={command}

  
  if(keywords.length> 1){
    let i = 0;
    while(i < keywords.length){
      if(keywords[i].startsWith('-')){
        if(i + 1 < keywords.length){
          commandObj[keywords[i]] = keywords[i + 1]
          i++;// to jump over the value
        }
      }
      i++;
    }
    // last argument(s) index
    const index = keywords.findLastIndex((element) => element.startsWith('-')) + 2
    if(index < keywords.length){
      commandObj["arguments"] = keywords.slice(index)
    }
  }
  console.log("command object", commandObj)
  return commandObj;
}
export { sendCommandToTab, getOpenTabId, executeCommand };
