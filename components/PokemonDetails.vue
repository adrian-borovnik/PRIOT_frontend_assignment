<template>
  <v-card class="pa-8">
    <p class="text-h3 mb-8 text-center">
      {{ pokemonName }}
    </p>

    <v-row class="d-flex justify-center">
      <v-col>
        <v-img
          :src="pokemon.sprites.front_default"
          alt="Image of a pokemon"
          aspect-ratio="1"
          max-width="200"
          class="mr-4"
        />
        <v-img
          v-if="pokemon.sprites.back_default"
          :src="pokemon.sprites.back_default"
          alt="Image of a pokemon"
          aspect-ratio="1"
          max-width="200"
          class="mr-4"
        />
      </v-col>
      <v-divider vertical class="mx-4"></v-divider>

      <v-col class="px-4">
        <p class="text-h5 mb-6">Size</p>
        <div class="d-flex mt-2">
          <v-icon icon="mdi-ruler" color="orange mr-2"> </v-icon>
          <p>Weight: {{ pokemon.weight }}</p>
        </div>
        <div class="d-flex mt-2">
          <v-icon icon="mdi-ruler" color="orange mr-2"> </v-icon>
          <p>Height: {{ pokemon.height }}</p>
        </div>
      </v-col>

      <v-divider vertical class="mx-4"></v-divider>

      <v-col class="px-4">
        <p class="text-h5 mb-6">Abilities</p>
        <div class="d-flex mt-2" v-for="ability in pokemon.abilities">
          <v-icon icon="mdi-atom" color="blue mr-2"> </v-icon>
          <p>{{ ability.ability.name.replace('-', ' ') }}</p>
        </div>
      </v-col>

      <v-divider vertical class="mx-4"></v-divider>

      <v-col class="px-4">
        <p class="text-h5 mb-6">Stats</p>
        <div class="d-flex mt-2" v-for="stat in pokemon.stats">
          <v-icon icon="mdi-equalizer" color="green mr-2"> </v-icon>
          <p>{{ stat.stat.name.replace('-', ' ') }}: {{ stat.base_stat }}</p>
        </div>
      </v-col>

      <v-divider vertical class="mx-4"></v-divider>

      <v-col class="px-4">
        <p class="text-h5 mb-6">Types</p>
        <div class="d-flex mt-2" v-for="_type in pokemon.types">
          <v-icon icon="mdi-flare" color="purple mr-2"> </v-icon>
          <p>{{ _type.type.name.replace('-', ' ') }}</p>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
  const { pokemon } = defineProps(['pokemon']) // TODOO

  const pokemonName = computed(
    () =>
      pokemon.name.toUpperCase()[0] +
      pokemon.name.replace('-', ' ').substring(1)
  )
</script>
