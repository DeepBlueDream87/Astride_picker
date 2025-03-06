<template>
  <div class="home">
    <header class="header">
      <h1>Astride Picker</h1>
      <nav>
        <ul>
          <li><router-link to="/">홈</router-link></li>
          <li><router-link to="/login">로그인</router-link></li>
        </ul>
      </nav>
    </header>

    <main class="main-content">
      <CharacterPicker />
    </main>

    <footer class="footer">
      <p>&copy; 2024 Astride Picker. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import CharacterPicker from '../components/CharacterPicker.vue'
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
}

.header {
  background-color: var(--surface-color);
  padding: 1rem 2rem;
  box-shadow: var(--shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.header h1 {
  margin: 0;
  color: var(--text-color);
  font-size: 1.8rem;
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

nav a {
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  transition: var(--transition-fast);
  position: relative;
}

nav a:hover {
  color: var(--primary-color);
}

nav a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient-primary);
  transition: var(--transition-fast);
}

nav a:hover::after {
  width: 100%;
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.footer {
  background-color: var(--surface-color);
  padding: 2rem;
  text-align: center;
  color: var(--text-secondary);
  border-top: 1px solid var(--border-color);
}
</style>
