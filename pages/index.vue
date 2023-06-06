<template>
  <h1>Hello world</h1>
  <p>You have {{ store.pokemonNum }} pokemon</p>
  <v-sheet class="d-flex justify-center">
    <v-card class="d-flex">
      <img
        :src="pokemon.sprites.other.dream_world.front_default"
        alt="Image of a pokemon"
      />
      <v-sheet>
        <p>{{ pokemon.name }}</p>
        <p>{{}}</p>
      </v-sheet>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
  import { useContextStore } from '../store/index'

  const store = useContextStore()

  const getData = async () => {}
  const id = Math.floor(Math.random() * 1000)
  const uri = `https://pokeapi.co/api/v2/pokemon/${id}`
  const { data: pokemon }: any = await useFetch(uri)
</script>
