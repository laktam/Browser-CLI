import { clear, find, ls, noCommandFound, printToConsole, pwd } from "./actions/domActions.js";

let terminal = document.getElementById('terminal');
draggable(terminal)



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


function draggable(element){
  let mouseClickX = 0
  let mouseClickY = 0
  let x = Number(element.style.left.slice(0,-2))
  let y = Number(element.style.top.slice(0,-2))
  let drag = false;

  element.addEventListener("mousedown", (e)=>{
    drag = true
    mouseClickX = e.clientX
    mouseClickY = e.clientY
    x = Number(element.style.left.slice(0,-2))
    y = Number(element.style.top.slice(0,-2))
    console.log("mouse down")
  })

  document.addEventListener("mouseup", (e)=>{
    drag = false;
    console.log("mouse up")
    mouseClickX = 0
    mouseClickY = 0
  })

  element.addEventListener("mousemove",(e)=>{
    if(drag){
      let currentMouseX = e.clientX
      let currentMouseY = e.clientY
    
      
      console.log("x y", x, y)
      element.style.left = x + currentMouseX - mouseClickX + "px"
      element.style.top = y +  currentMouseY - mouseClickY + "px"
      
      console.log("left and top", element.style.left, element.style.top)
    }
  })
}
