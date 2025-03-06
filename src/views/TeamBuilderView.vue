<template>
  <div class="team-builder-view">
    <TeamBuilder />
  </div>
</template>

<script setup lang="ts">
import TeamBuilder from '@/components/character/TeamBuilder.vue';
</script>

<style scoped>
.team-builder-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

@media (max-width: 768px) {
  .team-builder-view {
    padding: 1rem;
  }
}
</style> 