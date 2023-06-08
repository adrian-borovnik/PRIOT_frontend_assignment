<template>
  <h1>Hello world</h1>
  <p>You have {{ store.pokemonNum }} pokemon</p>

  <!-- <code>{{ pokemon }}</code> -->

  <p v-if="fetchError && !loading">There was an error</p>

  <v-container fluid class="d-flex justify-center">
    <v-sheet width="100%" max-width="600">
      <v-card class="d-flex pa-4" v-if="!fetchError">
        <v-img
          :src="pokemon.img"
          alt="Image of a pokemon"
          aspect-ratio="1"
          max-width="200"
        />
        <v-divider vertical class="mx-4"></v-divider>
        <v-sheet>
          <span>
            {{
              pokemon.name.toUpperCase()[0] +
              pokemon.name.replace('-', ' ').substring(1)
            }}
          </span>
          <!-- <v-list disabled>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon icon="mdi-heart" color="green"> </v-icon>
              </template>
              <v-list-item-title
                >Health points: {{ pokemon.stats.hp }}
              </v-list-item-title>
            </v-list-item>
          </v-list> -->
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
      <v-sheet class="d-flex justify-end pt-4">
        <v-btn
          @click="handleKeep"
          color="green"
          prepend-icon="mdi-pokeball"
          class="mr-2"
          >CATCH</v-btn
        >
        <v-btn @click="fetchData" color="blue" prepend-icon="mdi-magnify"
          >SEARCH</v-btn
        >
      </v-sheet>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
  import { useContextStore } from '../store/index'

  const store = useContextStore()
  const fetchError = ref(false)
  const loading = ref(false)

  const pokemon = ref({} as PokemonModel)

  const fetchData = async () => {
    loading.value = true
    try {
      const id = Math.floor(Math.random() * 1000)
      const uri = `https://pokeapi.co/api/v2/pokemon/${id}`
      const res = await fetch(uri)
      const rawData: PokemonResponse = await res.json()

      loading.value = false
      fetchError.value = false

      console.log(rawData)

      const pokemonData: PokemonModel = {
        id: Math.floor(Math.random() * 999999999),
        name: rawData.name,
        stats: {
          hp: rawData.stats[0]?.base_stat,
          attack: rawData.stats[1]?.base_stat,
          defense: rawData.stats[2]?.base_stat,
          speed: rawData.stats[5]?.base_stat,
        },
        mainAbility: rawData.abilities[0]?.ability.name,
        img: rawData.sprites.front_default,
      }

      pokemon.value = pokemonData
      console.log(pokemonData)
    } catch (e) {
      loading.value = false
      fetchError.value = true
    }

    // const { data } = await useFetch(
    //   () => {
    //     const id = Math.floor(Math.random() * 1000)
    //     return `https://pokeapi.co/api/v2/pokemon/${id}`
    //   },
    //   {
    //     transform: (pokemon: any) => {
    //       return {
    //         name: pokemon.name,
    //         stats: pokemon.stats,
    //         abilities: pokemon.abilities,
    //         sprites: pokemon.sprites.front_default,
    //       } as PokemonResponse
    //     },
    //   }
    // )
  }

  await fetchData()

  const handleKeep = async () => {
    // const tempPokemon: PokemonModel = {
    //   id: Math.floor(Math.random() * 999999999), // idealy would be using uuid
    //   name: pokemon.value.name,
    //   stats: {
    //     hp: pokemon.value.stats[0].base_stat,
    //     attack: pokemon.value.stats[1].base_stat,
    //     defense: pokemon.value.stats[2].base_stat,
    //     speed: pokemon.value.stats[3].base_stat,
    //   },
    //   mainAbility: pokemon.value.abilities[0].ability.name,
    //   img: pokemon.value.sprites.front_default,
    // }

    if (pokemon.value) store.addPokemon(pokemon.value)
    await fetchData()
  }
</script>
