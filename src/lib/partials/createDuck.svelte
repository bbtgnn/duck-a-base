<script lang="ts">
	import type { DBManager } from '$lib/types';
	import { Label } from 'flowbite-svelte';
	import AddProperty from './addProperty.svelte';
	import EditProperties from './editProperties.svelte';

	export let dbManager: DBManager;
	export let duckId = '';

	if (duckId == '' || !dbManager.duckExists(duckId)) {
		const [id, duck] = dbManager.createDuck();
		duckId = id;
	}
</script>

<div class="border border-gray-300 rounded-lg overflow-hidden">
	<Label />
	<div class="p-4">
		<EditProperties {dbManager} bind:props={dbManager.db.ducks[duckId].props} />
	</div>
	<div class="p-4 border-t border-t-gray-300 bg-gray-100">
		<AddProperty {dbManager} bind:props={dbManager.db.ducks[duckId].props} />
	</div>
</div>
