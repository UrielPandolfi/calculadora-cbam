import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const leads=sqliteTable('conversion_leads',{
 id:text('id').primaryKey(),name:text('name').notNull(),email:text('email').notNull(),agency:text('agency').notNull(),city:text('city').notNull(),brand:text('brand').notNull(),phone:text('phone'),preference:text('preference').notNull(),preferredDate:text('preferred_date'),preferredTime:text('preferred_time'),answers:text('answers').notNull(),result:text('result').notNull(),consentVersion:text('consent_version').notNull(),emailStatus:text('email_status').notNull().default('pending'),createdAt:integer('created_at').notNull()
});
