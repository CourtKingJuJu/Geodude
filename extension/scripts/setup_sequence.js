function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForNavReady() {

    while (true) {

        const nav = document.querySelector('[class*="panorama-compass_compassContainer__VAYam"]');

        if (nav) {
            console.log("Game fully loaded");
            await sleep(1500); // Let tiles stablize
            return;
        }
        await sleep(1500); 
    }
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

    // All Button
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

    // World Mode 
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

    // No Move Button
    await sleep(2000);

    console.log("Looking for No Move...");

    const noMove = [...document.querySelectorAll("button")]
        .find(btn => btn.textContent.trim().includes("No Move"));

    if (noMove) {

        console.log("No Move found!");
        noMove.click();

    } else {

        console.log("No Move not found");
    }

    // Play Button
    await sleep(2000);

    console.log("Looking for Play...");

    const play = [...document.querySelectorAll("button")]
        .find(btn => btn.textContent.trim().includes("Play"));

    if (play) {

        console.log("Play found!");
        play.click();

    } else {

        console.log("Play not found");
    }

    gameLoop();  
}

async function gameLoop() {
    for (let round = 0; round < 5; round++) {

        console.log("Waiting for round", round + 1, " to be ready");

        await waitForNavReady();
        
        await Screenshot()
        for (let i = 0; i < 3; i++){
            // move
            console.log("drag mouse")
            await dragMouse(
                window.innerWidth / 2,
                window.innerHeight / 2,
                2550,
                0
            );
            await Screenshot()
            sleep(2500)
        }

        return

        // await waitForNextRound();
    }
}

async function dragMouse(startX, startY, deltaX, deltaY) {

    return new Promise((resolve) => {

        chrome.runtime.sendMessage({
            action: "drag",
            startX,
            startY,
            deltaX,
            deltaY
        });

        setTimeout(resolve, 1500);
    });
}

async function Screenshot(){
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({
            action: "screenshot",
        });

        setTimeout(resolve, 1500);
    });
}