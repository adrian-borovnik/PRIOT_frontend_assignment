<template>
  <v-card class="pa-4 d-flex flex-column align-center">
    <NuxtLink :to="`/pokemons/${pokemon.name}`">
      <v-tooltip text="Click for more details" location="top">
        <template v-slot:activator="{ props }">
          <v-img
            v-bind="props"
            :src="pokemon.img"
            :alt="`Picture of ${pokemon.name}`"
            width="200"
            aspect-ratio="1"
          />
        </template>
      </v-tooltip>
    </NuxtLink>

    <v-sheet class="d-flex align-center text-h6" width="100%">
      <p>
        {{ pokemonName }}
      </p>
      <v-spacer></v-spacer>
      <v-tooltip :text="`Delete ${pokemonName}`" location="top">
        <template v-slot:activator="{ props }">
          <v-btn
            color="red"
            fab
            icon="mdi-delete"
            v-bind="props"
            @click="handleRemovePokemon(pokemon.id)"
          ></v-btn>
        </template>
      </v-tooltip>
    </v-sheet>
  </v-card>
</template>

<script setup lang="ts">
  import { useContextStore } from '../store/index'

  const store = useContextStore()

  const { pokemon } = defineProps<{
    pokemon: PokemonModel
  }>()

  const pokemonName = computed(
    () =>
      pokemon.name.toUpperCase()[0] +
      pokemon.name.replace('-', ' ').substring(1)
  )

  const handleRemovePokemon = (id: number) => {
    store.removePokemon(id)
  }
</script>
