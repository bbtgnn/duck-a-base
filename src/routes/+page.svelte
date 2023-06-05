<script lang="ts">
	import AddAttribute from '$lib/partials/addAttribute.svelte';
	import { DB } from '$lib/types';

	const db = new DB();
	db.addAttribute('titolo');
	db.addAttribute('luogo');
	db.addAttribute('autore');
	db.addAttribute('anno');
</script>

<AddAttribute {db} />
