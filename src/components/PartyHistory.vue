<template>
  <div class="party-history">
    <div class="history-header">
      <h2 class="history-title">파티 히스토리</h2>
    </div>
    <div class="history-list">
      <div v-for="party in partyHistory" :key="party.id" class="history-item">
        <div class="history-meta">
          <span class="history-date">{{ formatDate(party.createdAt) }}</span>
        </div>
        <div class="history-party">
          <div v-for="member in party.members" :key="member.id" class="history-character">
            <img :src="member.image" :alt="member.name" />
            <div class="rarity-badge">{{ member.rarity }}</div>
            <div class="position-badge">{{ member.position }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCharacterStore } from '@/stores/character'

const store = useCharacterStore()
const partyHistory = computed(() => store.partyHistory)

const formatDate = (date: string) => {
  return new Date(date).toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
.party-history {
  margin-top: 2rem;
  padding: 1rem;
  background: var(--background-color);
  border-radius: 8px;
}

.party-history h3 {
  margin: 0 0 1rem;
  color: var(--text-color);
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
  background: var(--surface-color);
  border-radius: 8px;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.history-item {
  background: var(--surface-color);
  border-radius: 8px;
  padding: 1rem;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.party-members {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.5rem 0;
}

.character-mini-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--background-color);
  border-radius: 8px;
  min-width: 200px;
  border: 1px solid var(--border-color);
}

.character-mini-card img {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  object-fit: cover;
}

.character-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.character-name {
  font-weight: 500;
  color: var(--text-color);
}

.character-badges {
  display: flex;
  gap: 0.3rem;
}

.rarity-badge,
.attribute-badge {
  font-size: 0.7rem;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
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
</style>
