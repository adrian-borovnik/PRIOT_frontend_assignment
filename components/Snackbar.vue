<template>
  <v-snackbar
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', false)"
    timeout="2000"
    rounded="pill"
    :color="color"
    class="text-center"
  >
    <v-icon class="mr-2">{{ icon }}</v-icon>
    {{ message }}
  </v-snackbar>
</template>

<script setup lang="ts">
  import { IncomingMessage } from 'http'

  const { snackbarType, pokemonName } = defineProps<{
    snackbarType: 'success' | 'warning' | 'fail'
    pokemonName: string
    modelValue: boolean
  }>()

  defineEmits(['update:trigger'])

  const message = ref('')
  const color = ref('')
  const icon = ref('')

  switch (snackbarType) {
    case 'success':
      message.value = `You successfuly caught ${pokemonName}.`
      color.value = 'success'
      icon.value = 'check-circle-outline'
      break
    case 'warning':
      message.value = `${pokemonName} has escaped. Try again.`
      color.value = 'warning'
      icon.value = 'alert-outline'
      break
    case 'fail':
      message.value = `${pokemonName} ran away...`
      color.value = 'error'
      icon.value = 'close-octagon-outline'
      break
  }
</script>
