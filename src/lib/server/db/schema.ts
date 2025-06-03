import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey(),
	uuid: text('uuid').unique(),
	googleId: text('google_id').unique(),
	username: text('username')
});

export type User = typeof user.$inferSelect;
