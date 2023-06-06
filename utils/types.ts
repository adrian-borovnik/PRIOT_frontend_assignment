type PokemonResponse = {
  name: string
  stats: {
    base_stat: number
    stat: {
      name: string
    }
  }[]
  abilities: {
    ability: {
      name: string
    }
  }[]
  sprites: {
    front_default: string
  }
}

type PokemonModel = {
  id: number
  name: string
  stats: {
    hp: number
    attack: number
    defense: number
    speed: number
  }
  mainAbility: string
  img: string
}
