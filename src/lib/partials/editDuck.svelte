<script lang="ts">
	import type { DBManager, Duck, ID } from '$lib/types';
	import { Button } from 'flowbite-svelte';
	import EditProperty from './editProperty.svelte';

	export let dbManager: DBManager;
	export let duck: Duck;
	export let duckId: ID;

	function addProp() {
		dbManager.duckAddEmptyProp(duckId);
		dbManager = dbManager;
	}

	if (Object.keys(duck.properties).length === 0) addProp();
</script>

<div
	class="bg-gray-50 border border-gray-300 rounded-lg overflow-hidden flex flex-col divide-y divide-gray-300"
>
	<div class="px-4 py-2">
		<p class="font-mono">ID: {duckId}</p>
	</div>
	<div class="px-4 py-8 space-y-8 flex flex-col">
		{#each Object.entries(duck.properties) as [propertyId, property]}
			<EditProperty {dbManager} {duckId} {propertyId} bind:property={duck.properties[propertyId]} />
		{/each}
		<Button on:click={addProp} color="alternative">+ Add prop</Button>
	</div>
</div>
