<script setup>
defineProps({
  projectName: {
    type: String,
    required: true
  }
}) 
</script>

<template>
  <div class="greetings">
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <h3>
      You’ve successfully imported a component created using with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vue 3</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Webpack</a>
      inside `{{projectName}}`.
    </h3>
  </div>
</template>

<style scoped>
a{
  color: #8da5e2
}
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings {
  background: #282c34;
  color: white;
  min-height: 100vh;
  padding-top: 5rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>