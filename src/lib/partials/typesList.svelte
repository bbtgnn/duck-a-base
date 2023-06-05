<script lang="ts">
	import { db } from '$lib/stores';
	import {
		TypeKind,
		isComposite,
		isEntryComposite,
		isEntryPrimitive,
		type DataType,
		type Entry
	} from '$lib/types';
	import { Heading, Label, Listgroup, ListgroupItem } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';

	$: primitiveTypes = Object.entries($db.types).filter(isEntryPrimitive);
	$: compositeTypes = Object.entries($db.types).filter(isEntryComposite);

	const dispatch = createEventDispatcher<{ selectedType: Entry<DataType> }>();
	function handleTypeClick(entry: Entry<DataType>) {
		dispatch('selectedType', entry);
	}
</script>

<div class="space-y-6">
	<Label class="space-y-2">
		<span>PRIMITIVE TYPES</span>
		<Listgroup active>
			{#each primitiveTypes as [id, type]}
				<ListgroupItem
					on:click={() => {
						handleTypeClick([id, type]);
					}}
				>
					{type.name}
				</ListgroupItem>
			{/each}
		</Listgroup>
	</Label>

	<Label class="space-y-2">
		<span>COMPOSITE TYPES</span>
		<Listgroup active>
			{#each compositeTypes as [id, type]}
				<ListgroupItem
					on:click={() => {
						handleTypeClick([id, type]);
					}}
				>
					{type.name}
				</ListgroupItem>
			{/each}
		</Listgroup>
	</Label>
</div>
