import * as d from 'drizzle-orm/sqlite-core'

export const discordChannel = d.sqliteTable('discord_channel', {
	id: d.text().primaryKey(),
	name: d.text(),
})

export const discordGuild = d.sqliteTable('discord_guild', {
	id: d.text().primaryKey(),
	name: d.text(),
})

export const discordUser = d.sqliteTable('discord_user', {
	id: d.text().primaryKey(),
	username: d.text(),
})

export const notification = d.sqliteTable('notification', {
	id: d.integer().primaryKey({ autoIncrement: true }),
	notifiable_id: d.text().notNull(),
	notifiable_type: d.text({ enum: ['discord_channel', 'discord_guild', 'discord_user'] }).notNull(),
	datePosted: d.integer({ mode: 'timestamp' }).notNull(),
	projectVersion: d.text().references(() => projectVersion.id),
	deliverySuccess: d.integer({ mode: 'boolean' }),
})

export const project = d.sqliteTable(
	'project',
	{
		id: d.text(),
		platform: d.text({ enum: ['CurseForge', 'FeedTheBeast', 'GitHub', 'Mod.io', 'Modrinth', 'NexusMods'] }),
		name: d.text().notNull(),
		gameId: d.text(),
		logoUrl: d.text().notNull(),
		latestVersion: d.text().references(() => projectVersion.id),
	},
	(t) => [d.primaryKey({ columns: [t.id, t.platform] })],
)

export const projectVersion = d.sqliteTable(
	'project_version',
	{
		id: d.text(),
		projectId: d.text(),
		projectPlatform: d.text(),
		datePublished: d.integer({ mode: 'timestamp' }),
	},
	(t) => [d.primaryKey({ columns: [t.id, t.projectId, t.projectPlatform] })],
)

export const setting = d.sqliteTable('setting', {
	id: d.integer().primaryKey({ autoIncrement: true }),
	settingParentId: d.text().notNull(),
	settingParentType: d.text({ enum: ['discord_channel', 'discord_guild', 'discord_user'] }).notNull(),
	notificationStyle: d.text({ enum: ['normal', 'alt', 'compact', 'custom', 'ai'] }).default('normal'),
	maximumChangelogLength: d.integer().default(4000),
	maximumTrackedProjects: d.integer().default(500),
})

export const trackedProject = d.sqliteTable(
	'tracked_project',
	{
		projectId: d.text().references(() => project.id),
		projectPlatform: d.text().references(() => project.platform),
		notificationTargetId: d.text(),
		notificationTargetType: d.text({ enum: ['discord_channel', 'discord_guild', 'discord_user'] }).notNull(),
	},
	(t) => [d.primaryKey({ columns: [t.projectId, t.projectPlatform, t.notificationTargetId] })],
)
