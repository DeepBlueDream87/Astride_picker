<template>
  <div class="team-builder">
    <h2 class="title">랜덤 팀 빌더</h2>
    
    <div class="controls">
      <div class="buttons">
        <button @click="resetTeam" class="reset-btn" :disabled="selectedTeam.length === 0">
          초기화
        </button>
        <button @click="generateTeam" class="generate-btn">
          3인 팀 생성하기
        </button>
      </div>
    </div>

    <div v-if="selectedTeam.length > 0" class="team-result">
      <h3>생성된 팀</h3>
      <transition-group 
        name="character-slide" 
        tag="div" 
        class="character-grid"
      >
        <CharacterCard
          v-for="character in selectedTeam"
          :key="character.id"
          :character="character"
        />
      </transition-group>
      
      <div class="team-stats">
        <h4>팀 구성</h4>
        <ul>
          <li>
            <span>역할군:</span>
            {{ roleDistribution }}
          </li>
          <li>
            <span>속성:</span>
            {{ elementDistribution }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCharacterStore } from '@/stores/characterStore';
import CharacterCard from './CharacterCard.vue';
import type { Character } from '@/types/character';

const store = useCharacterStore();
const selectedTeam = ref<Character[]>([]);

// 역할군 분포 계산
const roleDistribution = computed(() => {
  if (selectedTeam.value.length === 0) return '';
  
  const distribution = selectedTeam.value.reduce((acc, char) => {
    acc[char.type] = (acc[char.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(distribution)
    .map(([type, count]) => `${type} ${count}명`)
    .join(', ');
});

// 속성 분포 계산
const elementDistribution = computed(() => {
  if (selectedTeam.value.length === 0) return '';
  
  const distribution = selectedTeam.value.reduce((acc, char) => {
    acc[char.element] = (acc[char.element] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(distribution)
    .map(([element, count]) => `${element} ${count}명`)
    .join(', ');
});

// 팀 생성 로직
const generateTeam = () => {
  // 사용 가능한 캐릭터 목록 (필터링된 상태 반영)
  const availableCharacters = [...store.filteredCharacters];
  
  // 캐릭터가 3명 미만이면 생성하지 않음
  if (availableCharacters.length < 3) {
    return;
  }

  // Fisher-Yates 셔플 알고리즘으로 배열을 섞음
  for (let i = availableCharacters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableCharacters[i], availableCharacters[j]] = [availableCharacters[j], availableCharacters[i]];
  }
  
  // 앞에서부터 3명 선택
  selectedTeam.value = availableCharacters.slice(0, 3);
};

// 초기화 로직
const resetTeam = () => {
  selectedTeam.value = [];
};
</script>

<style scoped>
.team-builder {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary-color);
  font-weight: 600;
  letter-spacing: -0.02em;
}

.controls {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
}

.buttons {
  display: flex;
  gap: 0.5rem;
}

.generate-btn,
.reset-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.generate-btn {
  background: var(--primary-color);
  color: white;
  font-weight: 500;
  min-width: 140px;
}

.generate-btn:hover {
  background: var(--primary-dark-color);
}

.reset-btn {
  background: #f5f5f5;
  color: var(--text-color);
  border: 1px solid #ddd;
  font-weight: 500;
  min-width: 100px;
}

.reset-btn:hover:not(:disabled) {
  background: #e5e5e5;
  border-color: #ccc;
}

.reset-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: #999;
}

.team-result {
  margin-top: 2rem;
}

.team-result h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.character-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 2rem;
  direction: rtl;
}

.character-grid > * {
  direction: ltr;
}

/* 캐릭터 슬라이드 애니메이션 */
.character-slide-enter-active {
  transition: all 0.5s ease-out;
}

.character-slide-leave-active {
  transition: all 0.5s ease-in;
}

.character-slide-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.character-slide-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.character-slide-move {
  transition: transform 0.5s;
}

.team-stats {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
}

.team-stats h4 {
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.team-stats ul {
  list-style: none;
  padding: 0;
}

.team-stats li {
  margin-bottom: 0.5rem;
}

.team-stats li span {
  font-weight: 600;
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .character-grid {
    grid-template-columns: 1fr;
  }
}
</style> 