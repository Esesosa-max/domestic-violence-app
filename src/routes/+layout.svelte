<script>
  import { onAuthStateChanged } from "firebase/auth";
  import { auth, db } from "$lib/firebase";

  import { onMount } from "svelte";
  let Cuser;
  let offlineText = "";

  onMount(() => {
    addEventListener("offline", (e) => {
      offlineText = "User Offline ";
    });
    onAuthStateChanged(auth, (user) => {
      Cuser = user;

      // console.log(Cuser);
    });
    // alert('Navbar is swipeable');
  });
</script>

<nav class="">
  <div class="nav-wrapper container">
    <a href="/" class="brand-logo">Suggestly-beta v3 {offlineText}</a>
    {#if Cuser}
      {#if !Cuser.email.includes("admin")}
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"
          ><i class="material-icons">menu</i></a
        >
      {/if}
    {/if}

    <!-- <a href="/new">New</a> -->
    <ul class="right hide-on-med-and-down" />
  </div>
</nav>

<a class="btn relative red" on:click={() => window.history.back()}>
  <i class="large material-icons">keyboard_backspace</i>
</a>
<!-- <li>
  <a class="sidenav-close" on:click={() => auth.signOut()}>Logout</a>
</li> -->

<ul class="sidenav" id="mobile-demo">
  {#if Cuser}
    {#if !Cuser.email.includes("admin")}
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
</style>
