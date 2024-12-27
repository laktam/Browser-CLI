document.addEventListener("DOMContentLoaded", () => {
    const shortcutLink = document.getElementById("shortcutLink");
    const userAgent = navigator.userAgent;
  
    let url = "#"; // Default URL
    if (userAgent.includes("Edg/")) {
      url = "edge://extensions/shortcuts";
    } else if (userAgent.includes("Chrome")) {
      url = "chrome://extensions/shortcuts";
    } else if (userAgent.includes("Firefox")) {
      url = "about:addons";
    }
  
    shortcutLink.href = url;
  
    // Open in a new tab when clicked
    shortcutLink.addEventListener("click", (e) => {
      e.preventDefault();
      chrome.tabs.create({ url });
    });
  });
  