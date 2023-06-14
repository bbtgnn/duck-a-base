import { nanoid } from 'nanoid';

//

export type ID = string;
export type Table<Entity, ID extends string = string> = Record<ID, Entity>;
export type Entry<Entity, ID extends string = string> = [ID, Entity];

//

export interface PropTemplate<T extends PropKind> {
	attributeId: ID;
	kind: T;
}

export enum PropKind {
	PRIMITIVE = 'primitive',
	COMPOSITE = 'composite'
}

export interface CompositeProp extends PropTemplate<PropKind.COMPOSITE> {
	duckId: ID;
}

export function createDefaultCompositeProp(attributeId = '', duckId = ''): CompositeProp {
	return {
		attributeId,
		kind: PropKind.COMPOSITE,
		duckId
	};
}

export interface PrimitiveProp<T = unknown> extends PropTemplate<PropKind.PRIMITIVE> {
	value: T;
}

export function createDefaultPrimitiveProp(attributeId = '', value = null): PrimitiveProp {
	return {
		attributeId,
		kind: PropKind.PRIMITIVE,
		value
	};
}

export type Prop = PrimitiveProp | CompositeProp;

export type Duck = {
	props: Table<Prop>;
};

export type Attribute = {
	name: string;
};

//

export enum DBEntity {
	ATTRIBUTES = 'attributes',
	DUCKS = 'ducks'
}

export type DB = {
	[DBEntity.ATTRIBUTES]: Table<Attribute>;
	[DBEntity.DUCKS]: Table<Duck>;
};

// export function createDB(): DB {
// 	return
// }

//

export class DBManager {
	db: DB;

	constructor() {
		this.db = {
			[DBEntity.ATTRIBUTES]: {},
			[DBEntity.DUCKS]: {}
		};
	}

	duckExists(id: ID): boolean {
		return id in this.db[DBEntity.DUCKS];
	}

	createDuck(): Entry<Duck> {
		const duck: Duck = {
			props: {}
		};
		const id = nanoid();
		this.db[DBEntity.DUCKS][id] = duck;
		return [id, duck];
	}

	createAttribute(props: Partial<Attribute> = {}): Entry<Attribute> {
		const attribute: Attribute = {
			name: '',
			...props
		};
		const id = nanoid();
		this.db[DBEntity.ATTRIBUTES][id] = attribute;
		return [id, attribute];
	}

	duckHasProps(duck: Duck): boolean {
		return Object.keys(duck.props).length > 0;
	}

	duckAddEmptyProp(id: ID): void {
		this.db[DBEntity.DUCKS][id].props[nanoid()] = createDefaultPrimitiveProp();
	}

	// addDuck(): Entry<Duck> {
	// 	const id = nanoid();
	// 	const duck = createDuck();
	// 	return [id, duck];
	// }

	// addAttribute(name = ''): Entry<Attribute> {
	// 	const id = nanoid();
	// 	const attribute = createAttribute(name);
	// 	this.attributes[id] = attribute;
	// 	return [id, attribute];
	// }
	// isAttributeUnique(name: string): boolean {
	// 	return Object.values(this.attributes).every(
	// 		(attribute) => attribute.name.toLowerCase() !== name.trim().toLowerCase()
	// 	);
	// }

	// searchAttributes(text: string): Array<Entry<Attribute>> {
	// 	return Object.entries(this.attributes).filter(([attributeID, attribute]) =>
	// 		attribute.name.includes(text.trim())
	// 	);
	// }
}

//

// export function isComposite(type: DataType): type is CompositeDataType {
// 	return type.kind === TypeKind.COMPOSITE;
// }

// export function isPrimitive(type: DataType): type is PrimitiveDataType {
// 	return type.kind === TypeKind.PRIMITIVE;
// }

// export function isEntryComposite(entry: [ID, DataType]): entry is [ID, CompositeDataType] {
// 	return isComposite(entry[1]);
// }

// export function isEntryPrimitive(entry: [ID, DataType]): entry is [ID, PrimitiveDataType] {
// 	return isPrimitive(entry[1]);
// }

//

// export const defaultDataType: DataType = {
// 	name: '',
// 	kind: TypeKind.COMPOSITE,
// 	attributes: []
// };

// export const defaultAttribute: Attribute = {
// 	name: '',
// 	typeId: ''
// };

// export const defaultDuck: Duck = {
// 	attributes: {}
// };

// //

// export enum TypeKind {
// 	PRIMITIVE = 'primitive',
// 	COMPOSITE = 'composite'
// }

// export interface BaseDataType<TypeKind> {
// 	name: string;
// 	kind: TypeKind;
// }

// export interface PrimitiveDataType extends BaseDataType<TypeKind.PRIMITIVE> {
// 	constructor: new (...args: unknown[]) => unknown;
// }

// export interface CompositeDataType extends BaseDataType<TypeKind.COMPOSITE> {
// 	attributes: Array<ID>;
// }

// export type DataType = PrimitiveDataType | CompositeDataType;

// export type DataType = unknown | Table<Duck>;

// export type Attribute = {
// 	name: string;
// 	typeId: string;
// };

// export type Duck = {
// 	attributes: Table<unknown>;
// };
