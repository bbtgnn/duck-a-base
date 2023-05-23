import Dexie, { type Table } from 'dexie';

export interface Entity {
	name: string;
	value: string | null;
	links: Entity[];
}

export interface Link<T> {
	idA: string;
	idB: string;
	values: T[];
	type: string;
}

export class Duckabase extends Dexie {
	// 'friends' is added by dexie when declaring the stores()
	// We just tell the typing system this is the case
	entities!: Table<Entity>;

	constructor() {
		super('entities');
		this.version(1).stores({
			entities: '++id, name' // Primary key and indexed props
		});
	}
}

export const db = new Duckabase();
