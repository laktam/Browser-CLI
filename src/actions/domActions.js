function printToConsole(toPrint, message){
  const resultSection = document.getElementById("output");
  let s = `<div><span class="prompt">></span><span>${message.command}</span></div>`;
  s += toPrint;
  resultSection.insertAdjacentHTML("beforeend", s)

}
function ls(message) {
  let s = ""
  for (let tab of message.data) {
    s += `<p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;margin: 0px;">${tab}</p>`;
  }
  printToConsole(s, message)
}

function find(message) {
  let s = "";
  for (let tab of message.data) {
    s += `<p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${tab}</p>`;
  }
  printToConsole(s, message);
}

function pwd(message) {
  let s = `<p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${message.data}</p>`;
  printToConsole(s, message)
}

function clear(terminal) {
  terminal.querySelector("#output").innerHTML = "";
}
function noCommandFound(message) {
  if(message.command == ""){
    printToConsole("", message)
  }else{
    let s = `'${message.data}' is not recognized as a command`;
    printToConsole(s, message)
  }
}

export {
  ls,
  find,
  pwd,
  clear,
  noCommandFound,
  printToConsole
};
