<script>
  let title = "";
  let body = "";
  let userInfo = false;
  let Cuser;
  let user2;
  import {
    collection,
    addDoc,
    serverTimestamp,
    doc,
    getDoc,
  } from "firebase/firestore";
  import { auth, db } from "$lib/firebase.js";
  import { onMount } from "svelte";
  import { onAuthStateChanged } from "firebase/auth";
  let blocked;
  onMount(async () => {
    onAuthStateChanged(auth, async (user) => {
      Cuser = user.email;
      user2 = user;

      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);
      blocked = docSnap.data().blocked;

    });
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Cuser == "admin@gmail.com") {
      alert("sorry admins can't make suggestions");
      return;
    } else {
   
      // debugger;
      if (title && body) {
        if (title.length < 6 || body.length < 10) {
          alert("Too short of title or body");
        } else {
          const docRef = await addDoc(collection(db, user2.displayName), {
            title,
            body,
            IsAnonoymous: userInfo,
            currentUser: Cuser,
            timestamp: serverTimestamp(),
            dept: user2.displayName,
          });
          M.toast({ html: "Suggestion Recorded Successfully" });
          window.location.href = "/";
        }
      } else {
        alert("please put a title and body");
      }
    }
  };
</script>

{#if user2 && user2.emailVerified}
  {#if blocked == false}
    <div class="container">
      <!-- <i class="material-icons">arrow_back</i> -->
      <h5>Add a new suggestion</h5>

      <div class="row">
        <form class="col s12" on:submit={handleSubmit}>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">title</i>
              <input
                id="icon_prefix"
                type="text"
                class="validate"
                bind:value={title}
              />
              <label for="icon_prefix">Suggestion Title</label>
            </div>
            <div class="input-field col s12">
              <div class="input-field col s12">
                <i class="material-icons prefix">B</i>
                <textarea
                  id="textarea1"
                  class="materialize-textarea"
                  bind:value={body}
                  placeholder="Min char 20"
                />
                <label for="textarea1">Suggestion body</label>
              </div>
            </div>
          </div>
          <p>{body.length}/10</p>
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
  {:else}
    <h5 class="text-center">Your Account has been Restricted</h5>
    <p class="lead">The Admin has blocked you from posting for the meantime</p>
  {/if}
{:else}
  <div class="container">
    <p>Please Verify your Email</p>
  </div>
{/if}

<style>
  .container {
    overflow-x: hidden;
  }
  h5 {
    text-align: center;
  }
</style>
