import type { Attribute } from './attribute';

export class Entity {
	properties: { attribute: Attribute; value: unknown }[];

	constructor() {
		this.properties = [];
	}
}
