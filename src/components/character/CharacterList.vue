<template>
  <div class="character-list-container">
    <CharacterFilter />
    
    <div class="character-grid">
      <CharacterCard
        v-for="character in filteredCharacters"
        :key="character.id"
        :character="character"
      />
    </div>
    
    <div v-if="filteredCharacters.length === 0" class="no-results">
      <p>검색 결과가 없습니다.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useCharacterStore } from '@/stores/characterStore';
import CharacterFilter from './CharacterFilter.vue';
import CharacterCard from './CharacterCard.vue';
import { charactersData } from '@/data/characters';

const store = useCharacterStore();
const filteredCharacters = computed(() => store.filteredCharacters);

onMounted(() => {
  store.initializeCharacters(charactersData);
});
</script>

<style scoped>
.character-list-container {
  padding: 1rem;
}

.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
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

@media (max-width: 768px) {
  .character-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style> 