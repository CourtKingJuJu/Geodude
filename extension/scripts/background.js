chrome.runtime.onMessage.addListener(async (message, sender) => {

    if (message.action === "drag") {

        const tabId = sender.tab.id;

        try {

            await chrome.debugger.attach({ tabId }, "1.3");

            const startX = message.startX;
            const startY = message.startY;
            const endX = startX + message.deltaX;
            const endY = startY + message.deltaY;

            // mouse down
            await chrome.debugger.sendCommand(
                { tabId },
                "Input.dispatchMouseEvent",
                {
                    type: "mousePressed",
                    x: startX,
                    y: startY,
                    button: "left",
                    clickCount: 1
                }
            );

            // drag
            const steps = 25;

            for (let i = 1; i <= steps; i++) {

                const moveX = startX + ((endX - startX) * i / steps);
                const moveY = startY + ((endY - startY) * i / steps);

                await chrome.debugger.sendCommand(
                    { tabId },
                    "Input.dispatchMouseEvent",
                    {
                        type: "mouseMoved",
                        x: moveX,
                        y: moveY,
                        button: "left"
                    }
                );

                await new Promise(r => setTimeout(r, 16));
            }

            // mouse up
            await chrome.debugger.sendCommand(
                { tabId },
                "Input.dispatchMouseEvent",
                {
                    type: "mouseReleased",
                    x: endX,
                    y: endY,
                    button: "left",
                    clickCount: 1
                }
            );

            await chrome.debugger.detach({ tabId });

            console.log("drag complete");

        } catch (err) {

            console.error(err);
        }
    }


    if (message.action === "screenshot") {
        chrome.tabs.captureVisibleTab(null, {format: 'png'}, async (dataUrl) => {

            await fetch("http://127.0.0.1:5000/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    image: dataUrl
                })
            });

            console.log("screenshot sent")
             
        });
        return true;
    }
});