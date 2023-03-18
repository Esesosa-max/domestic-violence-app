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

		<a href="#" data-target="mobile-demo" class="sidenav-trigger"
			><i class="material-icons">menu</i></a
		>

		<!-- <a href="/new">New</a> -->
		<ul class="right hide-on-med-and-down">This website is not optimized for desktop yet!</ul>
	</div>
</nav>

<ul class="sidenav" id="mobile-demo">
	{#if Cuser}
		{#if !Cuser.email.includes('admin')}
			<li>
				<a
					href="/new"
					on:click={() => M.toast({ html: 'Navigation Sucessfull, You can swipe away now' })}>New</a
				>
			</li>
		{/if}
	{:else}
		<li>
			<a
				href="/signup"
				on:click={() => M.toast({ html: 'Navigation Sucessfull, You can swipe away now' })}
				>Sign Up</a
			>
		</li>
		<li>
			<a
				href="/login"
				on:click={() => M.toast({ html: 'Navigation Sucessfull,You can swipe away now' })}>Log In</a
			>
		</li>
	{/if}
</ul>

<slot />

<style>
	nav {
		background-color: #052f5f;
	}
</style>
