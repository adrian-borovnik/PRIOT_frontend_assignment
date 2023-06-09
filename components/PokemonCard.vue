<template>
  <v-card class="pa-4 d-flex flex-column align-center">
    <NuxtLink :to="`/pokemons/${pokemon.name}`">
      <v-img
        :src="pokemon.img"
        :alt="`Picture of ${pokemon.name}`"
        width="200"
        aspect-ratio="1"
      />
    </NuxtLink>

    <v-sheet class="d-flex align-center" width="100%">
      <p>
        {{
          pokemon.name.toUpperCase()[0] +
          pokemon.name.replace('-', ' ').substring(1)
        }}
      </p>
      <v-spacer></v-spacer>
      <v-btn
        color="red"
        fab
        icon="mdi-delete"
        @click="handleRemovePokemon(pokemon.id)"
      ></v-btn>
    </v-sheet>
  </v-card>
</template>

<script setup lang="ts">
  import { useContextStore } from '../store/index'

  const store = useContextStore()

  const { pokemon } = defineProps(['pokemon'])

  const handleRemovePokemon = (id: number) => {
    store.removePokemon(id)
  }
</script>
