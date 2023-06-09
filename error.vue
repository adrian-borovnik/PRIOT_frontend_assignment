<template>
  <v-sheet class="d-flex flex-column align-center justify-center" height="50%">
    <h1>{{ error.statusCode }}</h1>
    <h2>Ooo oh...</h2>
    <p>There was an error...</p>
    <code>{{ error.message }}</code>

    <v-btn @click="handleError">Go back</v-btn>
  </v-sheet>
</template>

<script setup lang="ts">
  defineProps(['error'])

  const handleError = () => clearError({ redirect: '/' })
</script>
