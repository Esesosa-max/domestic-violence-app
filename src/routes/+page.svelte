<script>
  import { onAuthStateChanged, updateProfile } from "firebase/auth";
  import { auth, db } from "$lib/firebase";
  let Currentuser;
  let show = true;
  let much = false;
  let lastVisible;
  let firstDocument;
  setTimeout(() => {
    show = false;
  }, 1000);
  import { onMount } from "svelte";
  import {
    collection,
    doc,
    endBefore,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
  } from "firebase/firestore";
  import LandingPage from "./LandingPage.svelte";
  let data = false;
  let blocked;
  onMount(async () => {
    M.AutoInit();
    onAuthStateChanged(auth, async (user) => {
      Currentuser = user;
      if (!user.email.includes("admin")) {
      }

      const q = query(
        collection(db, Currentuser.displayName),
        orderBy("timestamp", "desc"),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      data = querySnapshot.docs;
      lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    });
  });
  async function getNextDocument() {
    const next = query(
      collection(db, Currentuser.displayName),
      orderBy("timestamp", "desc"),
      startAfter(lastVisible),
      limit(10)
    );
    const documentSnapshots = await getDocs(next);
    data = documentSnapshots.docs;

    lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    firstDocument = documentSnapshots.docs[0];
    if (firstDocument === undefined) {
      setTimeout(async () => {
        const next = query(
          collection(db, Currentuser.displayName),
          orderBy("timestamp", "desc"),

          limit(10)
        );

        const documentSnapshots = await getDocs(next);
        data = documentSnapshots.docs;
        lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        firstDocument = documentSnapshots.docs[0];
      }, 1000);
    }
  }
  async function getPrevDocument() {
    const next = query(
      collection(db, Currentuser.displayName),
      orderBy("timestamp", "desc"),
      endBefore(firstDocument),
      limit(10)
    );
    const documentSnapshots = await getDocs(next);
    data = documentSnapshots.docs;
    // console.log(documentSnapshots,use)
    // Get the last visible document
    lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    firstDocument = documentSnapshots.docs[0];
  }
</script>

<div class="hero-container">
  {#if Currentuser}
    {#if (Currentuser.emailVerified && !blocked) || Currentuser.email.includes("admin")}
      <div class="container">
        <h5 class="grey-text">{Currentuser.displayName} Department :</h5>
        <br />
        {#if data}
          {#if data.length == 0}
            <p>No More Data to Show, Please Refresh here.</p>
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
            <div class="card-container">
              {#each Array.from(data) as doc (doc.id)}
                <div class="card">
                  <div class="card-content">
                    <span class=" badge"
                      ><i class="material-icons">like</i></span
                    >
                    <span class="card-title">{doc.data().title}</span>
                    <p>{doc.data().body}</p>
                  </div>
                  <div class="card-action">
                    <a href={`/suggestion/${doc.id}`}>View more</a>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        {/if}
        <div class="btn-container">
          <button class="btn blue" on:click={getPrevDocument} disabled={much}
            ><i class="material-icons">chevron_left</i></button
          >
          <button class="btn blue" on:click={getNextDocument} disabled={much}
            ><i class="material-icons">chevron_right</i></button
          >
        </div>
      </div>

      <div class="fixed-action-btn">
        <a href="/new" class="btn-floating btn-large red">
          <i class="large material-icons">mode_edit</i>
        </a>
      </div>
    {:else}
      <div class="container">
        {#if show}
          <h2 class="center">Signing you In...</h2>
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
          <p>Please Verify your Email,It has been sent to your inbox</p>
        {/if}
      </div>
    {/if}
  {:else}
    <div class="container">
      <LandingPage />
    </div>
  {/if}
</div>
``

<style>
  :global(body) {
    height: 100vh;
    overflow-y: scroll;
  }
  .hero-container {
    height: 100vh;
    position: relative;
  }
  .card-title {
    font-weight: bold;
  }
  h4 {
    color: #222;
  }
  .hero {
    width: 300px;
    height: 400px;
    /* background: blue; */
  }
  .card-content p {
    /**Major Properties**/
    overflow: hidden;
    line-height: 2rem;
    max-height: 8rem;
    -webkit-box-orient: vertical;
    display: block;
    display: -webkit-box;
    overflow: hidden !important;
    text-overflow: ellipsis;
    -webkit-line-clamp: 4;
  }
  .card {
    /* background-color: ghostwhite; */
    border: 2.5px solid rgba(70, 78, 229, 0.541);
    /* box-shadow: none !important; */
  }
  .card-title {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;

    text-overflow: ellipsis;
  }
  .btn-container {
    /* position:abslot. */
    position: static;
    z-index: 100;
    bottom: 40px;
  }
  .card-action {
    width: 100%;
    padding: 5px;
  }
  .card-action a {
    display: block;
    width: 100%;
    text-align: center;
    background: rgb(5, 139, 188);
    color: #fff !important;
    padding: 10px 15px;
    border-radius: 10px;
  }
  h5 {
    text-transform: capitalize;
  }
  @media (min-width: 800px) {
    .card-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 20px;
      align-items: baseline;
    }
  }
</style>
