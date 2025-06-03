import type { RequestEvent } from '@sveltejs/kit';
import type { User } from '../db/schema';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

export const createSessionToken = (user: User, expiresInSeconds: number): string => {
	return jwt.sign(user, JWT_SECRET, { expiresIn: expiresInSeconds });
};

export const validateSessionToken = (token: string): User | null => {
	try {
		return jwt.verify(token, JWT_SECRET) as User;
	} catch (error) {
		return null;
	}
};

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
	event.cookies.set('session', token, {
		httpOnly: true,
		sameSite: 'lax',
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
	event.cookies.set('session', '', {
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 0,
		path: '/'
	});
}
