<script lang="ts">
	import CreateDuck from '$lib/partials/createDuck.svelte';
	import { DBManager } from '$lib/types';

	let dbManager = new DBManager();
</script>

<div class="flex gap-4 items-stretch h-screen overflow-hidden">
	<div class="grow p-4">
		<CreateDuck bind:dbManager />
	</div>
	<div class="p-4 bg-gray-100 shrink-0 overflow-scroll">
		<pre>{JSON.stringify(dbManager, null, 2)}</pre>
	</div>
</div>
