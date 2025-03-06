<template>
  <div class="app">
    <header class="header">
      <div class="container header-content">
        <router-link to="/" class="logo">Astride Picker</router-link>
        <nav class="nav">
          <router-link to="/" class="nav-link">홈</router-link>
          <router-link to="/about" class="nav-link">소개</router-link>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <div class="container">
        <router-view></router-view>
      </div>
    </main>

    <footer class="footer">
      <div class="container footer-content">
        <p>&copy; 2024 Astride Picker. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 컴포넌트 로직이 필요한 경우 여기에 추가
</script>
