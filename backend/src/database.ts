import { drizzle } from 'drizzle-orm/libsql'
export const database = drizzle('file:../database.sqlite')
