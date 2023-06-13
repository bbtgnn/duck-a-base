<script lang="ts">
	import { ValueKind, DBManager, type Duck } from '$lib/types';
	import { Input, Label, Select, Button } from 'flowbite-svelte';
	import type { SelectOptionType } from 'flowbite-svelte/dist/types';

	export let dbManager: DBManager;
	export let props: Duck['props'];

	export let name = '';
	export let kind: ValueKind = ValueKind.PRIMITIVE;

	const selectOptions: SelectOptionType[] = Object.values(ValueKind).map((kind) => ({
		value: kind,
		name: kind
	}));

	function handleClick() {
		if (!Boolean(name) && !Boolean(kind)) return;
		const [attributeId, attribute] = dbManager.createAttribute({ name });
		if (kind == ValueKind.COMPOSITE) {
			const [duckId, duck] = dbManager.createDuck();
			props[attributeId] = { kind, duckId };
		} else {
			props[attributeId] = { kind, value: '' };
		}
		name = '';
		kind = ValueKind.PRIMITIVE;
	}
</script>

<div class="flex gap-4 items-stretch">
	<div class="basis-3/4">
		<Input bind:value={name} placeholder={'Attribute name'} />
	</div>
	<div class="basis-1/4">
		<Select items={selectOptions} bind:value={kind} />
	</div>
	<div class="flex flex-col shrink-0">
		<Button on:click={handleClick}>+ Add</Button>
	</div>
</div>
