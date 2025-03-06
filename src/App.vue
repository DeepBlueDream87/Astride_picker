<template>
  <div class="app">
    <header class="header">
      <h1>아스트라이드 캐릭터 도감</h1>
      <nav class="nav">
        <RouterLink to="/" class="nav-link">캐릭터 목록</RouterLink>
        <RouterLink to="/team-builder" class="nav-link">랜덤 팀 빌더</RouterLink>
      </nav>
    </header>
    
    <main class="main">
      <RouterView />
    </main>

    <footer>
      <p>&copy; 2025 Astride Picker</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<style>
:root {
  --primary-color: #6366f1;
  --primary-dark-color: #4f46e5;
  --background-color: #f5f5f5;
  --text-color: #333;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: white;
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.header h1 {
  font-size: 2rem;
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: 1rem;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.nav-link {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--primary-color);
  background: rgba(99, 102, 241, 0.1);
}

.main {
  flex: 1;
}

footer {
  text-align: center;
  padding: 2rem;
  background: white;
  margin-top: auto;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 1.5rem;
  }
  
  .nav {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
