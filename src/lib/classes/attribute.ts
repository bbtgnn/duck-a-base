import type { Type } from './type';

export class Attribute {
	type: Type;
	name: string;

	constructor(name: string, type: Type) {
		this.type = type;
		this.name = name;
	}
}
