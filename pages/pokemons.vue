<template>
  <!-- TEMPLATE CODE GOES HERE -->

  <button @click="handleAddPokemon">Add Pokemon</button>

  <div>You catched {{ store.pokemonNum }} pokemons</div>

  <div v-for="p in store.pokemons" :key="p.name">This is {{ p.name }}</div>
</template>

<script setup lang="ts">
  import { useContextStore } from '../store/index'

  const store = useContextStore()

  const handleAddPokemon = () => {
    const pokemon: PokemonModel = {
      name: 'Ditto',
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
