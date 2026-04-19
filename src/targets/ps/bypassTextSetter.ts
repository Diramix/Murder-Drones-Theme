import { titleText } from "../../script";

// Premium user check
(async () => {
	const isPremium = await window.IS_PREMIUM_USER();

	if (isPremium) {
		setPremiumText();
	}
})();

// Waiting for element availability
function waitForElement(
	selector: string,
	callback: (el: Element) => void,
): void {
	const el = document.querySelector(selector);

	if (el) {
		callback(el);
		return;
	}

	const observer = new MutationObserver(() => {
		const el = document.querySelector(selector);

		if (el) {
			observer.disconnect();
			callback(el);
		}
	});

	observer.observe(document.body, { childList: true, subtree: true });
}

// Custom TitleText Setup
function setPremiumText() {
	const watched = new WeakSet<Element>();
	const pulseText = '[class*="TitleBar_pulseText"]';

	function watchTextContent(el: Element) {
		new MutationObserver(() => {
			if (el.textContent !== titleText) {
				el.textContent = titleText;
			}
		}).observe(el, { childList: true, subtree: true, characterData: true });
	}

	function processElement() {
		const pulseTextSel = document.querySelector(pulseText);
		if (!pulseTextSel || watched.has(pulseTextSel)) return;
		watched.add(pulseTextSel);
		pulseTextSel.textContent = titleText;
		watchTextContent(pulseTextSel);
	}

	waitForElement(pulseText, () => {
		processElement();

		new MutationObserver(processElement).observe(document.body, {
			childList: true,
			subtree: true,
		});
	});
}
