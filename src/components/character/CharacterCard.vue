<template>
  <div class="character-card" :class="character.grade.toLowerCase()">
    <div class="character-image">
      <img 
        :src="characterImagePath" 
        :alt="character.name"
        @error="handleImageError"
      >
    </div>
    <div class="character-info">
      <h3>{{ character.name }}</h3>
      <div class="character-details">
        <span class="faction">{{ character.faction }}</span>
        <span class="type">{{ character.type }}</span>
        <span class="element">{{ character.element }}</span>
        <span class="grade">{{ character.grade }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Character } from '@/types/character';
import { getCharacterImagePath } from '@/utils/imageUtils';

const props = defineProps<{
  character: Character;
}>();

const hasImageError = ref(false);

const characterImagePath = computed(() => {
  if (hasImageError.value) {
    return '/images/characters/default.png'; // 기본 이미지
  }
  return getCharacterImagePath(props.character.imageFileName);
});

const handleImageError = () => {
  hasImageError.value = true;
};
</script>

<style scoped>
.character-card {
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.character-card:hover {
  transform: translateY(-2px);
}

.character-card.s {
  border: 2px solid #FFD700;
}

.character-card.a {
  border: 2px solid #C0C0C0;
}

.character-image {
  height: 200px;
  width: 100%;
  overflow: hidden;
  background: #f0f0f0;
}

.character-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.character-info {
  padding: 1rem;
}

.character-details {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.character-details span {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.faction {
  background: #e3f2fd;
  color: #1976d2;
}

.type {
  background: #f3e5f5;
  color: #7b1fa2;
}

.element {
  background: #e8f5e9;
  color: #388e3c;
}

.grade {
  background: #fff3e0;
  color: #f57c00;
}
</style> 