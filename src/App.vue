<template>
  <div class="app">
    <header>
      <h1>Astride Picker</h1>
      <p>캐릭터 선택 및 필터링 도구</p>
    </header>
    <main>
      <CharacterList />
    </main>
    <footer>
      <p>&copy; 2025 Astride Picker</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import CharacterList from '@/components/character/CharacterList.vue';
</script>

<style>
:root {
  --primary-color: #3f51b5;
  --secondary-color: #f50057;
  --background-color: #f5f5f5;
  --text-color: #333;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Noto Sans KR', Arial, sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

header {
  text-align: center;
  padding: 2rem 0;
}

header h1 {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

header p {
  font-size: 1.2rem;
  color: #666;
}

main {
  min-height: calc(100vh - 200px);
}

footer {
  text-align: center;
  padding: 2rem 0;
  margin-top: 2rem;
  color: #666;
  font-size: 0.9rem;
}
</style>
