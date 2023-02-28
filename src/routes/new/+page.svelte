<script>
	let title;
	let body;
	let userInfo = false;
	let Cuser;
	let user2;
	import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
	import { auth, db } from '$lib/firebase.js';
	import { onMount } from 'svelte';
	import { onAuthStateChanged } from 'firebase/auth';
	onMount(async () => {
		onAuthStateChanged(auth, (user) => {
			Cuser = user.email;
			user2 = user;
			console.log(Cuser, user);
		});
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Cuser == 'admin@gmail.com') {
			alert("sorry admins can't make suggestions");
			return;
		} else {
			console.log(Cuser);
			// debugger;
			if (title && body) {
				const docRef = await addDoc(collection(db, user2.displayName), {
					title,
					body,
					IsAnonoymous: userInfo,
					currentUser: Cuser,
					timestamp: serverTimestamp(),
					dept: user2.displayName
				});
				M.toast({ html: 'Suggestion Recorded Successfully' });
			} else {
				alert('please put a title and body');
			}
		}
	};
</script>

<div class="container">
	<!-- <i class="material-icons">arrow_back</i> -->
	<h5>Add a new suggestion</h5>

	<div class="row">
		<form class="col s12" on:submit={handleSubmit}>
			<div class="row">
				<div class="input-field col s12">
					<i class="material-icons prefix">title</i>
					<input id="icon_prefix" type="text" class="validate" bind:value={title} />
					<label for="icon_prefix">Suggestion Title</label>
				</div>
				<div class="input-field col s12">
					<div class="input-field col s12">
						<i class="material-icons prefix">B</i>
						<textarea id="textarea1" class="materialize-textarea" bind:value={body} />
						<label for="textarea1">Suggestion body</label>
					</div>
				</div>
			</div>
			<label>
				<input type="checkbox" bind:checked={userInfo} />
				<span>Enable Anonymous Mode? it hides your email and username</span>
			</label>
			<br />
			<br />
			<br />
			<button class="blue btn" type="submit">Submit</button>
		</form>
	</div>
</div>

<style>
	.container {
		overflow-x: hidden;
	}
</style>
