<script lang="ts">
	import type { DBManager, Duck } from '$lib/types';
	import EditProperty from './editProperty.svelte';

	export let dbManager: DBManager;
	export let props: Duck['props'];
</script>

{#each Object.keys(props) as propertyId (propertyId)}
	<EditProperty {dbManager} bind:property={props[propertyId]} {propertyId} />
{/each}
