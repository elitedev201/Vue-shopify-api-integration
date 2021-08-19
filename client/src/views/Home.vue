<template>
  <div>
    <v-card class="mb-6">
      <v-card-title>Kick start your project 🚀</v-card-title>
      <v-card-text>All the best for your new project.</v-card-text>
      <v-card-text>
        Please make sure to read our <a
          href="https://themeselection.com/demo/materio-vuetify-vuejs-admin-template/documentation"
          target="_blank"
          class="text-decoration-none"
        >
          Template Documentation
        </a> to understand where to go from here and how to use our template.
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>Want to integrate JWT? 🔒</v-card-title>
      <v-card-text>We carefully crafted JWT flow so you can implement JWT with ease and with minimum efforts.</v-card-text>
      <v-card-text>Please read our  JWT Documentation to get more out of JWT authentication.</v-card-text>
    </v-card>
  </div>
</template>



<!--
<template>
<div class="home">
  <section class="hero is-dark">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Welcome to the Animal Rescue League          
        </h1>
        <h2 class="subtitle">
          Make sure you check out our upcoming events below
        </h2>
        <div class="button-block">
          <button v-if="!$auth.isAuthenticated" @click="login" class="button is-xl is-dark">Sign Up to Browse Events</button>
          <h3 v-if="$auth.isAuthenticated" class="is-size-3 has-background-dark welcome">Welcome, {{ $auth.user.name }}!</h3>
        </div>
      </div>
    </div>
  </section>
  <EventsList />
</div>
</template>
<script>
import EventsList from '../components/EventsList';
export default {
  name: 'home',
  components: {
    EventsList
  },
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    }
  }
}
</script>
<style lang="scss" scoped>
  .hero {    
    text-align: center;
    background-image: url('https://cdn.auth0.com/blog/vue-meetup/event-banner.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 400px;
  }
  .hero-body .title {
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
    padding: 40px 0 20px 0;
    font-size: 60px;
  }
  .subtitle {
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.7);
    font-size: 30px;
  }
  .button-block {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    position: absolute;
    bottom: -150px;
    .button {
      margin-right: 50px;
      padding-left: 50px;
      padding-right: 50px;
    }
    .welcome {
      width: 400px;
      padding: 10px;
      margin-left: auto;
      margin-right: auto;
    }
  }
  .is-xl {
    font-size: 1.7rem;
  }
</style>

-->