document.getElementById("classicBtn").addEventListener("click", async () => {
    console.log("Classic clicked");

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });
    
    chrome.tabs.sendMessage(tab.id, {
        action: "classic"
    });
});