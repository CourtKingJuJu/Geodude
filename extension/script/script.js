function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.action === "classic") {

        runSequence();
    }
});

async function runSequence() {

    console.log("Looking for Start game button...");

    const playButton = [...document.querySelectorAll("button")]
        .find(btn => btn.textContent.trim().includes("Start game"));

    if (playButton) {

        console.log("Start button found!");
        playButton.click();

    } else {

        console.log("Start button not found");
        return;
    }

    // Wait 2 seconds
    await sleep(2000);

    console.log("Looking for All button...");

    const allButton = [...document.querySelectorAll("button")]
        .find(btn => btn.textContent.trim().includes("All"));

    if (allButton) {

        console.log("All button found!");
        allButton.click();

    } else {

        console.log("All button not found");
    }

    await sleep(2000);

    console.log("Looking for World mode...");

    const worldMode = [...document.querySelectorAll("img")]
        .find(img => img.alt.includes("World"));

    if (worldMode) {

        console.log("World mode found!");
        worldMode.click();

    } else {

        console.log("World mode not found");
    }
}
