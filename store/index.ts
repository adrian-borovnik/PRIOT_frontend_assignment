import { defineStore } from 'pinia'
export const useContextStore = defineStore('context', () => {
  const pokemons = ref([] as PokemonModel[])

  const pokemonNum = computed(() => pokemons.value.length)

  const addPokemon = (newPokemon: PokemonModel) => {
    pokemons.value = [...pokemons.value, newPokemon]
  }

  const removePokemon = (id: number) => {
    const temp = pokemons.value.filter((p) => p.id !== id)
    pokemons.value = temp
  }

  return { pokemons, addPokemon, removePokemon, pokemonNum }
})
