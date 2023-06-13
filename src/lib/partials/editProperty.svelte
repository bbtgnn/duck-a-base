<script lang="ts">
	import { ValueKind, type Value, DBManager } from '$lib/types';
	import { Input, Label } from 'flowbite-svelte';
	import EditDuck from './editDuck.svelte';

	export let dbManager: DBManager;
	export let property: Value;
	export let propertyId: string;

	const propertyName = dbManager.db.attributes[propertyId].name;
</script>

<div>
	<Label>{propertyName}</Label>
	{#if property.kind == ValueKind.PRIMITIVE}
		<Input bind:value={property.value} />
	{:else if property.kind == ValueKind.COMPOSITE}
		<div class="pl-8">
			<EditDuck {dbManager} id={property.duckId} duck={dbManager.db.ducks[property.duckId]} />
		</div>
	{/if}
</div>
