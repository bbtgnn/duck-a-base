import Dexie, { type Table } from 'dexie';

export interface Entity {
	name: string;
	relations: Relation<unknown>[];
}

export interface Relation<T> {
	entityId: string;
	attributeId: string;
	typeId: string;
	values: T[];
}

export interface Type {
	name: string;
}

export class Duckabase extends Dexie {
	// 'friends' is added by dexie when declaring the stores()
	// We just tell the typing system this is the case
	entities!: Table<Entity>;
	relations!: Table<Relation<unknown>>;
	types!: Table<Type>;

	constructor() {
		super('entities');
		this.version(1).stores({
			entities: '++id, name', // Primary key and indexed props
			relations: '++id, entityId, attributeId, typeId',
			types: '++id, name'
		});
	}
}

export const db = new Duckabase();
