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
	});
</script>

<nav class="purple">
	<div class="nav-wrapper container">
		<a href="/" class="brand-logo">Suggestly</a>
		<a href="#" data-target="mobile-demo" class="sidenav-trigger"
			><i class="material-icons">menu</i></a
		>
		<ul class="right hide-on-med-and-down">This website is not optimized for desktop yet!</ul>
	</div>
</nav>

<ul class="sidenav" id="mobile-demo">
	{#if Cuser}
		<li><a href="/department">Department</a></li>
		<li><a href="/new">New</a></li>
	{:else}
		<li><a href="/signup">Sign Up</a></li>
		<!-- <li><a href="/login">Log In</a></li> -->
	{/if}
</ul>

<slot />
