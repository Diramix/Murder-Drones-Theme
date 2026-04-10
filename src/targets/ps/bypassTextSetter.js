// TitleBar text bypass & mod
function waitForElement(selector, callback) {
    const el = document.querySelector(selector);
    if (el) {
        callback(el);
        return;
    }

    const clientObserver = new MutationObserver(() => {
        const el = document.querySelector(selector);
        if (el) {
            clientObserver.disconnect();
            callback(el);
        }
    });

    clientObserver.observe(document.body, { childList: true, subtree: true });
}

// PulseSync
waitForElement('[class*="TitleBar_pulseText"]', () => {
    const titleBarTextElement = ["TitleBar_pulseText"];
    const titleBarTextObserver = new MutationObserver(() => {
        document
            .querySelectorAll(
                titleBarTextElement
                    .map((cls) => `[class*="${cls}"]:not(.TitleBar_bypassText)`)
                    .join(", "),
            )
            .forEach((el) => {
                el.className = [...el.classList]
                    .map((cls) =>
                        titleBarTextElement.some((t) => cls.includes(t))
                            ? "TitleBar_bypassText"
                            : cls,
                    )
                    .join(" ");
            });
    });
    titleBarTextObserver.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
    });
});
