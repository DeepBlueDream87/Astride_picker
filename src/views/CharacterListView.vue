<template>
  <div class="character-list-view">
    <h1>캐릭터 목록</h1>
    <CharacterList />
  </div>
</template>

<script setup lang="ts">
import CharacterList from '@/components/character/CharacterList.vue';
</script>

<style scoped>
.character-list-view {
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--primary-color);
}
</style> 