<template>
  <div id="app">
    <img src="./assets/logo.png">
    <FilterComponent></FilterComponent>
  </div>
</template>

<script>
import FilterComponent from './components/FilterComponent'

export default {
  name: 'app',
  components: {
    FilterComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
