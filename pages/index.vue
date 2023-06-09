<template>
  <p v-if="fetchError && !loading">There was an error</p>

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

    <v-snackbar
      v-model="showSnackbar"
      :timeout="snackbarTimeout"
      rounded="pill"
      color="success"
      class="text-center"
    >
      <v-icon class="mr-2">mdi-check</v-icon>
      You successfully catch {{ catchedPokemon }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
  import { useContextStore } from '../store/index'

  const store = useContextStore()

  const pokemonsLocal = localStorage.getItem('pokemons') || '[]'
  store.pokemons = JSON.parse(pokemonsLocal)

  const fetchError = ref(false)
  const loading = ref(false)

  const showSnackbar = ref(false)
  const snackbarTimeout = ref(1500)
  const catchedPokemon = ref('')

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

      console.log(rawData)

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

    if (chance < catchThreshold) {
      store.addPokemon(pokemon.value)

      catchedPokemon.value =
        pokemon.value.name.toUpperCase()[0] +
        pokemon.value.name.replace('-', ' ').substring(1)

      showSnackbar.value = true

      await fetchData()
    } else if (chance >= runawayThreshold) {
      await fetchData()
    } else {
      // Try again
    }
  }

  await fetchData()
</script>
