<script lang="ts">
	import { PropKind, DBManager, type Prop } from '$lib/types';
	import { Input, Label, Select } from 'flowbite-svelte';
	import EditDuck from './editDuck.svelte';
	import type { SelectOptionType } from 'flowbite-svelte/dist/types';
	// @ts-ignore
	import Svelecte from 'svelecte';

	export let dbManager: DBManager;
	export let prop: Prop;

	const selectOptions: SelectOptionType[] = Object.values(PropKind).map((kind) => ({
		value: kind,
		name: kind
	}));

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
		const [attributeId, attribute] = dbManager.createAttribute({ name: inputValue });
		return {
			[valueField]: attributeId,
			[labelField]: attribute.name
		};
	}

	// function handleClick() {
	// 	if (!Boolean(name) && !Boolean(kind)) return;
	// 	const [attributeId, attribute] = dbManager.createAttribute({ name });
	// 	if (kind == PropKind.COMPOSITE) {
	// 		const [duckId, duck] = dbManager.createDuck();
	// 		props[attributeId] = { kind, duckId };
	// 	} else {
	// 		props[attributeId] = { kind, value: '' };
	// 	}
	// 	name = '';
	// 	kind = PropKind.PRIMITIVE;
	// }

	// $: attributeName = dbManager.db.attributes[prop.attributeId].name;
</script>

<div class="flex gap-4">
	<div class="basis-1/3 shrink-0">
		<!-- <Svelecte
			options={attributeOptions}
			creatable
			creatablePrefix=""
			on:createoption={handleCreateOption}
		/> -->
		<Svelecte
			options={attributeOptions}
			bind:value={prop.attributeId}
			valueField="id"
			labelField="name"
			creatable
			creatablePrefix=""
			{createTransform}
		/>
	</div>
	<div class="basis-1/3 shrink-0">
		<Select items={selectOptions} bind:value={prop.kind} />
	</div>
	{#if prop.kind == PropKind.PRIMITIVE}
		<Input bind:value={prop.value} />
	{/if}
	<!-- <Label>{attributeName}</Label>
	{:else if prop.kind == PropKind.COMPOSITE}
		<div class="pl-8">
			<EditDuck {dbManager} duckId={prop.duckId} duck={dbManager.db.ducks[prop.duckId]} />
		</div>
	{/if} -->
</div>
