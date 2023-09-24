<script>
  import { onAuthStateChanged, updateProfile } from "firebase/auth";
  import { auth, db } from "$lib/firebase";
  import { fade } from "svelte/transition";
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
    setDoc,
    startAfter,
  } from "firebase/firestore";

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
        orderBy("likes", "desc"),

        limit(10)
      );
      const querySnapshot = await getDocs(q);
      data = querySnapshot.docs;
      lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    });
  });
</script>

<div class="hero-container" transition:fade={{ delay: 250, duration: 300 }}>
  {#if Currentuser}
    {#if (Currentuser.emailVerified && !blocked) || Currentuser.email.includes("admin")}
      <div class="container">
        <h5>Most Popular 😍</h5>
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
              {#each Array.from(data) as doc, i (doc.id)}
                <div class="card">
                  <div class="card-content">
                    <span class=" badge">
                      <b>{doc.data().likes || 0} </b>
                      {#if Array.from(data)[0].id == doc.id}
                        <div class="medal-gold">
                          <p>1.</p>
                          <i class="material-icons medal">
                            workspace_premium
                          </i>
                        </div>
                      {/if}
                      {#if Array.from(data)[1].id == doc.id}
                        <div class="medal-sliver">
                          <p>2.</p>
                          <i class="material-icons medal">
                            workspace_premium
                          </i>
                        </div>
                      {/if}
                      {#if Array.from(data)[2].id == doc.id}
                        <div class="medal-bronze">
                          <p>3.</p>
                          <i class="material-icons medal">
                            workspace_premium
                          </i>
                        </div>
                      {/if}
                      {#if i != 0 && i != 1 && i != 2}
                        <div class="medal-bronze">
                          <p>{i + 1}</p>
                        </div>
                      {/if}

                      <i
                        id="like"
                        class="material-icons"
                        on:click={() =>
                          alert("Not Possible, Got to Home to Like")}
                        >thumb_up</i
                      ></span
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
        <!-- <div class="btn-container">
          <button class="btn blue" on:click={getPrevDocument} disabled={much}
            ><i class="material-icons">chevron_left</i></button
          >
          <button class="btn blue" on:click={getNextDocument} disabled={much}
            ><i class="material-icons">chevron_right</i></button
          >
        </div> -->
      </div>

      <div class="fixed-action-btn">
        <a href="/new" class="btn-floating btn-large red">
          <i class="large material-icons">mode_edit</i>
        </a>
      </div>
      <div class="fixed-action-btn-2">
        <a href="/" class="btn-floating btn-large red">
          <i class="large material-icons">home</i>
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
  {:else}{/if}
</div>
``

<style>
  :global(body) {
    height: 100vh;
    overflow-y: scroll;
  }
  #like:focus {
    color: rgb(80, 127, 227);
    transition: 1s all;
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
  .fixed-action-btn-2 {
    position: fixed;
    bottom: 30px;
    left: 20px;
  }
  .medal-gold {
    color: gold;
    font-size: 30px;
    position: absolute;
    display: flex;
    align-items: center;
    left: 20px;
    top: 13px;
  }
  .medal-sliver {
    color: silver;
    font-size: 30px;
    position: absolute;
    display: flex;
    align-items: center;
    left: 20px;
    top: 13px;
  }
  .medal-bronze {
    color: brown;
    font-size: 30px;
    position: absolute;
    display: flex;
    align-items: center;
    left: 20px;
    top: 13px;
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
