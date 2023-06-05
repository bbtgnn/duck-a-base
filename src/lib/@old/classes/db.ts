import { Entity } from './entity';
import { Type } from './type';
import { Attribute } from './attribute';
import { nanoid } from 'nanoid';

export class DB {
	entities: Record<string, Entity>;
	types: Record<string, Type>;
	attributes: Record<string, Attribute>;

	constructor() {
		this.entities = {};
		this.types = {};
		this.attributes = {};
	}

	createEntity() {
		return new Entity();
	}

	saveEntity(entity: Entity) {
		this.entities[nanoid()] = entity;
		return entity;
	}

	createAttribute(name: string, type: Type) {
		return new Attribute(name, type);
	}

	saveAttribute(attribute: Attribute) {
		this.attributes[nanoid()] = attribute;
		return attribute;
	}

	createType(name: string) {
		return new Type(name);
	}

	saveType(type: Type) {
		this.types[nanoid()] = type;
		return type;
	}
}
