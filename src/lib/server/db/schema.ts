import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey(),
	uuid: text('uuid').unique(),
	googleId: text('google_id').unique(),
	username: text('username')
});

export const board = sqliteTable('board', {
	id: integer('id').primaryKey(),
	uuid: text('uuid').unique(),
	name: text('name'),
	ownerId: integer('owner_id').references(() => user.id),
	state: text('state').notNull()
});

export type User = typeof user.$inferSelect;

export type Board = typeof board.$inferSelect;
