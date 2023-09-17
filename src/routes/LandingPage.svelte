<script>
  import image from "$lib/img1.jpg";
</script>

<div class="container" style={`{background-image: url(${image})}`}>
  <div class="img-container">
    <img
      src="https://img.icons8.com/pastel-glyph/512/000000/box--v2.png"
      alt="box--v2"
    />
  </div>

  <h5>Make your opinuion Count</h5>
  <p>
    Have a bright idea? A suggestion for improvement? Something on your mind?
    We're all ears! Your input can shape the future of your educational
    experience.
  </p>
  <h5>Why Make a Suggestion?</h5>
  <div class="card">
    <div class="card-content">
      <h4 class="card-title">1.Anonymous</h4>
      suggestion can make Anonymous hiding your email and username while you comment
    </div>
  </div>
  <div class="card">
    <div class="card-content">
      <h4 class="card-title">2.Voice Matters</h4>
      All suggestions are viewed by the relevant admins and authorities
    </div>
  </div>
  <div class="card">
    <div class="card-content">
      <h4 class="card-title">3.Timely Feedback</h4>
      Admins can comment on suggestions
    </div>
  </div>
  <h5>Terms and Conditions</h5>
  <p>
    Please Note that any student found posting irrevant things will be banned
    indefintely and a student can only have one account.
  </p>
  <h5>Are you ready!</h5>
  <a href="/signup" class="btn btn-purple">Make a Suggestion Now!</a>
  <br />
  <br />
  <br />
</div>

<style>
  .img-container {
    max-width: 100%;
  }
  .img-container img {
    width: 100%;
    object-fit: contain;
    animation-name: float;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  @keyframes float {
    0% {
      transform: translateY(-60px);
    }
    0% {
      transform: translateY(20px);
    }
  }
  @media (min-width: 800px) {
    .img-container img {
      width: 70%;
    }
  }
</style>
