import { nanoid } from 'nanoid';

//

export type ID = string;
export type Table<Entity, ID extends string = string> = Record<ID, Entity>;
export type Entry<Entity, ID extends string = string> = [ID, Entity];

//

export interface HasKind<T extends ValueKind> {
	kind: T;
}

export enum ValueKind {
	PRIMITIVE = 'primitive',
	COMPOSITE = 'composite'
}

export interface CompositeValue extends HasKind<ValueKind.COMPOSITE> {
	duckId: ID;
}

export function createDefaultCompositeValue(duckId = ''): CompositeValue {
	return {
		kind: ValueKind.COMPOSITE,
		duckId
	};
}

export interface PrimitiveValue<T = unknown> extends HasKind<ValueKind.PRIMITIVE> {
	value: T;
}

export function createDefaultPrimitiveValue<T = unknown>(value: T): PrimitiveValue<T> {
	return {
		kind: ValueKind.PRIMITIVE,
		value
	};
}

export type Value = PrimitiveValue | CompositeValue;

export type Duck = {
	props: Table<Value>;
};

// export function createDuck(properties: Duck['properties'] = {}): Duck {
// 	return {
// 		properties
// 	};
// }

export type Attribute = {
	name: string;
};

// export function createAttribute(props: Partial<Attribute> = {}): Attribute {
// 	const { name = '' } = props;
// 	return {
// 		name
// 	};
// }

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

	createDuck(props: Partial<Duck> = {}): Entry<Duck> {
		const duck: Duck = {
			props: {},
			...props
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
