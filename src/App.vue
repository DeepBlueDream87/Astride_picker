<template>
  <div class="app">
    <nav class="nav-bar">
      <router-link to="/" class="nav-logo">Astride Picker</router-link>
      <div class="nav-links">
        <router-link to="/characters">캐릭터 목록</router-link>
        <router-link to="/team-builder">팀 빌더</router-link>
        <router-link to="/board">게시판</router-link>
      </div>
    </nav>

    <main>
      <router-view />
    </main>

    <footer>
      <p>&copy; 2025 Astride Picker</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
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

.nav-bar {
  background: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-color);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--primary-color);
}

main {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 1rem;
}

footer {
  text-align: center;
  padding: 2rem;
  background: white;
  margin-top: auto;
}

@media (max-width: 768px) {
  .nav-bar {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>
