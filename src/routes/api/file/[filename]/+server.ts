import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, platform, params }) => {
	const bucket = platform!.env.BUCKET;
	const id = params.filename;
	const file = await bucket.get(id);
	if (!file) {
		return json({ error: 'File not found' }, { status: 404 });
	}
	return new Response(await file.blob());
};
