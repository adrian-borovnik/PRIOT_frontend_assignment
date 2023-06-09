<template>
  <p v-if="fetchError && !loading">There was an error, search again...</p>

  <v-container fluid class="d-flex justify-center">
    <v-sheet width="100%" max-width="600">
      <PokemonSearchCard :pokemon="pokemon" v-if="!fetchError" />
      <v-sheet class="d-flex justify-end pt-4">
        <v-btn
          @click="handleCatch"
          color="green"
          prepend-icon="mdi-pokeball"
          class="mr-2"
          >CATCH</v-btn
        >
        <v-btn @click="fetchData" color="blue" prepend-icon="mdi-magnify"
          >SEARCH</v-btn
        >
      </v-sheet>
    </v-sheet>
  </v-container>

  <v-snackbar
    v-model="showSnackbarSuccess"
    :timeout="snackbarTimeout"
    rounded="pill"
    color="success"
    class="text-center"
  >
    <v-icon class="mr-2">mdi-check-circle</v-icon>
    You successfully caught {{ currentPokemon }}
  </v-snackbar>

  <v-snackbar
    v-model="showSnackbarWarning"
    :timeout="snackbarTimeout"
    rounded="pill"
    color="warning"
    class="text-center"
  >
    <v-icon class="mr-2">mdi-alert</v-icon>
    {{ currentPokemon }} escaped the pokeball. Try again!
  </v-snackbar>

  <v-snackbar
    v-model="showSnackbarError"
    :timeout="snackbarTimeout"
    rounded="pill"
    color="red"
    class="text-center"
  >
    <v-icon class="mr-2">mdi-close-octagon-outline</v-icon>
    {{ currentPokemon }} ran away...
  </v-snackbar>
</template>

<script setup lang="ts">
  import { useContextStore } from '../store/index'

  const store = useContextStore()

  const pokemonsLocalStorage = localStorage.getItem('pokemons') || '[]'
  store.pokemons = JSON.parse(pokemonsLocalStorage)

  const fetchError = ref(false)
  const loading = ref(false)

  const showSnackbarSuccess = ref(false)
  const showSnackbarWarning = ref(false)
  const showSnackbarError = ref(false)
  const snackbarTimeout = ref(2000)
  const currentPokemon = ref('')

  const pokemon = ref({} as PokemonModel)

  const fetchData = async () => {
    loading.value = true
    try {
      const id = Math.floor(Math.random() * 1000)
      const uri = `https://pokeapi.co/api/v2/pokemon/${id}`
      const res = await fetch(uri)
      const rawData: PokemonResponse = await res.json()

      loading.value = false
      fetchError.value = false

      const pokemonData: PokemonModel = {
        id: Math.floor(Math.random() * 999999999),
        name: rawData.name,
        stats: {
          hp: rawData.stats[0]?.base_stat,
          attack: rawData.stats[1]?.base_stat,
          defense: rawData.stats[2]?.base_stat,
          speed: rawData.stats[5]?.base_stat,
        },
        mainAbility: rawData.abilities[0]?.ability.name,
        img: rawData.sprites.front_default,
      }

      pokemon.value = pokemonData
    } catch (e) {
      loading.value = false
      fetchError.value = true
    }
  }

  const handleCatch = async () => {
    const chance = Math.random()
    const catchThreshold = 0.4
    const runawayThreshold = 0.8

    currentPokemon.value =
      pokemon.value.name.toUpperCase()[0] +
      pokemon.value.name.replace('-', ' ').substring(1)

    if (chance < catchThreshold) {
      store.addPokemon(pokemon.value)
      showSnackbarSuccess.value = true
      await fetchData()
    } else if (chance >= runawayThreshold) {
      showSnackbarError.value = true
      await fetchData()
    } else {
      showSnackbarWarning.value = true
    }
  }

  await fetchData()
</script>
