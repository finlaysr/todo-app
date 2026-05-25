<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<p>This is a heading</p>
<hr />

{@render children()}

<hr />
<p>This is a footer</p>
