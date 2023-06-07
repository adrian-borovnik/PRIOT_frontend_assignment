<template>
  <h1>Hello world</h1>
  <p>You have {{ store.pokemonNum }} pokemon</p>

  <button @click="fetchData">FETCH</button>
  <button @click="handleKeep">KEEP</button>
  <!-- <code>{{ pokemon }}</code> -->

  <v-sheet class="d-flex justify-center">
    <v-card class="d-flex">
      <img
        :src="pokemonRes.sprites.front_default"
        alt="Image of a pokemon"
        width="256"
        height="256"
      />
      <v-sheet>
        <p>{{ pokemonRes.name }}</p>
      </v-sheet>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
  import { b } from 'consola/dist/consola-3fef035a'
  import { useContextStore } from '../store/index'

  const store = useContextStore()

  const pokemonRes = ref({} as PokemonResponse)

  const fetchData = async () => {
    const id = Math.floor(Math.random() * 1000)
    const uri = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(uri)
    const data: PokemonResponse = await res.json()

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

    pokemonRes.value = data
    console.log(data)
  }

  await fetchData()

  const handleKeep = () => {
    const pokemon: PokemonModel = {
      id: Math.floor(Math.random() * 999999999), // idealy would be using uuid
      name: pokemonRes.value.name,
      stats: {
        hp: pokemonRes.value.stats[0].base_stat,
        attack: pokemonRes.value.stats[1].base_stat,
        defense: pokemonRes.value.stats[2].base_stat,
        speed: pokemonRes.value.stats[3].base_stat,
      },
      mainAbility: pokemonRes.value.abilities[0].ability.name,
      img: pokemonRes.value.sprites.front_default,
    }

    store.addPokemon(pokemon)
  }
</script>
