<script>
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth, db } from '$lib/firebase';
	let Currentuser;
	let show = true;
	let much = false;
	let lastVisible;
	let firstDocument;
	setTimeout(() => {
		show = false;
	}, 1000);
	import { onMount } from 'svelte';
	import {
		collection,
		endBefore,
		getDocs,
		limit,
		orderBy,
		query,
		startAfter,
		where
	} from 'firebase/firestore';
	let data = false;
	onMount(async () => {
		M.AutoInit();
		onAuthStateChanged(auth, async (user) => {
			Currentuser = user;

			const q = query(
				collection(db, Currentuser.displayName),
				orderBy('timestamp', 'desc'),
				limit(2)
			);
			const querySnapshot = await getDocs(q);
			data = querySnapshot.docs;
			lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
		});
	});
	async function getNextDocument() {
		const next = query(
			collection(db, Currentuser.displayName),
			orderBy('timestamp', 'desc'),
			startAfter(lastVisible),
			limit(2)
		);
		const documentSnapshots = await getDocs(next);
		data = documentSnapshots.docs;

		lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
		firstDocument = documentSnapshots.docs[0];
		if (firstDocument === undefined) {
			setTimeout(async () => {
				const q = query(collection(db, Currentuser.displayName), limit(2));
				const querySnapshot = await getDocs(q);
				data = querySnapshot.docs;
				lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
			}, 1000);
		}
	}
	async function getPrevDocument() {
		const next = query(
			collection(db, Currentuser.displayName),
			orderBy('timestamp', 'desc'),
			endBefore(firstDocument),
			limit(2)
		);
		const documentSnapshots = await getDocs(next);
		data = documentSnapshots.docs;
		// console.log(documentSnapshots,use)
		// Get the last visible document
		lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
		firstDocument = documentSnapshots.docs[0];
	}
</script>

<div class="hero container">
	{#if Currentuser}
		<div class="container">
			<h5 class="grey-text">{Currentuser.displayName} Department :</h5>
			<br />
			{#if data}
				{#if data.length == 0}
					<p>No More Data to Show, Please Refresh here.</p>
				{:else}
					{#each Array.from(data) as doc (doc.id)}
						<div class="card blue-grey darken-1 ">
							<div class="card-content white-text">
								<span class=" badge"><i class="material-icons">like</i></span>
								<span class="card-title">{doc.data().title}</span>
								<p>{doc.data().body}</p>
							</div>
							<div class="card-action">
								<a href={`/suggestion/${doc.id}`}>View more</a>
							</div>
						</div>
					{/each}
				{/if}
			{/if}
			<button class="btn blue" on:click={getNextDocument} disabled={much}>Next</button>
			<button class="btn blue" on:click={getPrevDocument} disabled={much}>Prev</button>
		</div>
	{:else}
		<div class="container">
			{#if show}
				<h4 class="center">Signing you In...</h4>
				<div class="preloader-wrapper big active">
					<div class="spinner-layer spinner-blue-only">
						<div class="circle-clipper left">
							<div class="circle" />
						</div>
						<div class="gap-patch">
							<div class="circle" />
						</div>
						<div class="circle-clipper right">
							<div class="circle" />
						</div>
					</div>
				</div>
			{:else}
				<h5>Welcome to Suggestly</h5>
				<a href="/signup">Please click this link to sign up</a>
			{/if}
		</div>
	{/if}
</div>

<style>
	h4 {
		color: #222;
	}
	.hero {
		width: 300px;
		height: 400px;
		/* background: blue; */
	}
	.card-content p {
		width: 200px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.card-title {
		width: 200px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.btn.blue {
		/* position:abslot. */
		position: relative;
		top: 40px;
	}
</style>
