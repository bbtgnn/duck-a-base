<script lang="ts">
	import { Button, Heading, Hr, Input, Label } from 'flowbite-svelte';
	import { nanoid } from 'nanoid';

	// Types IDs
	const booleanId = nanoid();
	const dateId = nanoid();
	const numberId = nanoid();
	const stringId = nanoid();

	// Attributes IDs
	const nameId = nanoid();
	const activeId = nanoid();
	const freeId = nanoid();

	// Objects IDs
	const courseId = nanoid();

	//

	type ID = string;
	type Table<T> = Record<ID, T>;

	type Instantiable = { new (...args: any[]): any };

	type Attribute = {
		name: string;
		typeId: string;
	};

	type Object = {
		attributes: Table<any>;
	};

	type DB = {
		attributes: Table<Attribute>;
		types: Table<Instantiable>;
		objects: Table<Object>;
	};

	//

	const db: DB = {
		types: {
			[booleanId]: Boolean,
			[dateId]: Date,
			[numberId]: Number,
			[stringId]: String
		},
		attributes: {
			[nameId]: {
				name: 'name',
				typeId: stringId
			},
			[activeId]: {
				name: 'active',
				typeId: booleanId
			},
			[freeId]: {
				name: 'free',
				typeId: booleanId
			}
		},
		objects: {
			[courseId]: {
				attributes: {
					[nameId]: 'Course test',
					[activeId]: true,
					[freeId]: false
				}
			}
		}
	};

	let newObject: Object | null = null;

	function createEmptyObject() {
		newObject = {
			attributes: {}
		};
	}

	function undoCreateObject() {
		newObject = null;
	}

	function saveObject() {
		if (newObject) {
			db.objects[nanoid()] = newObject;
			newObject = null;
		}
	}

	function addAttrToNewObject(attrId: ID) {
		if (newObject) {
			newObject.attributes[attrId] = '';
		}
	}
</script>

<div class="flex items-stretch h-screen w-screen">
	<div class="bg-gray-100 border-r border-r-gray-300 p-4 shrink-0 space-y-4">
		{#if newObject}
			<p>New Object:</p>
			<pre>{JSON.stringify(newObject, null, 2)}</pre>
			<Hr />
		{/if}
		<pre>{JSON.stringify(db, null, 2)}</pre>
	</div>

	<div class="grow flex flex-col items-stretch p-4 space-y-4">
		<div>
			{#if !newObject}
				<Button on:click={createEmptyObject}>Create object</Button>
			{:else}
				<div class="flex justify-end space-x-4">
					<Button on:click={undoCreateObject} color="alternative">Undo</Button>
					<Button on:click={saveObject}>Save object</Button>
				</div>
			{/if}
		</div>
		<Hr />
		{#if newObject}
			<div class="space-y-4 flex flex-col">
				<Heading tag="h4">Attributes</Heading>
				{#each Object.entries(newObject.attributes) as [id, attr] (id)}
					<Label>
						<span>{db.attributes[id].name}</span>
						<Input bind:value={newObject.attributes[id]} />
					</Label>
				{/each}
				<Hr />
				<Heading tag="h4">Add attributes</Heading>
				{#each Object.entries(db.attributes) as [id, attr] (id)}
					{#if !(id in newObject.attributes)}
						<Button
							color="alternative"
							on:click={() => {
								addAttrToNewObject(id);
							}}
						>
							+ Add "{attr.name}"
						</Button>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</div>
