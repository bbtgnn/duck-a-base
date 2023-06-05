<script lang="ts">
	import type { DB, Attribute, Entry } from '$lib/types';
	import { Input, DropdownItem, Hr } from 'flowbite-svelte';

	export let db: DB;
	export let text = '';

	$: options = db.searchAttributes(text);
</script>

<Input bind:value={text} />
{#each options as [id, attr] (id)}
	<DropdownItem>{attr.name}</DropdownItem>
{/each}
<Hr />
<DropdownItem>+ Add "{text}"</DropdownItem>
