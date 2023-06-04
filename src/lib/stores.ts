import { DB } from './classes/db';
import { persisted } from 'svelte-local-storage-store';

export const db = persisted<DB>('db', new DB());
