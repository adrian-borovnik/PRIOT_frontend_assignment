<template>
  <v-card :title="name" :subtitle="id">
    <img :src="img" :alt="`Picture of ${name}`" />
    <v-card-actions>
      <!-- TODO update the UI on delete -->
      <button @click="$emit('remove')">Delete</button>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
  import { useContextStore } from '../store/index'

  const store = useContextStore()

  const { pokemon } = defineProps(['pokemon'])
  const { id, name, stats, mainAbility, img } = pokemon
</script>
