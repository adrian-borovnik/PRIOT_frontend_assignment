import { defineStore } from 'pinia'
export const useContextStore = defineStore('context', () => {
  const pokemons = ref([] as PokemonModel[])

  const pokemonNum = computed(() => pokemons.value.length)

  const addPokemon = (newPokemon: PokemonModel) => {
    pokemons.value = [...pokemons.value, newPokemon]
  }

  return { pokemons, addPokemon, pokemonNum }
})
