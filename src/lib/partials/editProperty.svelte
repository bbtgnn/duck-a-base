<script lang="ts">
	import { ValueKind, DBManager, type Property, type ID } from '$lib/types';
	import { Button, Input, Label, Select } from 'flowbite-svelte';
	import EditDuck from './editDuck.svelte';
	import type { SelectOptionType } from 'flowbite-svelte/dist/types';
	// @ts-ignore
	import Svelecte from 'svelecte';

	//

	export let dbManager: DBManager;
	export let duckId: ID;
	export let propertyId: ID;
	export let property: Property;

	//

	$: attributeOptions = Object.entries(dbManager.db.attributes).map(([attributeId, attribute]) => ({
		id: attributeId,
		name: attribute.name
	}));

	function createTransform(
		inputValue: string,
		creatablePrefix: string,
		valueField: string,
		labelField: string
	) {
		const [attributeId, attribute] = dbManager.createAttribute(inputValue);
		return {
			[valueField]: attributeId,
			[labelField]: attribute.name
		};
	}

	function handleAddValue() {
		dbManager.duckPropertyAddValue(duckId, propertyId);
		dbManager = dbManager;
		property = property;
	}

	// function handleClick() {
	// 	if (!Boolean(name) && !Boolean(kind)) return;
	// 	const [attributeId, attribute] = dbManager.createAttribute({ name });
	// 	if (kind == ValueKind.COMPOSITE) {
	// 		const [duckId, duck] = dbManager.createDuck();
	// 		props[attributeId] = { kind, duckId };
	// 	} else {
	// 		props[attributeId] = { kind, value: '' };
	// 	}
	// 	name = '';
	// 	kind = ValueKind.PRIMITIVE;
	// }

	// $: attributeName = dbManager.db.attributes[prop.attributeId].name;
</script>

<div class="space-y-4">
	<div class="w-1/2">
		<Svelecte
			options={attributeOptions}
			bind:value={property.attributeId}
			valueField="id"
			labelField="name"
			creatable
			creatablePrefix=""
			{createTransform}
		/>
	</div>
	<div class="flex flex-col border-l-[10px] border-l-gray-300 pl-4 space-y-4">
		{#each Object.entries(property.values) as [valueId, value] (valueId)}
			<div class="flex gap-4">
				<div class="basis-1/2">
					<Select items={selectOptions} bind:value={property.values[valueId].kind} />
				</div>
				{#if property.values[valueId].kind == ValueKind.PRIMITIVE}
					<div class="basis-1/2">
						<Input bind:value={property.values[valueId].data} />
					</div>
				{/if}
			</div>
			<pre>{JSON.stringify(value)}</pre>
			{#if property.values[valueId].kind == ValueKind.COMPOSITE}
				<div class="border-l-[10px] border-l-gray-300 pl-4 space-y-4">
					<EditDuck
						{dbManager}
						duckId={property.values[valueId].data}
						duck={dbManager.db.ducks[prop.duckId]}
					/>
				</div>
			{/if}
		{/each}
		<Button on:click={handleAddValue} color="alternative">+ Add value</Button>
	</div>
</div>
