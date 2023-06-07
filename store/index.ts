import { defineStore } from 'pinia'
export const useContextStore = defineStore('context', () => {
  const pokemons = ref([] as PokemonModel[])

  const pokemonNum = computed(() => pokemons.value.length)

  const addPokemon = (newPokemon: PokemonModel) => {
    pokemons.value = [...pokemons.value, newPokemon]
  }

  const removePokemon = (id: number) => {
    pokemons.value = pokemons.value.filter((p) => p.id !== id)
  }

  return { pokemons, addPokemon, removePokemon, pokemonNum }
})
