<template>
  <v-tooltip text="Ditto">
    <template v-slot:activator="{ props }">
      <v-btn
        fab
        color="purple"
        icon="mdi-magic-staff"
        v-bind="props"
        @click="handleAddPokemon"
      ></v-btn>
    </template>
  </v-tooltip>

  <p class="text-center pa-4 text-h5">
    You caught {{ store.pokemonNum }} pokemons
  </p>

  <v-row>
    <v-col cols="3" v-for="p in store.pokemons">
      <PokemonCard :pokemon="p" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import { useContextStore } from '../../store/index'

  const store = useContextStore()

  const pokemonsLocalStorage = localStorage.getItem('pokemons') || '[]'
  store.pokemons = JSON.parse(pokemonsLocalStorage)

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
