chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.action === "classic") {

        console.log("Looking for Play now button...");

        const playButton = [...document.querySelectorAll("button")]
            .find(btn => btn.textContent.trim().includes("Start game"));

        if (playButton) {
            console.log("Button found!");
            playButton.click();
        } else {
            console.log("Button not found");
        }
    }
});
