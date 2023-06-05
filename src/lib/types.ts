import { nanoid } from 'nanoid';

export type ID = string;
export type Table<T> = Record<ID, T>;
export type Entry<T> = [ID, T];

export enum TypeKind {
	PRIMITIVE = 'primitive',
	COMPOSITE = 'composite'
}

export interface BaseDataType<TypeKind> {
	name: string;
	kind: TypeKind;
}

export interface PrimitiveDataType extends BaseDataType<TypeKind.PRIMITIVE> {
	constructor: new (...args: unknown[]) => unknown;
}

export interface CompositeDataType extends BaseDataType<TypeKind.COMPOSITE> {
	attributes: Array<ID>;
}

export type DataType = PrimitiveDataType | CompositeDataType;

export type Attribute = {
	name: string;
	typeId: string;
};

export type Duck = {
	attributes: Table<unknown>;
};

export class DB {
	attributes: Table<Attribute>;
	dataTypes: Table<PrimitiveDataType | CompositeDataType>;
	ducks: Table<Duck>;

	constructor() {
		this.attributes = {};
		this.dataTypes = {};
		this.ducks = {};
	}

	isAttributeUnique(name: string): boolean {
		return Object.values(this.attributes).every(
			(attribute) => attribute.name.toLowerCase() !== name.trim().toLowerCase()
		);
	}

	searchAttributes(text: string): Array<Entry<Attribute>> {
		return Object.entries(this.attributes).filter(([attributeID, attribute]) =>
			attribute.name.includes(text.trim())
		);
	}

	addDuck(): Entry<Duck> {
		const id = nanoid();
		const duck: Duck = {
			attributes: {}
		};
		this.ducks[id] = duck;
		return [id, duck];
	}

	addDataType(name = ''): Entry<DataType> {
		const id = nanoid();
		const type: DataType = {
			name,
			kind: TypeKind.COMPOSITE,
			attributes: []
		};
		this.dataTypes[id] = type;
		return [id, type];
	}

	addAttribute(name = ''): Entry<Attribute> {
		const id = nanoid();
		const attribute: Attribute = {
			name,
			typeId: ''
		};
		this.attributes[id] = attribute;
		return [id, attribute];
	}
}

export enum DBEntity {
	ATTRIBUTE = 'attributes',
	DATATYPE = 'dataTypes',
	DUCK = 'ducks'
}

//

export function isComposite(type: DataType): type is CompositeDataType {
	return type.kind === TypeKind.COMPOSITE;
}

export function isPrimitive(type: DataType): type is PrimitiveDataType {
	return type.kind === TypeKind.PRIMITIVE;
}

export function isEntryComposite(entry: [ID, DataType]): entry is [ID, CompositeDataType] {
	return isComposite(entry[1]);
}

export function isEntryPrimitive(entry: [ID, DataType]): entry is [ID, PrimitiveDataType] {
	return isPrimitive(entry[1]);
}

//

export const defaultDataType: DataType = {
	name: '',
	kind: TypeKind.COMPOSITE,
	attributes: []
};

export const defaultAttribute: Attribute = {
	name: '',
	typeId: ''
};

export const defaultDuck: Duck = {
	attributes: {}
};
