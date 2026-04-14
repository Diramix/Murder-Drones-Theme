function waitForElement(
    selector: string,
    callback: (el: Element) => void,
): void {
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

    clientObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });
}

// PulseSync
waitForElement('[class*="TitleBar_pulseText"]', () => {
    const titleBarTextElement: string[] = ["TitleBar_pulseText"];

    const titleBarTextObserver = new MutationObserver(() => {
        document
            .querySelectorAll(
                titleBarTextElement
                    .map((cls) => `[class*="${cls}"]:not(.TitleBar_bypassText)`)
                    .join(", "),
            )
            .forEach((el: Element) => {
                el.className = [].slice
                    .call(el.classList)
                    .map((cls: string) =>
                        titleBarTextElement.some((t) => cls.indexOf(t) !== -1)
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
