<script lang="ts">
	import { db } from '$lib/stores';
	import { Button, Heading } from 'flowbite-svelte';
	import { TypeKind, type CompositeDataType } from '$lib/types';
	import { nanoid } from 'nanoid';

	let newType: CompositeDataType | null = null;

	function createEmptyType() {
		newType = {
			kind: TypeKind.COMPOSITE,
			name: '',
			attributes: []
		};
	}

	function undoCreateType() {
		newType = null;
	}

	function saveNewType() {
		if (newType) {
			$db.types[nanoid()] = newType;
			newType = null;
		}
	}
</script>

<div class="flex divide-x divide-gray-100">
	<div class="p-4 space-y-4">
		<div class="flex justify-between">
			<Heading tag="h4">Types</Heading>
			<Button on:click={createEmptyType}>+</Button>
		</div>
		<div class="space-y-4">
			{#each Object.entries($db.types) as [id, type]}
				<div>
					<p class="font-bold">{type.name}</p>
					<table class="border border-gray-100">
						<tr>
							<td class="p-2 text-gray-400">Kind</td>
							<td class="p-2">{type.kind}</td>
						</tr>
						<tr>
							<td class="p-2 text-gray-400">ID</td>
							<td class="p-2">{id}</td>
						</tr>
					</table>
				</div>
			{/each}
		</div>
	</div>

	<div class="p-4 space-y-4">
		<Heading tag="h4">Create type</Heading>
	</div>
</div>
