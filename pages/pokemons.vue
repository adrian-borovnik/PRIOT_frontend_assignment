<template>
  <!-- TEMPLATE CODE GOES HERE -->

  <button @click="handleAddPokemon">Add Pokemon</button>

  <div>You catched {{ store.pokemonNum }} pokemons</div>

  <v-container>
    <v-row>
      <v-col cols="4" v-for="p in store.pokemons">
        <!-- <PokemonCard :pokemon="p" @remove="handleRemovePokemon(p.id)" /> -->

        <v-card :title="p.name" :subtitle="`${p.id}`">
          <img :src="p.img" :alt="`Picture of ${p.name}`" />
          <v-card-actions>
            <button @click="handleRemovePokemon(p.id)">Delete</button>
          </v-card-actions>
        </v-card>

        <!--  -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { useContextStore } from '../store/index'

  const store = useContextStore()

  const handleAddPokemon = () => {
    const pokemon: PokemonModel = {
      id: Math.floor(Math.random() * 999999999), // idealy would be using uuid
      name: 'Ditto',
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
