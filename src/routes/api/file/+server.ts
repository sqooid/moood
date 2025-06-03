import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform }) => {
	const bucket = platform!.env.BUCKET;
	// todo: dedupe images
	const form = await request.formData();
	console.log(form);

	const jobs = Array.from(form.values()).map(async (value) => {
		if (value instanceof Blob) {
			const ext = value.name.split('.').pop() || '';
			const name = crypto.randomUUID() + '.' + ext;
			await bucket.put(name, value);
			return { originalName: value.name, uploadedName: name };
		}
	});
	return json(await Promise.all(jobs));
};
