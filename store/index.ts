import { defineStore } from 'pinia'
export const useContextStore = defineStore('context', () => {
  const pokemons = ref([] as PokemonModel[])

  const pokemonNum = computed(() => pokemons.value.length)

  const addPokemon = (newPokemon: PokemonModel) => {
    pokemons.value = [newPokemon, ...pokemons.value]
    localStorage.setItem('pokemons', JSON.stringify(pokemons.value))
  }

  const removePokemon = (id: number) => {
    pokemons.value = pokemons.value.filter((p) => p.id !== id)
    localStorage.setItem('pokemons', JSON.stringify(pokemons.value))
  }

  return { pokemons, addPokemon, removePokemon, pokemonNum }
})
