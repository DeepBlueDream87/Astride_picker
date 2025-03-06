import { defineStore } from 'pinia'
import type { Character } from '../api/types/character'
import { characterService } from '../api/services/characterService'

interface CharacterState {
  characters: Character[]
  party: Character[]
  partyHistory: Character[][]
  isLoading: boolean
}

export const useCharacterStore = defineStore('character', {
  state: (): CharacterState => ({
    characters: [],
    party: [],
    partyHistory: [],
    isLoading: false,
  }),

  getters: {
    // 전체 캐릭터 목록
    getAllCharacters: (state) => state.characters,

    // 현재 파티
    getCurrentParty: (state) => state.party,

    // 파티 히스토리
    getPartyHistory: (state) => state.partyHistory,

    // 속성별 캐릭터 수
    getCharactersByAttribute: (state) => (attribute: string) => {
      return state.characters.filter((c) => c.attribute === attribute)
    },

    // 등급별 캐릭터 수
    getCharactersByRarity: (state) => (rarity: string) => {
      return state.characters.filter((c) => c.rarity === rarity)
    },
  },

  actions: {
    // 캐릭터 목록 초기화
    async initializeCharacters() {
      this.isLoading = true
      try {
        this.characters = await characterService.getCharacters()
      } catch (error) {
        console.error('캐릭터 데이터 로딩 실패:', error)
      } finally {
        this.isLoading = false
      }
    },

    // 파티 생성
    async generateParty() {
      this.isLoading = true
      try {
        const newParty = await characterService.generateParty()
        this.party = newParty
        // 파티 히스토리에 추가
        this.partyHistory.unshift(newParty)
        // 최대 10개까지만 저장
        if (this.partyHistory.length > 10) {
          this.partyHistory.pop()
        }
      } catch (error) {
        console.error('파티 생성 실패:', error)
      } finally {
        this.isLoading = false
      }
    },

    // 파티 초기화
    resetParty() {
      this.party = []
    },

    // 파티 히스토리 초기화
    resetPartyHistory() {
      this.partyHistory = []
    },
  },
})
