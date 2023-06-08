<template>
  <h1>Hello world</h1>
  <p>You have {{ store.pokemonNum }} pokemon</p>

  <v-btn @click="fetchData">FETCH</v-btn>
  <v-btn @click="handleKeep">KEEP</v-btn>
  <!-- <code>{{ pokemon }}</code> -->

  <v-sheet class="d-flex justify-center">
    <p v-if="loading">Searching pokemon...</p>
    <p v-if="fetchError && !loading">There was an error</p>
    <v-card class="d-flex" v-if="!fetchError && !loading">
      <img
        :src="pokemon.sprites.front_default"
        alt="Image of a pokemon"
        width="256"
        height="256"
      />
      <v-sheet>
        <p>{{ pokemon.name }}</p>
      </v-sheet>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
  import { b } from 'consola/dist/consola-3fef035a'
  import { useContextStore } from '../store/index'

  const store = useContextStore()
  const fetchError = ref(false)
  const loading = ref(false)

  const pokemon = ref({} as PokemonResponse)

  const fetchData = async () => {
    try {
      loading.value = true

      const id = Math.floor(Math.random() * 1000)
      const uri = `https://pokeapi.co/api/v2/pokemon/${id}`
      const res = await fetch(uri)
      const rawData = await res.json()

      loading.value = false
      fetchError.value = false

      const pokemonData: PokemonResponse = {
        name: rawData.name,
        stats: rawData.stats,
        abilities: rawData.abilities,
        sprites: {
          front_default: rawData.sprites.front_default,
        },
      }
      pokemon.value = pokemonData
      console.log(pokemonData)
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
    const tempPokemon: PokemonModel = {
      id: Math.floor(Math.random() * 999999999), // idealy would be using uuid
      name: pokemon.value.name,
      stats: {
        hp: pokemon.value.stats[0].base_stat,
        attack: pokemon.value.stats[1].base_stat,
        defense: pokemon.value.stats[2].base_stat,
        speed: pokemon.value.stats[3].base_stat,
      },
      mainAbility: pokemon.value.abilities[0].ability.name,
      img: pokemon.value.sprites.front_default,
    }

    store.addPokemon(tempPokemon)
    await fetchData()
  }
</script>
