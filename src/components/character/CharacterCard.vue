<template>
  <div class="character-card" :class="character.grade.toLowerCase()" :data-grade="character.grade">
    <div class="character-image">
      <img 
        :src="characterImagePath" 
        :alt="character.name"
        @error="handleImageError"
      >
    </div>
    <div class="character-info">
      <h3>{{ character.name }}</h3>
      <div class="character-attributes">
        <img 
          :src="`/images/elements/${getElementImageName(character.element).name}.${getElementImageName(character.element).ext}`" 
          :alt="character.element"
          class="attribute-icon"
        >
        <img 
          :src="`/images/professions/${getProfessionImageName(character.type)}.webp`" 
          :alt="character.type"
          class="attribute-icon"
        >
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
    return '/images/characters/default.png';
  }
  return getCharacterImagePath(props.character.imageFileName);
});

const handleImageError = () => {
  hasImageError.value = true;
};

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
  return elementMap[element] || { name: element, ext: 'png' };
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
</script>

<style scoped>
.character-card {
  border-radius: 8px;
  overflow: hidden;
  background: #1a1a1a;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
}

.character-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.character-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 3px solid transparent;
  border-radius: 8px;
  pointer-events: none;
  z-index: 1;
}

.character-card.s::before {
  border-color: #FFB800;
  box-shadow: 0 0 15px rgba(255, 184, 0, 0.5);
}

.character-card.a::before {
  border-color: #C0C0C0;
  box-shadow: 0 0 15px rgba(192, 192, 192, 0.3);
}

.character-image {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: #000;
  position: relative;
  flex-shrink: 0;
}

.character-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.character-info {
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.95);
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.character-info h3 {
  font-size: 0.95rem;
  margin: 0;
  color: #fff;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-bottom: 0.5rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: keep-all;
  line-height: 1.2;
}

.character-attributes {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.attribute-icon {
  width: 1.25rem;
  height: 1.25rem;
  object-fit: contain;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
}
</style> 