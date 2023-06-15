<template>
  <v-container fluid class="d-flex justify-center">
    <v-sheet width="100%" max-width="600">
      <p v-if="loading">Loading...</p>
      <p v-if="fetchError && !loading">There was an error, search again...</p>

      <PokemonSearchCard
        :pokemon="pokemon"
        v-if="!fetchError && pokemon && !loading"
      />
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
    :message="snackbarMessage"
    :snackbar-type="snackbarType"
    :pokemon-name="currentPokemon"
    :icon="snackbarIcon"
    v-model="showSnackbar"
  />
</template>

<script setup lang="ts">
  import { useContextStore } from '../store/index'

  const store = useContextStore()

  const pokemonsLocalStorage = localStorage.getItem('pokemons') || '[]'
  store.pokemons = JSON.parse(pokemonsLocalStorage)

  const fetchError = ref<boolean>(false)
  const loading = ref<boolean>(false)

  const showSnackbar = ref<boolean>(false)
  const snackbarType = ref<SnackbarType>('success')
  const snackbarMessage = ref<string>('')
  const snackbarIcon = ref<string | undefined>()

  const dispaySnackbar = (
    message: string,
    type: SnackbarType,
    icon?: string
  ) => {
    snackbarType.value = type
    snackbarMessage.value = message
    showSnackbar.value = true
    snackbarIcon.value = icon || undefined
  }

  const pokemon = ref<PokemonModel>()
  const currentPokemon = ref('')

  const fetchData = async () => {
    loading.value = true
    try {
      const id = Math.floor(Math.random() * 1000 + 1)
      const uri = `https://pokeapi.co/api/v2/pokemon/${id}`
      const res = await fetch(uri)
      const rawData: PokemonResponse = await res.json()

      loading.value = false
      fetchError.value = false

      const pokemonData: PokemonModel = {
        id: rawData.id,
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

    if (store.pokemons.find((p) => p.id === pokemon.value?.id)) {
      dispaySnackbar(
        'This pokemon is already in your collection... Search onwards!',
        'warning'
      )
      return
    }

    const chance = Math.random()
    const catchThreshold = 0.4
    const runawayThreshold = 0.8

    currentPokemon.value =
      pokemon.value.name.toUpperCase()[0] +
      pokemon.value.name.replace('-', ' ').substring(1)

    if (chance < catchThreshold) {
      store.addPokemon(pokemon.value)
      dispaySnackbar('You caught a pokemon!', 'success', 'check-circle-outline')
      await fetchData()
    } else if (chance >= runawayThreshold) {
      dispaySnackbar(
        'Your pokemon ran away...',
        'error',
        'close-octagon-outline'
      )
      await fetchData()
    } else {
      dispaySnackbar(
        'Pokemon escaped the pokeball. Try again!',
        'warning',
        'alert-outline'
      )
    }
  }

  onMounted(async () => {
    await fetchData()
  })
</script>
