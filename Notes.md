- bg script listen for shortcut "ctrl + shift + u"
    - it sends a message to content script
- content script displays the terminal on all tabs

- a command is typed and sent to the **bg** script 
    - { action: "command", command }
- in bg : the command is parsed to a commandObject
    - the command method is executed then the result object is sent to content 
        ```javascript
        {
            action: commandObj.command, // Will contain the command or "no-command-found"
            data: data, // Will contain result or the command if not found
            command: command, // The whole typed command
            commandObj: commandObj, // The command object itself
        }
        ```
- use the message.data in the content script 


open-terminal command send the objet
{
    shortcut : "open-terminal"
}


commands sent from terminal from bg to content script
{
    action: commandObj.command, // Will contain the command or "no-command-found"
    data: data, // Will contain result or the command if not found
    command: command, // The whole typed command
    commandObj: commandObj, // The command object itself    
}