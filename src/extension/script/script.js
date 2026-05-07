chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.action === "classic") {

        console.log("Looking for Play now button...");

        const playButton = document.querySelector(
            'a[href*="/challenge/"][href*="autoJoin=1"]'
        );

        if (playButton) {
            console.log("Button found!");
            playButton.click();
        } else {
            console.log("Button not found");
        }
    }
});
