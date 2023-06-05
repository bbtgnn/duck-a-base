<script lang="ts">
	import TypesList from '$lib/partials/typesList.svelte';
</script>

<TypesList
	on:selectedType={(e) => {
		console.log(e.detail);
	}}
/>
