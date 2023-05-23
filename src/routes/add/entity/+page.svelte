<script lang="ts">
	import { nanoid } from 'nanoid';
	import { liveQuery } from 'dexie';
	import type { Entity } from '$lib/db';
	import { Button, Label, Input, P, Hr } from 'flowbite-svelte';
	import Card from '$lib/components/card.svelte';
	import { db } from '$lib/db';

	let entities = liveQuery(() => db.entities.toArray());

	let currentEntity: Entity | null = null;
	let currentAttribute: Entity | null = null;

	function createEmptyEntity(): Entity {
		return {
			id: nanoid(),
			name: '',
			value: '',
			attributes: []
		};
	}

	function createEntity() {
		currentEntity = createEmptyEntity();
	}

	async function addEntity() {
		if (!currentEntity) return;
		await db.entities.add(currentEntity); // <- here id is not needed
		currentEntity = null;
	}

	function createAttribute() {
		currentAttribute = createEmptyEntity();
	}

	function addAttribute() {
		if (!currentEntity || !currentAttribute) return;
		currentEntity.attributes = [...currentEntity.attributes, currentAttribute];
		currentAttribute = null;
	}

	function cancelEntity() {
		currentEntity = null;
	}

	function cancelAttribute() {
		currentAttribute = null;
	}
</script>

<div class="flex">
	<div class="p-4 space-y-4 grow max-w-md">
		{#if !currentEntity}
			<Button on:click={createEntity} class="w-full">Create entity</Button>
		{:else}
			<div class="flex justify-between items-center">
				<div class="flex justify-between items-center space-x-2">
					<Button on:click={cancelEntity} color="alternative" class="font-mono">←</Button>
					<P weight="bold">New entity</P>
				</div>
				<Button on:click={addEntity} color="primary">Add entity</Button>
			</div>
			<Label>
				<span>Entity name</span>
				<Input type="text" bind:value={currentEntity.name} />
			</Label>
			<Hr />
			{#if !currentAttribute}
				<Button on:click={createAttribute} color="alternative" class="w-full">
					+ Add attribute
				</Button>
			{:else}
				<Card>
					<div class="space-y-4">
						<div class="flex justify-between items-center">
							<P weight="bold">New attribute</P>
							<Button on:click={cancelAttribute} color="alternative" class="font-mono">X</Button>
						</div>
						<Label>
							<span>Attribute name</span>
							<Input type="text" bind:value={currentAttribute.name} />
						</Label>
						<Label>
							<span>Attribute value</span>
							<Input type="text" bind:value={currentAttribute.value} />
						</Label>
						<div class="flex justify-end">
							<Button on:click={addAttribute}>Add attribute</Button>
						</div>
					</div>
				</Card>
			{/if}
			{#each currentEntity.attributes as entityAttribute}
				<P>{entityAttribute.name} - {entityAttribute.value}</P>
			{/each}
		{/if}

		{#if $entities}
			<ul>
				{#each $entities as entity (entity.id)}
					<li><pre>{JSON.stringify(entity, null, 2)}</pre></li>
				{/each}
			</ul>
		{/if}
	</div>
	<div class="w-[300px] text-sm overflow-scroll bg-gray-200 p-4 shrink-0">
		<pre>{JSON.stringify(currentEntity, null, 2)}</pre>
	</div>
</div>
