<template>
  <NuxtLink to="/pokemons">
    <v-btn flat prepend-icon="mdi-arrow-left" class="mb-4">Go back</v-btn>
  </NuxtLink>

  <p v-if="pending">Loading...</p>
  <PokemonDetails :pokemon="pokemon" v-if="!error && !pending" />
  <div v-if="!pending && error">
    <p>Pokemon was not found...</p>
    <NuxtLink to="/">
      <v-btn>Search</v-btn>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
  const { name: param } = useRoute().params
  const name = ref(param as string)

  const uri = `https://pokeapi.co/api/v2/pokemon/${name.value}`

  const {
    data: pokemon,
    pending,
    error,
  }: any = useFetch(uri, { key: name.value })

  if (!pokemon.value)
    createError({ statusCode: 404, message: 'Pokemon not found' })
</script>
