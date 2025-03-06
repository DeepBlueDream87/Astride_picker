import { defineStore } from 'pinia';
import type { Character, Faction, CharacterType, ElementType } from '@/types/character';

export const useCharacterStore = defineStore('character', {
  state: () => ({
    characters: [] as Character[],
    selectedFaction: null as Faction | null,
    selectedType: null as CharacterType | null,
    selectedElement: null as ElementType | null,
    searchQuery: '' as string
  }),

  getters: {
    // 진영별로 필터링된 캐릭터
    filteredCharacters: (state) => {
      let result = state.characters;
      
      // 검색어로 필터링
      if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase().trim();
        result = result.filter(char => 
          char.name.toLowerCase().includes(query)
        );
      }
      
      // 진영으로 필터링
      if (state.selectedFaction) {
        result = result.filter(char => char.faction === state.selectedFaction);
      }
      
      // 타입으로 필터링
      if (state.selectedType) {
        result = result.filter(char => char.type === state.selectedType);
      }
      
      // 속성으로 필터링
      if (state.selectedElement) {
        result = result.filter(char => char.element === state.selectedElement);
      }
      
      return result;
    },

    // 진영 목록
    factions: (state) => {
      return [...new Set(state.characters.map(char => char.faction))].sort();
    },
    
    // 타입 목록
    types: () => {
      return ['강공', '격파', '방어', '지원', '이상'] as CharacterType[];
    },
    
    // 속성 목록
    elements: () => {
      return ['물리', '전기', '에테르', '불', '얼음', '서릿불'] as ElementType[];
    }
  },

  actions: {
    // 캐릭터 데이터 초기화
    initializeCharacters(characters: Character[]) {
      this.characters = characters;
    },
    
    // 필터 설정
    setFactionFilter(faction: Faction | null) {
      this.selectedFaction = faction;
    },
    
    setTypeFilter(type: CharacterType | null) {
      this.selectedType = type;
    },
    
    setElementFilter(element: ElementType | null) {
      this.selectedElement = element;
    },
    
    // 검색어 설정
    setSearchQuery(query: string) {
      this.searchQuery = query;
    },
    
    // 모든 필터 초기화
    resetFilters() {
      this.selectedFaction = null;
      this.selectedType = null;
      this.selectedElement = null;
      this.searchQuery = '';
    }
  },
}); 