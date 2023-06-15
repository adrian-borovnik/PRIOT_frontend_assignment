<template>
  <v-snackbar
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', false)"
    timeout="2000"
    rounded="pill"
    :color="snackbarType"
    class="text-center"
  >
    <v-icon class="mr-2" v-if="icon">mdi-{{ icon }}</v-icon>
    {{ message }}
  </v-snackbar>
</template>

<script setup lang="ts">
  const { snackbarType, message } = defineProps<{
    snackbarType: SnackbarType
    message: string
    modelValue: boolean
    icon?: string
  }>()

  defineEmits(['update:trigger'])

  const icon = ref('')
</script>
