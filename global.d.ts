export {};

declare global {
	interface Window {
		nextmusicApi: any;
		IS_PREMIUM_USER: () => Promise<boolean>;
	}
}
