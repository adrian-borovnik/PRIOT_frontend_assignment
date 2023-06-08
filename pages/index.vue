<template>
  <p v-if="fetchError && !loading">There was an error</p>

  <v-container fluid class="d-flex justify-center">
    <v-sheet width="100%" max-width="600">
      <v-card class="d-flex pa-4" v-if="!fetchError">
        <v-img
          :src="pokemon.img"
          alt="Image of a pokemon"
          aspect-ratio="1"
          max-width="200"
        />
        <v-divider vertical class="mx-4"></v-divider>
        <v-sheet>
          <p class="text-h5 mb-6">
            {{
              pokemon.name.toUpperCase()[0] +
              pokemon.name.replace('-', ' ').substring(1)
            }}
          </p>
          <div class="d-flex mt-2">
            <v-icon icon="mdi-heart" color="green mr-2"> </v-icon>
            <p>Health points: {{ pokemon.stats.hp }}</p>
          </div>
          <div class="d-flex mt-2">
            <v-icon icon="mdi-sword" color="red mr-2"> </v-icon>
            <p>Attack: {{ pokemon.stats.attack }}</p>
          </div>
          <div class="d-flex mt-2">
            <v-icon icon="mdi-shield" color="blue mr-2"> </v-icon>
            <p>Defence: {{ pokemon.stats.defense }}</p>
          </div>
          <div class="d-flex mt-2">
            <v-icon icon="mdi-fast-forward" color="purple mr-2"> </v-icon>
            <p>Speed: {{ pokemon.stats.speed }}</p>
          </div>
        </v-sheet>
      </v-card>
      <v-sheet class="d-flex justify-end pt-4">
        <v-btn
          @click="handleKeep"
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

    // const { data } = await useFetch(
    //   () => {
    //     const id = Math.floor(Math.random() * 1000)
    //     return `https://pokeapi.co/api/v2/pokemon/${id}`
    //   },
    //   {
    //     transform: (pokemon: any) => {
    //       return {
    //         name: pokemon.name,
    //         stats: pokemon.stats,
    //         abilities: pokemon.abilities,
    //         sprites: pokemon.sprites.front_default,
    //       } as PokemonResponse
    //     },
    //   }
    // )
  }

  await fetchData()

  const handleKeep = async () => {
    if (pokemon.value) store.addPokemon(pokemon.value)

    catchedPokemon.value =
      pokemon.value.name.toUpperCase()[0] +
      pokemon.value.name.replace('-', ' ').substring(1)

    showSnackbar.value = true

    await fetchData()
  }
</script>
