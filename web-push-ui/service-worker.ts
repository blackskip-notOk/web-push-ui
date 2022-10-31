/// <reference lib="WebWorker" />

declare const self: ServiceWorkerGlobalScope;
export type {};

const addResourcesToCache = async (resourses: Array<string>) => {
	const cache = await caches.open('service-worker cache');

	await cache.addAll(resourses);
};

const putInCache = async (request: Request, response: Response) => {
	if (!request.url.startsWith('http')) {
		return;
	}
	const cache = await caches.open('service-worker cache');
	await cache.put(request, response);
};

type CacheFirstParams = { request: Request; fallbackUrl: string };

type CacheFirst = (params: CacheFirstParams) => Promise<Response>;

const cacheFirst: CacheFirst = async ({ request, fallbackUrl }) => {
	const responseFromCache = await caches.match(request);

	if (responseFromCache) {
		return responseFromCache;
	}

	try {
		const responseFromNetwork = await fetch(request);

		putInCache(request, responseFromNetwork.clone());

		return responseFromNetwork;
	} catch (error) {
		const fallbackResponse = await caches.match(fallbackUrl);

		if (fallbackResponse) {
			return fallbackResponse;
		}

		return new Response('Network error happened', {
			status: 408,
			headers: { 'Content-Type': 'text/plain' },
		});
	}
};

self.addEventListener<'install'>('install', (event) => {
	event.waitUntil(addResourcesToCache(['/src/main.tsx']));
});

self.addEventListener<'fetch'>('fetch', async (event) => {
	event.respondWith(
		cacheFirst({
			request: event.request,
			fallbackUrl: './public/vite.svg',
		}),
	);
});

function receivePushNotification(event: PushEvent) {
	console.log('[Service Worker] Push Received.');

	if (!!event.data) {
		const notificationText = event.data.text();
		const title = 'A brand new notification!';

		const options = {
			data: 'something you want to send within the notification, such an URL to open',
			body: notificationText,
			badge: '/public/IMG_0579.JPG',
			actions: [{ action: 'Detail', title: 'View', icon: '/public/IMG_0578.JPG' }],
		};
		event.waitUntil(self.registration.showNotification(title, options));
	}
};

self.addEventListener<'push'>('push', receivePushNotification);
