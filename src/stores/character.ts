import { defineStore } from 'pinia'

interface CharacterStats {
  hp: number
  atk: number
  def: number
  spd: number
}

interface Character {
  id: number
  name: string
  rarity: string
  attribute: string
  image: string
  stats: CharacterStats
  position: string
}

interface Party {
  id: number
  members: Character[]
  createdAt: string
}

export const useCharacterStore = defineStore('character', {
  state: () => ({
    characters: [] as Character[],
    currentParty: [] as Character[],
    partyHistory: [] as Party[],
    isLoading: false,
  }),

  actions: {
    async fetchCharacters() {
      this.isLoading = true
      try {
        // TODO: API 연동 후 실제 데이터로 교체
        this.characters = [
          {
            id: 1,
            name: '테스트 캐릭터 1',
            rarity: 'SSR',
            attribute: '불',
            image: 'https://via.placeholder.com/200x300',
            stats: { hp: 1000, atk: 100, def: 50, spd: 80 },
            position: '탱크',
          },
          {
            id: 2,
            name: '테스트 캐릭터 2',
            rarity: 'SR',
            attribute: '물',
            image: 'https://via.placeholder.com/200x300',
            stats: { hp: 800, atk: 80, def: 40, spd: 90 },
            position: '딜러',
          },
          {
            id: 3,
            name: '테스트 캐릭터 3',
            rarity: 'R',
            attribute: '바람',
            image: 'https://via.placeholder.com/200x300',
            stats: { hp: 600, atk: 60, def: 30, spd: 100 },
            position: '딜러',
          },
          {
            id: 4,
            name: '테스트 캐릭터 4',
            rarity: 'N',
            attribute: '땅',
            image: 'https://via.placeholder.com/200x300',
            stats: { hp: 400, atk: 40, def: 20, spd: 70 },
            position: '서포터',
          },
        ]
      } catch (error) {
        console.error('캐릭터 데이터 로딩 실패:', error)
      } finally {
        this.isLoading = false
      }
    },

    async generateParty() {
      this.isLoading = true
      try {
        // TODO: 실제 파티 생성 로직 구현
        const newParty = {
          id: Date.now(),
          members: this.characters.slice(0, 4),
          createdAt: new Date().toISOString(),
        }
        this.currentParty = newParty.members
        this.partyHistory.unshift(newParty)
      } catch (error) {
        console.error('파티 생성 실패:', error)
      } finally {
        this.isLoading = false
      }
    },
  },
})
