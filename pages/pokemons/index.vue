<template>
  <!-- TEMPLATE CODE GOES HERE -->

  <v-btn @click="handleAddPokemon">Add Ditto</v-btn>

  <div>You catched {{ store.pokemonNum }} pokemons</div>

  <v-row>
    <v-col cols="3" v-for="p in store.pokemons">
      <!-- <PokemonCard :pokemon="p" @remove="handleRemovePokemon(p.id)" /> -->

      <v-card class="pa-4 d-flex flex-column align-center">
        <NuxtLink :to="`/pokemons/${p.name}`">
          <v-img
            :src="p.img"
            :alt="`Picture of ${p.name}`"
            width="200"
            aspect-ratio="1"
          />
        </NuxtLink>

        <v-sheet class="d-flex align-center" width="100%">
          <p>
            {{
              p.name.toUpperCase()[0] + p.name.replace('-', ' ').substring(1)
            }}
          </p>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            fab
            icon="mdi-delete"
            @click="handleRemovePokemon(p.id)"
          ></v-btn>
        </v-sheet>
      </v-card>

      <!--  -->
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import { useContextStore } from '../../store/index'

  const store = useContextStore()

  const pokemonsLocal = localStorage.getItem('pokemons') || '[]'
  store.pokemons = JSON.parse(pokemonsLocal)

  const handleAddPokemon = () => {
    const pokemon: PokemonModel = {
      id: Math.floor(Math.random() * 999999999), // idealy would be using uuid
      name: 'ditto',
      stats: {
        hp: 48,
        attack: 48,
        defense: 48,
        speed: 48,
      },
      mainAbility: 'limber',
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png',
    }

    store.addPokemon(pokemon)
  }

  // TODO update the UI on delete
  const handleRemovePokemon = (id: number) => {
    store.removePokemon(id)
  }
</script>
