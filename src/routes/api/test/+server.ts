import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, platform }) => {
	const bucket = platform!.env.BUCKET;
	const res = await bucket.get('test.txt');
	return json({ out: await res?.bytes() });
};
