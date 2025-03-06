<template>
  <div class="party-generator">
    <div class="generator-header">
      <h2>랜덤 파티 생성기</h2>
      <p class="description">최적의 파티 조합을 자동으로 생성해드립니다.</p>
      <div class="rules">
        <h3>파티 생성 규칙</h3>
        <ul>
          <li>파티는 4명의 캐릭터로 구성됩니다.</li>
          <li>각 포지션(탱크, 딜러, 서포터)은 최소 1명 이상 포함됩니다.</li>
          <li>속성과 등급은 무작위로 선택됩니다.</li>
        </ul>
      </div>
    </div>

    <div class="generator-controls">
      <button class="generate-button" @click="generateParty" :disabled="isLoading">
        {{ isLoading ? '생성 중...' : '파티 생성하기' }}
      </button>
    </div>

    <div v-if="isLoading" class="generating-animation">
      <div class="loading-spinner"></div>
      <p>최적의 파티를 생성하고 있습니다...</p>
    </div>

    <div v-else-if="currentParty.length > 0" class="party-members">
      <div
        v-for="(character, index) in currentParty"
        :key="character.id"
        class="character-card-wrapper"
      >
        <span class="position-badge">{{ getPositionName(index) }}</span>
        <CharacterCard :character="character" />
      </div>
    </div>

    <PartyHistory />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useCharacterStore } from '@/stores/character'
import CharacterCard from './CharacterCard.vue'
import PartyHistory from './PartyHistory.vue'

const store = useCharacterStore()
const currentParty = computed(() => store.currentParty)
const isLoading = computed(() => store.isLoading)

const getPositionName = (index: number) => {
  const positions = ['탱크', '딜러', '딜러', '서포터']
  return positions[index]
}

const generateParty = async () => {
  await store.generateParty()
}

onMounted(async () => {
  await store.fetchCharacters()
})
</script>

<style scoped>
.party-generator {
  padding: 2rem;
  background: var(--surface-color);
  border-radius: 12px;
  box-shadow: var(--shadow);
}

.generator-header {
  margin-bottom: 2rem;
  text-align: center;
}

.description {
  color: var(--text-secondary);
  margin: 1rem 0;
}

.rules {
  margin-top: 2rem;
  padding: 1rem;
  background: var(--background-color);
  border-radius: 8px;
}

.rules h3 {
  margin: 0 0 1rem;
  color: var(--text-color);
}

.rules ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.rules li {
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.rules li:last-child {
  margin-bottom: 0;
}

.generator-controls {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.generate-button {
  padding: 1rem 3rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  background: var(--gradient-primary);
  color: white;
  cursor: pointer;
  transition: var(--transition-normal);
}

.generate-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.generate-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

.generating-animation {
  text-align: center;
  padding: 2rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 1rem;
  border: 4px solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.party-members {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.character-card-wrapper {
  position: relative;
}

.position-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--primary-color);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  z-index: 1;
}

.character-card {
  background: var(--background-color);
  border-radius: 12px;
  overflow: hidden;
  transition: var(--transition-normal);
  border: 2px solid transparent;
}

.character-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
}

.character-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.character-info {
  padding: 1rem;
}

.character-info h3 {
  margin: 0 0 0.5rem;
  color: var(--text-color);
}

.rarity-badge,
.attribute-badge {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
}

.stats {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem;
  background: var(--surface-color);
  border-radius: 4px;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.stat-value {
  color: var(--text-color);
  font-weight: bold;
}

.ssr {
  border-color: #ffd700;
}
.sr {
  border-color: #c0c0c0;
}
.r {
  border-color: #cd7f32;
}
.n {
  border-color: #808080;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
