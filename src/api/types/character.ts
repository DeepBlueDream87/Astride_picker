export type CharacterRarity = 'SSR' | 'SR' | 'R' | 'N'
export type CharacterAttribute = 'Fire' | 'Water' | 'Earth' | 'Wind' | 'Light' | 'Dark'

export interface Character {
  id: string
  name: string
  rarity: CharacterRarity
  attribute: CharacterAttribute
  imageUrl: string
  description: string
  stats: {
    attack: number
    defense: number
    hp: number
    speed: number
  }
  skills: {
    name: string
    description: string
    cooldown: number
  }[]
}

export interface PickupRate {
  rarity: CharacterRarity
  rate: number
}

export interface PickupHistory {
  id: string
  characterId: string
  timestamp: Date
  rarity: CharacterRarity
}
