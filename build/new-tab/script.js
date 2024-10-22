const terminalContainer = document.getElementById('terminal-container')
const input = document.getElementById('commandInput')
const terminal = document.getElementById('terminal')
const closeButton = document.getElementById('close-button')
const maximizeButton = document.getElementById('maximize-button')


closeButton.addEventListener('click', ()=>{
  terminalContainer.remove()
})

maximizeButton.addEventListener('click', ()=>{
  terminalContainer.style.width = "100%"
  terminalContainer.style.height = "100%"
})

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