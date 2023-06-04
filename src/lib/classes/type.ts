export class Constructor<T> {
	public readonly name: string;

	constructor(public readonly Construct: new () => T, name: string) {
		this.name = name;
	}
}
