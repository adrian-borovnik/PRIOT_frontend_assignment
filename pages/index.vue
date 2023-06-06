<template>
  <h1>Hello world</h1>

  <p>You have {{ store.pokemonNum }} pokemon</p>
</template>

<script setup lang="ts">
  import { useContextStore } from '../store/index'

  const store = useContextStore()
</script>
