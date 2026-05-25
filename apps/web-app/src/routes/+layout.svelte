<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<p class="heading">Todo App</p>
<hr />

{@render children()}

<hr />
<p class="footer">This is a footer</p>

<style>
	.heading {
		font-size: 2em;
		font-weight: bold;
		text-align: center;
	}

	.footer {
		font-size: 0.8em;
		text-align: center;
		color: #888;
		margin-bottom: 20px;
	}
</style>
