<template>
  <div class="character-list-container">
    <CharacterFilter />
    
    <div v-if="filteredCharacters.length === 0" class="no-results">
      <p>검색 결과가 없습니다.</p>
    </div>

    <!-- 역할군이나 속성 필터가 선택된 경우 -->
    <div v-else-if="store.selectedType || store.selectedElement" class="single-grid-section">
      <h2 class="filter-title">
        <template v-if="store.selectedType">
          <img 
            :src="`/images/professions/${getProfessionImageName(store.selectedType)}.webp`" 
            :alt="store.selectedType"
            class="profession-icon"
          >
          {{ store.selectedType }}
        </template>
        <template v-else-if="store.selectedElement">
          <img 
            :src="`/images/elements/${getElementImageName(store.selectedElement).name}.${getElementImageName(store.selectedElement).ext}`" 
            :alt="store.selectedElement"
            class="element-icon"
          >
          {{ store.selectedElement }}
        </template>
      </h2>
      <div class="character-grid">
        <template v-for="character in filteredCharacters" :key="character.id">
          <CharacterCard
            :character="character"
          />
        </template>
      </div>
    </div>

    <!-- 진영별 그룹핑 (역할군/속성 필터가 없을 때) -->
    <div v-else class="factions-container">
      <div v-for="(characters, faction) in groupedCharacters" 
           :key="faction" 
           class="faction-section"
           v-show="characters.length > 0">
        <h2 class="faction-title">{{ faction }}</h2>
        <div class="character-grid">
          <CharacterCard
            v-for="character in characters"
            :key="character.id"
            :character="character"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useCharacterStore } from '@/stores/characterStore';
import CharacterFilter from './CharacterFilter.vue';
import CharacterCard from './CharacterCard.vue';
import { charactersData } from '@/data/characters';
import type { Character } from '@/types/character';

const store = useCharacterStore();

// 필터링된 캐릭터 (역할군/속성 필터용)
const filteredCharacters = computed(() => {
  let result = store.filteredCharacters;
  
  // 검색어로 필터링
  if (store.searchQuery.trim()) {
    const query = store.searchQuery.toLowerCase().trim();
    result = result.filter(char => 
      char.name.toLowerCase().includes(query)
    );
  }
  
  // 역할군으로 필터링
  if (store.selectedType) {
    result = result.filter(char => char.type === store.selectedType);
  }
  
  // 속성으로 필터링
  if (store.selectedElement) {
    result = result.filter(char => char.element === store.selectedElement);
  }
  
  // 등급으로 정렬 (S > A)
  const sRank = result.filter(char => char.grade === 'S').sort((a, b) => a.name.localeCompare(b.name, 'ko'));
  const aRank = result.filter(char => char.grade === 'A').sort((a, b) => a.name.localeCompare(b.name, 'ko'));
  return [...sRank, ...aRank];
});

// 진영별로 캐릭터 그룹화 (진영별 보기용)
const groupedCharacters = computed(() => {
  const groups: { [key: string]: Character[] } = {};
  let characters = store.filteredCharacters;
  
  // 검색어로 필터링
  if (store.searchQuery.trim()) {
    const query = store.searchQuery.toLowerCase().trim();
    characters = characters.filter(char => 
      char.name.toLowerCase().includes(query)
    );
  }
  
  // 먼저 모든 진영을 초기화
  const allFactions = [...new Set(charactersData.map(char => char.faction))];
  allFactions.forEach(faction => {
    groups[faction] = [];
  });
  
  // 캐릭터들을 각 진영에 할당
  characters.forEach(character => {
    groups[character.faction].push(character);
  });

  // 각 진영 내에서 등급순으로 정렬
  Object.keys(groups).forEach(faction => {
    const sRank = groups[faction].filter(char => char.grade === 'S').sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    const aRank = groups[faction].filter(char => char.grade === 'A').sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    groups[faction] = [...sRank, ...aRank];
  });

  // 진영 이름으로 정렬
  return Object.keys(groups)
    .sort()
    .reduce((sorted: { [key: string]: Character[] }, faction) => {
      sorted[faction] = groups[faction];
      return sorted;
    }, {});
});

// 속성 한글명을 영문 파일명으로 매핑
const getElementImageName = (element: string): { name: string; ext: string } => {
  const elementMap: { [key: string]: { name: string; ext: string } } = {
    '물리': { name: 'Physical', ext: 'png' },
    '불': { name: 'Fire', ext: 'png' },
    '얼음': { name: 'Ice', ext: 'png' },
    '전기': { name: 'Electric', ext: 'png' },
    '에테르': { name: 'Ether', ext: 'png' },
    '서리': { name: 'Frost', ext: 'webp' }
  };
  const result = elementMap[element] || { name: element, ext: 'png' };
  console.log('Element mapping:', element, result); // 디버깅을 위한 로그 추가
  return result;
};

// 역할군 한글명을 영문 파일명으로 매핑
const getProfessionImageName = (profession: string): string => {
  const professionMap: { [key: string]: string } = {
    '강공': 'Attack',
    '이상': 'Abnormal',
    '방어': 'Defense',
    '지원': 'Support',
    '격파': 'Destruction'
  };
  return professionMap[profession] || profession;
};

onMounted(() => {
  store.initializeCharacters(charactersData);
});
</script>

<style scoped>
.character-list-container {
  padding: 1rem;
}

.factions-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.faction-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.faction-title {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary-color);
  font-weight: 600;
  letter-spacing: -0.02em;
}

.character-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(4, 1fr);
  justify-items: start;
}

/* 4개 초과 시에도 4열 유지 */
.character-grid.wrap-grid {
  grid-template-columns: repeat(4, 1fr);
}

.no-results {
  text-align: center;
  padding: 2rem;
  background: #f5f5f5;
  border-radius: 8px;
  margin-top: 1rem;
}

.no-results p {
  font-size: 1.2rem;
  color: #666;
}

@media (max-width: 1200px) {
  .character-grid,
  .character-grid.wrap-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .character-grid,
  .character-grid.wrap-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .character-grid,
  .character-grid.wrap-grid {
    grid-template-columns: 1fr;
  }
}

.single-grid-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filter-title {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary-color);
  font-weight: 600;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.element-icon,
.profession-icon {
  width: 1.5rem;
  height: 1.5rem;
  object-fit: contain;
}
</style> 