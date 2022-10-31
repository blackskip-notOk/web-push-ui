export function isPushNotificationSupported() {
	const isServiceWorkerSupported = 'serviceWorker' in navigator;
	const isPushManagerSupported = 'PushManager' in window;
	return isServiceWorkerSupported && isPushManagerSupported;
}

export const registerServiceWorker = async () => {
	if (isPushNotificationSupported()) {
		try {
			const registration = await navigator.serviceWorker.register('/service-worker.ts', {
				scope: '/',
				type: 'classic',
				updateViaCache: 'all',
			});

			if (registration.installing) {
				console.info('Service worker installing');
			} else if (registration.waiting) {
				console.info('Service worker installed');
			} else if (registration.active) {
				console.info('Service worker active');
			}
		} catch (error) {
			console.error(`Registration failed with ${error}`);
		}
	} else {
		console.error(`Your browser doesn't support service worker or web push technology`);
	}
};

export const askPermission = async () => {
	const askPermissionResult = await new Promise((resolve) => {
		const permissionResult = Notification.requestPermission((result) => {
			resolve(result);
		});

		if (permissionResult) {
			permissionResult.then(resolve);
		}
	});

	if (askPermissionResult !== 'granted') {
		throw new Error("We weren't granted permission.");
	}
};

export const subscribeUserToPush = async () => {
	const serviceWorker = await navigator.serviceWorker.ready;

	const subscription = await serviceWorker.pushManager.subscribe({
		userVisibleOnly: true,
		// applicationServerKey: pushServerPublicKey,
	});

	console.info('User is Subscribe', subscription);

	const subscriptionObject = {
		endpoint: subscription.endpoint,
		keys: {
			p256dh: subscription.getKey('p256dh'),
			auth: subscription.getKey('auth'),
		},
	};

	return subscriptionObject;
};

export const sendSubscriptionToServer = async () => {
	const subscription = await subscribeUserToPush();

	const saveSubscriptionResponse = await fetch('api/save-subscription/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(subscription),
	});

	if (!saveSubscriptionResponse.ok) {
		throw new Error('Bad status code from server.');
	}
};

export function sendNotification() {
	const text = 'Take a look at this brand new tarif';
	const title = 'New Product Available';
	const image = '/public/IMG_1125.JPG';
	const options = {
		body: text,
		image,
		tag: 'new-product',
		badge: '/public/IMG_0579.JPG',
		actions: [{ action: 'Detail', title: 'View', icon: '/public/IMG_0578.JPG' }],
	};
	navigator.serviceWorker.ready.then((serviceWorker) => {
		serviceWorker.showNotification(title, options);
	});
}
