<template>
  <div class="character-list-view">
    <CharacterList />
  </div>
</template>

<script setup lang="ts">
import CharacterList from '@/components/character/CharacterList.vue';
</script>

<style scoped>
.character-list-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

@media (max-width: 768px) {
  .character-list-view {
    padding: 1rem;
  }
}
</style> 