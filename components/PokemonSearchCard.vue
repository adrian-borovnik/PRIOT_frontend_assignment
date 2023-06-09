<template>
  <v-card class="d-flex pa-4">
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
</template>

<script setup lang="ts">
  defineProps(['pokemon'])
</script>
