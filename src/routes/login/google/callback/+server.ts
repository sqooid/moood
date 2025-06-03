import { google } from '$lib/server/auth/google';
import { decodeIdToken } from 'arctic';
import * as schema from '$lib/server/db/schema';

import type { RequestEvent } from '@sveltejs/kit';
import type { OAuth2Tokens } from 'arctic';
import { getDb } from '$lib/server/db';
import { randomUUID } from 'crypto';
import { createSessionToken, setSessionTokenCookie } from '$lib/server/auth/session';
import { eq } from 'drizzle-orm';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('google_oauth_state') ?? null;
	const codeVerifier = event.cookies.get('google_code_verifier') ?? null;
	if (code === null || state === null || storedState === null || codeVerifier === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
	} catch (e) {
		// Invalid code or client credentials
		return new Response(null, {
			status: 400
		});
	}
	const claims = decodeIdToken(tokens.idToken()) as any;
	const googleUserId = claims.sub;
	const username = claims.name;

	const db = getDb(event.platform);
	let user = await db.query.user.findFirst({ where: eq(schema.user.googleId, googleUserId) });

	if (!user) {
		user = (
			await db
				.insert(schema.user)
				.values({ uuid: randomUUID(), googleId: googleUserId, username })
				.returning()
		)[0];
	}

	const expiresIn = 30 * 24 * 60 * 60; // 30 days in seconds
	const token = createSessionToken(user as schema.User, expiresIn);
	setSessionTokenCookie(event, token, new Date(Date.now() + expiresIn * 1000));

	return new Response(null, {
		status: 302,
		headers: {
			Location: '/'
		}
	});
}
