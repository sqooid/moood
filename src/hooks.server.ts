import type { Handle } from '@sveltejs/kit';

const handleAuth: Handle = async ({ event, resolve }) => {
	return resolve(event);
};

export const handle: Handle = handleAuth;
