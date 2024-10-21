import { clear, find, ls, noCommandFound, printToConsole, pwd } from "./actions/domActions.js";

const terminal = document.getElementById('terminal');
const terminal_container = document.getElementById('terminal-container');
const terminal_header = document.getElementById('terminal-header');
makeTerminalDraggable(terminal_header, terminal_container)



chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action == "ls") {
    ls(message);
  } else if (message.action == "find") {
    find(message);
  } else if (message.action == "pwd") {
    pwd(message);
  } else if (message.action == "clear") {
    clear(terminal);
  }
  else if(message.action == "no-command-found"){
    noCommandFound(message)
  }else {
  // commands  handled in bg script
  // cd
  // create
  // group
  //ungroup
  //???
    printToConsole("<br>", message) // print only the command no output
  }

  //clear input after each background message
  terminal.querySelector("#commandInput").value = "";
  terminal.scrollTo(0, terminal.scrollHeight);

  sendResponse();
  return true;
});


function makeTerminalDraggable(terminal_header, terminal_container){
  let mouseClickX = 0
  let mouseClickY = 0
  let x = Number(terminal_container.style.left.slice(0,-2))
  let y = Number(terminal_container.style.top.slice(0,-2))
  let drag = false;

  terminal_header.addEventListener("mousedown", (e)=>{
    drag = true
    mouseClickX = e.clientX
    mouseClickY = e.clientY
    x = Number(terminal_container.style.left.slice(0,-2))
    y = Number(terminal_container.style.top.slice(0,-2))
    console.log("mouse down")
  })

  document.addEventListener("mouseup", (e)=>{
    drag = false;
    console.log("mouse up")
  })

  terminal_header.addEventListener("mousemove",(e)=>{
    if(drag){
      let currentMouseX = e.clientX
      let currentMouseY = e.clientY
    
      
      console.log("x y", x, y)
      terminal_container.style.left = x + currentMouseX - mouseClickX + "px"
      terminal_container.style.top = y +  currentMouseY - mouseClickY + "px"
      
      console.log("left and top", terminal_container.style.left, terminal_container.style.top)
    }
  })
}
