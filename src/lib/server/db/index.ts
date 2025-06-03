import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export const getDb = (platform?: App.Platform) => {
	if (!platform || !platform.env?.DB) {
		throw new Error('Database connection is not available');
	}
	return drizzle(platform.env.DB, { schema });
};
