<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import refreshIcon from "$lib/assets/refresh.svg";
	import addIcon from "$lib/assets/add.svg";
	import "$lib/global.css";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Todo App</title>
</svelte:head>

<div class="header">
	<a href="/">Todo App</a>
	<div>
		<button onclick={() => window.location.reload()}>
			<img src={refreshIcon} alt="Refresh" height="30px" width="auto" />
		</button>
		<button onclick={() => (window.location.href = "/tasks")}>
			<img src={addIcon} alt="Add Task" height="30px" width="auto" />
		</button>
	</div>
</div>

<hr />

{@render children()}
<br />
<br />
<hr />
<p class="footer">This is a footer</p>

<style>
	.header {
		font-size: 2em;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 0;
	}

	.footer {
		font-size: 0.8em;
		text-align: center;
		color: #888;
		margin-bottom: 20px;
	}
</style>
