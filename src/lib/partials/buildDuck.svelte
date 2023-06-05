<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import {
		DBEntity,
		type Attribute,
		type DataType,
		type Duck,
		defaultDataType,
		defaultAttribute,
		defaultDuck,
		isComposite,
		DB,
		TypeKind
	} from '$lib/types';
	import { Button, Dropdown, DropdownItem, Hr, Input, Label } from 'flowbite-svelte';

	let db = new DB();
	const [nameID, name] = db.addAttribute('titolo');
	const [luogoID, luogo] = db.addAttribute('luogo');

	//

	type InputData = { id: string; name: string; value: string };
	type CurrentInputData = Record<DBEntity, InputData>;

	const defaultInputData: InputData = { id: '', name: '', value: '' };
	let currentEntity: DBEntity = DBEntity.DATATYPE;
	let currentData: CurrentInputData = {
		[DBEntity.DATATYPE]: { ...defaultInputData },
		[DBEntity.ATTRIBUTE]: { ...defaultInputData },
		[DBEntity.DUCK]: { ...defaultInputData }
	};

	//

	function updateDBView() {
		db = db;
		currentData = currentData;
	}

	function handleEnter(event: KeyboardEvent, cb: () => void) {
		if (event.code == 'Enter') {
			console.log('currentEntity', currentEntity);
			console.log('currentInput', currentData);
			cb();
			console.log('-----------');
		}
	}

	function createEmptyDuck() {
		const [id, duck] = db.addDuck();
		currentData.ducks = {
			id,
			value: '',
			name: ''
		};
		updateDBView();
	}

	function selectAttribute(attributeID: string) {
		currentData.attributes = {
			id: attributeID,
			name: db.attributes[attributeID].name,
			value: ''
		};
	}

	function addAttribute() {
		const name = currentData.attributes.name;
		if (!name) return;
		const [id, attribute] = db.addAttribute(name);
		currentData.attributes = {
			id,
			name,
			value: ''
		};
		updateDBView();
	}

	function saveAttribute() {
		const duckID = currentData.ducks.id;
		const attrID = currentData.attributes.id;
		if (duckID) {
			console.log('duckID', duckID);
			db.ducks[duckID].attributes[attrID] = currentData.attributes.value;
		}

		currentData.attributes = { ...defaultInputData };
		updateDBView();
	}

	function handleAttributeEnter(event: KeyboardEvent) {
		handleEnter(event, () => {
			saveAttribute();
		});
	}
</script>

<div class="p-4 space-y-6 bg-gray-400">
	<div class="space-y-4">
		{#each Object.entries(db.ducks) as [duckID, duck] (duckID)}
			<Card className="space-y-4">
				<Label>ATTRIBUTES</Label>
				<table>
					{#each Object.entries(db.ducks[duckID].attributes) as [attrID, attr] (attrID)}
						<tr>
							<td>{db.attributes[attrID].name}</td>
							<td>
								<Input id={attrID} bind:value={db.ducks[duckID].attributes[attrID]} />
							</td>
							<td>
								<Button
							</td>
						</tr>
					{/each}
				</table>
				<div class="flex gap-2">
					<div class="basis-1/3">
						<Input bind:value={currentData.attributes.name} />
						<Dropdown>
							{#each db.findAttribute(currentData.attributes.name) as [attrID, attr] (attrID)}
								<DropdownItem
									on:click={() => {
										selectAttribute(attrID);
									}}>{attr.name}</DropdownItem
								>
							{/each}
							<DropdownItem on:click={addAttribute}>+ New attribute</DropdownItem>
						</Dropdown>
					</div>
					<div class="basis-2/3">
						<Input bind:value={currentData.attributes.value} />
					</div>
					<Button on:click={saveAttribute}>+</Button>
				</div>
			</Card>
			<!-- <div class="p-4 border border-gray-100 bg-white rounded-lg space-y-4">
				<div class="space-y-2">
					<Label>TYPE</Label>
					<Input
						placeholder={`+ ${DBEntity.DATATYPE}`}
						bind:value={db.dataTypes[dataTypeID].name}
					/>
				</div>
				<div class="space-y-2">
					<Label class="mb-2">ATTRIBUTES</Label>
					<Input
						placeholder={`+ Attribute`}
						bind:value={currentData.attributes.value}
						on:keypress={handleAttributeEnter}
					/>
					{#each db.dataTypes[dataTypeID].attributes as attribute, attributeIndex}
						<Input
							placeholder={`/ ${DBEntity.ATTRIBUTE}`}
							bind:value={db.dataTypes[dataTypeID].attributes[attributeIndex]}
						/>
					{/each}
				</div>
			</div> -->
		{/each}
	</div>
	<div class="flex justify-end">
		<Button color="alternative" on:click={createEmptyDuck}>+🦆 Add Duck</Button>
	</div>
</div>

<p>Current Entity: <span>{currentEntity}</span></p>
<pre>{JSON.stringify(currentData, null, 2)}</pre>
<pre>{JSON.stringify(db, null, 2)}</pre>
