<script lang="ts">
	import type { DBManager, Duck } from '$lib/types';
	import AddProperty from './addProperty.svelte';
	import EditProperties from './editProperties.svelte';

	export let dbManager: DBManager;
	export let duck: Duck;
	export let id: string;
</script>

<div class="border border-gray-300 rounded-lg overflow-hidden divide-y divide-gray-300">
	<div class="p-4">
		<p class="font-mono">ID: {id}</p>
	</div>
	<div class="p-4 space-y-4">
		<EditProperties {dbManager} bind:props={duck.props} />
	</div>
	<div class="p-4 bg-gray-100">
		<AddProperty {dbManager} bind:props={duck.props} />
	</div>
</div>
