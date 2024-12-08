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

function sendOpenTerminalMessage(){
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, {
        shortcut: "open-terminal",
      }, (response) => {
        if (chrome.runtime.lastError) {
          console.error(`Error injecting HTML into tab ${tab.id}: ${chrome.runtime.lastError.message}`);
        } else {
          console.log(`Response from tab ${tab.id}:`, response);
        }
      });
    });
  });
}


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


/**
 * execute a command and send message to newTab.js
 * the message sent :
 *  {
 *     action  // will contain the command or "no-command-found"
 *     data    // will contain result or the command if it is not found
 *     command // the whole typed command
 *  }
 * 
 */

async function executeCommand(command) {
  const commandObj = getCommandObject(command);
  let data;

  if (commandObj.command == "ls") {
    data = await ls();
  } else if (commandObj.command == "cd") {
    data = await cd(commandObj);
  } else if (commandObj.command == "rm") {
    data = await rm(commandObj);
  } else if (commandObj.command == "find") {
    data = await find(commandObj);
  } else if (commandObj.command == "pwd") {
    data = await pwd();
  } else if (commandObj.command == "create") {
    data = await create(commandObj);
  } else if (commandObj.command == "group") {
    data = await group(commandObj);
  } else if (commandObj.command == "ungroup") {
    data = await ungroup(commandObj);
  } else if (commandObj.command == "clear") {
    // Handle "clear" locally in the current terminal
    data = "Terminal cleared"; // You can customize this if needed
  } else if (commandObj.command == "help") {
    // Handle "help" locally
    data = "Help command executed"; // Customize as needed
  } else {
    data = commandObj.command;
    commandObj.command = "no-command-found";
  }

  // Send the response to all tabs
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, {
        action: commandObj.command, // Will contain the command or "no-command-found"
        data: data, // Will contain result or the command if not found
        command: command, // The whole typed command
        commandObj: commandObj, // The command object itself
      });
    });
  });
}


// async function executeCommand(command) {
//   const commandObj = getCommandObject(command);
//   // let cmd = keywords[0];
//   // let arg = keywords[1];
//   let data;
//   if (commandObj.command == "ls") {
//     data = await ls();
//   } else if (commandObj.command == "cd") {
//     data = await cd(commandObj);
//   } 
//   else if (commandObj.command == "rm") {
//     data = await rm(commandObj);
//   } 
//   else if (commandObj.command == "find") {
//     data = await find(commandObj);
//   } 
//   else if (commandObj.command == "pwd") {
//     data = await pwd();
//   }
//    else if (commandObj.command == "create") {
//     data = await create(commandObj);
//   }
//    else if (commandObj.command == "group") {
//     data = await group(commandObj);
//   } 
//   else if (commandObj.command == "ungroup") {
//     data = await ungroup(commandObj);
//   }
//   else if(commandObj.command == "clear"){
//     // command managed in newTab.js are sent directly
//   }else if (commandObj.command == "help"){
//     // command managed in newTab.js are sent directly
//   }
//   else {
//     data = commandObj.command
//     commandObj.command = "no-command-found"
    
//   }
//   chrome.runtime.sendMessage(
//     {
//         action: commandObj.command, // will contain the command or "no-command-found"
//         data: data,// will contain result or the command if it is not found
//         command, // the whole typed command
//         commandObj
//       }
//   );

// }

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
    // if the command is like "ungroup -t 1 2 3" 2 and 3 will be in arguments and 2 in -t
    // so use all last arguments
    const allLastArgumentsIndex = keywords.findLastIndex((element) => element.startsWith('-')) + 1
    if(allLastArgumentsIndex < keywords.length){
      commandObj["allLastArguments"] = keywords.slice(allLastArgumentsIndex)
    }
  }
  console.log("command object", commandObj)
  return commandObj;
}
export { sendCommandToTab, getOpenTabId, executeCommand, sendOpenTerminalMessage };
