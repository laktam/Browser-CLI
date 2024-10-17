
function ls(data) {
  const resultSection = document.getElementById("output");
  let s = "";
  for (let tab of data) {
    s += `<p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;margin: 0px;">${tab}</p>`;
  }
  resultSection.innerHTML = s;
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

export {
  ls,
  find,
  pwd,
  clear,
};
