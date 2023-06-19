import { nanoid } from 'nanoid';

//

export type ID = string;
export type Table<Entity, CustomID extends ID = ID> = Record<CustomID, Entity>;
export type Entry<Entity, CustomID extends ID = ID> = [CustomID, Entity];

//

export type DB = {
	attributes: Table<Attribute>;
	ducks: Table<Duck>;
};

//

export type Attribute = {
	name: string;
};

//

export type Duck = {
	properties: Table<Property>;
};

export type Property = {
	attributeId: ID;
	values: Table<Value>;
};

export type Value = {
	kind: ValueKind;
	data: unknown;
};

export enum ValueKind {
	PRIMITIVE = 'primitive',
	COMPOSITE = 'composite'
}

//

export class DBManager {
	db: DB;

	constructor() {
		this.db = {
			attributes: {},
			ducks: {}
		};
	}

	duckExists(id: ID): boolean {
		return id in this.db.ducks;
	}

	createDuck(): Entry<Duck> {
		const duck: Duck = {
			properties: {}
		};
		const id = nanoid();
		this.db.ducks[id] = duck;
		return [id, duck];
	}

	createAttribute(name = ''): Entry<Attribute> {
		const attribute: Attribute = {
			name
		};
		const id = nanoid();
		this.db.attributes[id] = attribute;
		return [id, attribute];
	}

	createDefaultProperty(): Property {
		return {
			attributeId: '',
			values: {}
		};
	}

	duckHasProps(duck: Duck): boolean {
		return Object.keys(duck.properties).length > 0;
	}

	duckAddEmptyProp(id: ID): void {
		this.db.ducks[id].properties[nanoid()] = this.createDefaultProperty();
	}

	duckPropertyAddEmptyValue(): Value {
		return {
			data: null,
			kind: ValueKind.PRIMITIVE
		};
	}

	duckPropertyAddValue(duckId: ID, propertyID: ID): void {
		this.db.ducks[duckId].properties[propertyID].values[nanoid()] =
			this.duckPropertyAddEmptyValue();
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
