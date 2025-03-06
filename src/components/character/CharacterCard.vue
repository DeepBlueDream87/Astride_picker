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
  position: relative;
}

.character-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.character-card.s {
  border: 2px solid #FFD700;
}

.character-card.a {
  border: 2px solid #C0C0C0;
}

.character-image {
  aspect-ratio: 1;
  width: 100%;
  overflow: hidden;
  background: #000;
  position: relative;
}

.character-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.character-info {
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(4px);
}

.character-info h3 {
  font-size: 1rem;
  margin: 0;
  color: #fff;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-bottom: 0.5rem;
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
}
</style> 