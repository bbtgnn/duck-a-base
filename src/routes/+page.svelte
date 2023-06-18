<script lang="ts">
	import EditDuck from '$lib/partials/editDuck.svelte';
	import { DBManager } from '$lib/types';
	import { Button } from 'flowbite-svelte';

	let dbManager = new DBManager();

	function addDuck() {
		dbManager.createDuck();
		dbManager = dbManager;
	}

	if (Object.values(dbManager.db.ducks).length === 0) addDuck();

	dbManager.createAttribute({ name: 'name' });
	dbManager.createAttribute({ name: 'age' });
</script>

<div class="flex gap-4 items-stretch h-screen overflow-hidden">
	<div class="grow p-4 space-y-4 flex flex-col overflow-y-auto">
		{#each Object.entries(dbManager.db.ducks) as [duckId, duck] (duckId)}
			<div class="shrink-0">
				<EditDuck {dbManager} bind:duck={dbManager.db.ducks[duckId]} {duckId} />
			</div>
		{/each}
		<Button on:click={addDuck} color="alternative">+ Add duck</Button>
	</div>
	<div class="p-4 bg-gray-100 shrink-0 overflow-y-auto">
		<pre>{JSON.stringify(dbManager, null, 2)}</pre>
	</div>
</div>
