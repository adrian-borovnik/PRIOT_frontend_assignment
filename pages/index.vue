<template>
  <p v-if="fetchError && !loading">There was an error, search again...</p>

  <v-container fluid class="d-flex justify-center">
    <v-sheet width="100%" max-width="600">
      <PokemonSearchCard :pokemon="pokemon" v-if="!fetchError && pokemon" />
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

  <Snackbar
    :snackbar-type="snackbarType"
    :pokemon-name="currentPokemon"
    v-model="showSnackbar"
  />
</template>

<script setup lang="ts">
  import { useContextStore } from '../store/index'

  const store = useContextStore()

  const pokemonsLocalStorage = localStorage.getItem('pokemons') || '[]'
  store.pokemons = JSON.parse(pokemonsLocalStorage)

  const fetchError = ref(false)
  const loading = ref(false)

  const showSnackbar = ref(false)
  // const snackbarType = ref<'success' | 'warning' | 'fail'>('fail')
  let snackbarType: 'success' | 'warning' | 'fail' = 'success'

  const pokemon = ref<PokemonModel>()
  const currentPokemon = ref('')

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
    if (pokemon.value === undefined) return

    const chance = Math.random()
    const catchThreshold = 0.4
    const runawayThreshold = 0.8

    currentPokemon.value =
      pokemon.value.name.toUpperCase()[0] +
      pokemon.value.name.replace('-', ' ').substring(1)

    if (chance < catchThreshold) {
      store.addPokemon(pokemon.value)
      snackbarType = 'success'
      showSnackbar.value = true
      await fetchData()
    } else if (chance >= runawayThreshold) {
      snackbarType = 'fail'
      showSnackbar.value = true
      await fetchData()
    } else {
      snackbarType = 'warning'
      showSnackbar.value = true
    }
  }

  onMounted(async () => {
    await fetchData()
  })
</script>
