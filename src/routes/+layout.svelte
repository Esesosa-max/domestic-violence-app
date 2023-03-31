<script>
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth, db } from '$lib/firebase';
	import { onMount } from 'svelte';
	let Cuser;
	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			Cuser = user;
			console.log(Cuser);
		});
		// alert('Navbar is swipeable');
	});
</script>

<nav class="">
	<div class="nav-wrapper container">
		<a href="/" class="brand-logo">Suggestly</a>
		{#if !Cuser}
			<a href="#" data-target="mobile-demo" class="sidenav-trigger"
				><i class="material-icons">menu</i></a
			>
		{/if}

		<!-- <a href="/new">New</a> -->
		<ul class="right hide-on-med-and-down">This website is not optimized for desktop yet!</ul>
	</div>
</nav>

<a class="btn relative red" on:click={() => window.history.back()}>
	<i class="large material-icons">keyboard_backspace</i>
</a>

<ul class="sidenav" id="mobile-demo">
	{#if Cuser}
		{#if !Cuser.email.includes('admin')}
			<li>
				<a class="sidenav-close" href="/new">New</a>
			</li>
		{/if}
	{:else}
		<li>
			<a href="/signup" class="sidenav-close">Sign Up</a>
		</li>
		<li>
			<a href="/login" class="sidenav-close">Log In</a>
		</li>
	{/if}
</ul>
{#if Cuser}
	{#if !Cuser.email.includes('admin')}
		<div class="fixed-action-btn">
			<a class="btn-floating btn-large red" href="/new">
				<i class="large material-icons">add_circle</i>
			</a>
			<!-- <a class="btn tooltipped" data-position="bottom" data-tooltip="I am a tooltip">Make a New Suggestion</a> -->
		</div>
	{/if}
{/if}

<slot />

<style>
	nav {
		background-color: #052f5f;
	}
	.relative {
		position: absolute;
		top: 10px;
		right: 20px;
	}
	.btn-large i {
		font-size: 2.6rem;
	}
</style>
