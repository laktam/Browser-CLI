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

function find(data) {
  const resultSection = document.getElementById("output");
  let s = "";
  for (let tab of data) {
    s += `<p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${tab}</p>`;
  }
  resultSection.innerHTML = s;
}

function pwd(data) {
  const resultSection = document.getElementById("output");
  resultSection.innerHTML = `<p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${data}</p>`;
}

function clear(terminal) {
  terminal.querySelector("#output").innerHTML = "";
}
function noCommandFound(command) {
  const resultSection = document.getElementById("output");
  resultSection.innerText= `'${command}' is not recognized as a command`;
}

export {
  ls,
  find,
  pwd,
  clear,
  noCommandFound
};
