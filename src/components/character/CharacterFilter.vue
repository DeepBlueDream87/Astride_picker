<template>
  <div class="character-filter">
    <div class="search-section">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="캐릭터 이름 검색..."
        @input="updateSearchQuery"
      />
    </div>

    <div class="filter-section">
      <h3>진영 필터</h3>
      <select v-model="selectedFaction" @change="updateFactionFilter">
        <option :value="null">전체 진영</option>
        <option v-for="faction in factions" :key="faction" :value="faction">
          {{ faction }}
        </option>
      </select>
    </div>

    <div class="filter-section">
      <h3>타입 필터</h3>
      <select v-model="selectedType" @change="updateTypeFilter">
        <option :value="null">전체 타입</option>
        <option v-for="type in types" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
    </div>

    <div class="filter-section">
      <h3>속성 필터</h3>
      <select v-model="selectedElement" @change="updateElementFilter">
        <option :value="null">전체 속성</option>
        <option v-for="element in elements" :key="element" :value="element">
          {{ element }}
        </option>
      </select>
    </div>

    <button class="reset-button" @click="resetAllFilters">
      필터 초기화
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCharacterStore } from '@/stores/characterStore';
import type { Faction, CharacterType, ElementType } from '@/types/character';

const store = useCharacterStore();

const searchQuery = ref('');
const selectedFaction = ref<Faction | null>(null);
const selectedType = ref<CharacterType | null>(null);
const selectedElement = ref<ElementType | null>(null);

const factions = computed(() => store.factions);
const types = computed(() => store.types);
const elements = computed(() => store.elements);

// 필터 업데이트 함수들
const updateSearchQuery = () => {
  store.setSearchQuery(searchQuery.value);
};

const updateFactionFilter = () => {
  store.setFactionFilter(selectedFaction.value);
};

const updateTypeFilter = () => {
  store.setTypeFilter(selectedType.value);
};

const updateElementFilter = () => {
  store.setElementFilter(selectedElement.value);
};

// 필터 초기화
const resetAllFilters = () => {
  searchQuery.value = '';
  selectedFaction.value = null;
  selectedType.value = null;
  selectedElement.value = null;
  store.resetFilters();
};
</script>

<style scoped>
.character-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.search-section {
  flex: 1 1 100%;
  margin-bottom: 0.5rem;
}

.search-section input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1rem;
}

.filter-section {
  flex: 1;
  min-width: 200px;
}

select {
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
}

h3 {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
}

.reset-button {
  padding: 0.5rem 1rem;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-end;
}

.reset-button:hover {
  background-color: #d32f2f;
}

@media (max-width: 768px) {
  .filter-section {
    flex: 1 1 100%;
  }
  
  .reset-button {
    width: 100%;
    margin-top: 0.5rem;
  }
}
</style> 