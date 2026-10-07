import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const requests=sqliteTable('service_requests',{id:text('id').primaryKey(),name:text('name').notNull(),phone:text('phone').notNull(),email:text('email').notNull(),service:text('service').notNull(),property:text('property').notNull(),city:text('city').notNull(),details:text('details').notNull(),createdAt:integer('created_at').notNull()});
export const requestLimits=sqliteTable('request_limits',{id:text('id').primaryKey(),count:integer('count').notNull(),expiresAt:integer('expires_at').notNull()});
