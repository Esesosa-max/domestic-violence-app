<script>
  import { onMount } from "svelte";
  import {
    doc,
    getDoc,
    deleteDoc,
    addDoc,
    collection,
    getDocs,
    setDoc,
  } from "firebase/firestore";
  import { db, auth } from "$lib/firebase";
  import { redirect } from "@sveltejs/kit";
  import { onAuthStateChanged } from "firebase/auth";
  export let data;

  let document;
  let time;
  let comment = "";
  let Cuser;
  let docs = [];
  onMount(async () => {
    onAuthStateChanged(auth, async (user) => {
      Cuser = user;

      const docRef = doc(db, user.displayName, data.id);
      const docRef2 = collection(db, `${user.displayName}/${data.id}/comment`);
      const docSnap = await getDoc(docRef);
      const docSnap2 = await getDocs(docRef2);
      document = docSnap.data();
      time = document.timestamp.toDate().toLocaleDateString();
      docs = docSnap2.docs;
      // console.log(docs);
    });
  });
  const handleClick = async () => {
    console.log(data.id);
    await deleteDoc(doc(db, `${Cuser.displayName}`, data.id));
    M.toast({ html: " Suggestion Deleted" });
    setTimeout(() => (window.location.href = "/"), 1000);
  };
  const handleSubmit = async (e) => {
    if (comment == "") {
      alert("input can not be empty");
      return null;
    } else {
      const docRef = await addDoc(
        collection(db, `${Cuser.displayName}/${data.id}/comment`),
        {
          comment,
        }
      );
      M.toast({ html: "Added, Refreshing...." });
      window.location.reload();
      // window.location.reload();
    }
  };
  const disableUser = async () => {
    // console.log(document.currentUser);
    await setDoc(
      doc(db, `users/${document.currentUser}`),
      {
        blocked: true,
      },
      { merge: true }
    );
    M.toast({ html: "User Blocked" });
  };
</script>

<div class="container">
  {#if document}
    <h5>{document.title}</h5>
    <p>{document.body}</p>
    <p>For Department:{document.dept}</p>
    <p>Date: {time}</p>
    {#if !document.IsAnonoymous}
      <p>User:{document.currentUser}</p>
    {:else}
      <p>User Wishes to be Anonymous</p>
    {/if}
    {#if Cuser}
      {#if Cuser.email.includes("admin")}
        <br />
        <h6>Admin remarks</h6>
        {#if docs.length > 0}
          <p style="display:none" />
        {:else}
          <form action="#" on:submit={handleSubmit}>
            <input
              type="text"
              placeholder="Give remarks"
              bind:value={comment}
            />
            <button class="blue btn" type="submit">Comment</button>
          </form>
        {/if}

        <button class="btn red z-depth-0" on:click={handleClick}
          ><i class="material-icons">delete</i></button
        >

        <button class="btn purple z-depth-0" on:click={disableUser}
          ><i class="material-icons">person</i> Disable this user</button
        >
      {/if}
    {/if}
  {:else}
    <h4 class="center">Loading....</h4>
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
  {/if}
  {#if docs}
    {#each Array.from(docs) as doc (doc.id)}
      <p><b>Admin : </b>{doc.data().comment}</p>
    {/each}
  {/if}
</div>

<style>
  .container-center {
    margin: 50px;
  }
  .btn.red {
    position: fixed;
    bottom: 140px;
    right: 40px;
  }
  .btn.purple {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 140px;
    left: 10px;
    display: none;
  }
  @media (min-width: 800px) {
    .btn.red {
      position: absolute;
      bottom: 180px;
      right: 210px;
    }
    .btn.purple {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      bottom: 180px;
      left: 210px;
      display: none;
    }
  }
</style>
