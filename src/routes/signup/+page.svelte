<script>
  let email;
  let username;
  let dept;
  let password;
  let level;
  import {
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
  } from "firebase/auth";
  import { auth, db } from "$lib/firebase.js";
  import { doc, setDoc } from "firebase/firestore";
  import { redirect } from "@sveltejs/kit";
  const handleSubmit = (e) => {
    e.preventDefault();
    //  &&
    if (email && password && dept && password && level) {
      console.log(email.trim());
      if (!email.includes("admin") && email.includes("@mgtsci.uniben.edu")) {
        createUserWithEmailAndPassword(auth, email.trim(), password)
          .then((userCredential) => {
            // Signed in
            M.toast({ html: "We Are Creating YOU, One Second" });
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
              displayName: dept,
            }).then(async () => {
              // Add a new document in collection "cities"
              await setDoc(doc(db, "users", user.email), {
                email: user.email,
                dept: dept,
                username: user.displayName,
                level: level,
                blocked: true,
              });

              // ...
            });

            sendEmailVerification(auth.currentUser).then(() => {
              // Email verification sent!
              M.toast({ html: "Email Verfication Mail Sent" });
              window.location.href = "/";
              // ...
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            // ..
          });
      } else {
        alert("Please use your management science faculty email ");
      }
    } else {
      alert("please fill EVERYTHING");
    }
  };
</script>

<div class="row container">
  <h5>Sign Up for an Account</h5>
  <form class="col s12" on:submit={handleSubmit}>
    <div class="row">
      <div class="input-field col s12">
        <i class="material-icons prefix">email</i>
        <input
          id="icon_prefix"
          type="text"
          class="validate"
          bind:value={email}
        />
        <label for="icon_prefix">Email</label>
      </div>

      <div class="input-field col s12">
        <i class="material-icons prefix">account_circle</i>
        <input id="icon_prefix-2" type="text" bind:value={username} />
        <label for="icon_prefix-2">Username</label>
      </div>
      <div class="input-field col s12">
        <i class="material-icons prefix">pin</i>
        <input id="icon_telephone" type="password" bind:value={password} />
        <label for="icon_telephone">Password</label>
      </div>
      <label for="select" style="font-size: 14px;">Select your deptarment</label
      >
      <select name="" id="select" class="browser-default" bind:value={dept}>
        <option value="accounting">Accounting</option>
        <option value="banking">Banking</option>
        <option value="business-admin">Business Admin</option>
        <option value="entrepreneurship">Entrepreneurship</option>
        <option value="IRPM">IRPM</option>
        <option value="marketing">Marketing</option>
      </select>
      <br />
      <label for="select" style="font-size: 14px;">Select your Level</label>
      <select name="" id="select" class="browser-default" bind:value={level}>
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="300">300</option>
        <option value="400">400</option>
      </select>
      <br />
      <button class="red btn" type="submit">Sign Up</button>
    </div>
  </form>
</div>
