<template>
  <!-- TEMPLATE CODE GOES HERE -->

  <v-btn @click="handleAddPokemon">Add Ditto</v-btn>

  <div>You catched {{ store.pokemonNum }} pokemons</div>

  <v-row>
    <v-col cols="3" v-for="p in store.pokemons">
      <PokemonCard :pokemon="p" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import { useContextStore } from '../../store/index'

  const store = useContextStore()

  const pokemonsLocal = localStorage.getItem('pokemons') || '[]'
  store.pokemons = JSON.parse(pokemonsLocal)

  const handleAddPokemon = () => {
    const pokemon: PokemonModel = {
      id: Math.floor(Math.random() * 999999999),
      name: 'ditto',
      stats: {
        hp: 48,
        attack: 48,
        defense: 48,
        speed: 48,
      },
      mainAbility: 'limber',
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png',
    }

    store.addPokemon(pokemon)
  }
</script>
