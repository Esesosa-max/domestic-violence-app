<script>
	let email;
	let username;
	let dept;
	let password;
	let level;
	import {
		createUserWithEmailAndPassword,
		signInWithEmailAndPassword,
		updateProfile
	} from 'firebase/auth';
	import { auth, db } from '$lib/firebase.js';
	import { doc, setDoc } from 'firebase/firestore';
	import { redirect } from '@sveltejs/kit';
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email, username, dept, password, level);

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				M.toast({ html: 'Login success' });
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				alert(errorMessage);
				// ..
			});
	};
</script>

<div class="row container">
	<h5>Login</h5>
	<form class="col s12" on:submit={handleSubmit}>
		<div class="row">
			<div class="input-field col s12">
				<i class="material-icons prefix">email</i>
				<input id="icon_prefix" type="text" class="validate" bind:value={email} />
				<label for="icon_prefix">Email</label>
			</div>

			<div class="input-field col s12">
				<i class="material-icons prefix">pin</i>
				<input id="icon_telephone" type="password" bind:value={password} />
				<label for="icon_telephone">Password</label>
			</div>

			<br />
			<button class="red btn" type="submit">Login</button>
		</div>
	</form>
</div>
