<script lang="ts">
	import { Input, Select } from "flowbite-svelte";
	import EditDuck from "./editDuck.svelte";
	import { ValueKind, type DBManager, type ID, type Value } from "$lib/types";

    export let dbManager: DBManager;
    export let value: Value;
    export let valueId: ID;
    export let duckId: ID;

    const selectOptions: SelectOptionType[] = Object.values(ValueKind).map((kind) => ({
		value: kind,
		name: kind
	}));
</script>

<div class="flex gap-4">
    <div class="basis-1/2">
        <Select items={selectOptions} bind:value={value.kind} />
    </div>
    {#if value.kind == ValueKind.PRIMITIVE}
        <div class="basis-1/2">
            <Input bind:value={value.data} />
        </div>
    {/if}
</div>
<pre>{JSON.stringify(value)}</pre>
{#if value.kind == ValueKind.COMPOSITE}
    <div class="border-l-[10px] border-l-gray-300 pl-4 space-y-4">
        <EditDuck {dbManager} duckId={value.data} duck={dbManager.db.ducks[prop.duckId]} />
    </div>
{/if}