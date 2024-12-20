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