<template>
  <div class="character-card" :class="character.rarity.toLowerCase()">
    <img :src="character.image" :alt="character.name" class="character-image" />
    <div class="character-info">
      <h3 class="character-name">{{ character.name }}</h3>
      <div class="rarity-badge">{{ character.rarity }}</div>
      <div class="attribute-badge">{{ character.attribute }}</div>
      <div class="stats">
        <div class="stat-item">
          <span class="stat-label">HP</span>
          <span class="stat-value">{{ character.stats.hp }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">ATK</span>
          <span class="stat-value">{{ character.stats.atk }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">DEF</span>
          <span class="stat-value">{{ character.stats.def }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">SPD</span>
          <span class="stat-value">{{ character.stats.spd }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CharacterStats {
  hp: number;
  atk: number;
  def: number;
  spd: number;
}

interface Character {
  id: number;
  name: string;
  rarity: string;
  attribute: string;
  image: string;
  stats: CharacterStats;
  position: string;
}

defineProps<{
  character: Character;
}>();
</script>
