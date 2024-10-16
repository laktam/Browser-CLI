const input = document.getElementById('commandInput')
const terminal = document.getElementById('terminal')

terminal.addEventListener("click", () => {
    input.focus();
  });

input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      console.log(input.value);
      sendInput(input.value);
    }
});

function sendInput(command) {
    chrome.runtime.sendMessage({ action: "command", command });
}