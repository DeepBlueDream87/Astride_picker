<template>
  <div class="home">
    <header class="header">
      <h1>Astride Picker</h1>
      <nav>
        <ul>
          <li><router-link to="/">홈</router-link></li>
          <li><router-link to="/about">소개</router-link></li>
          <li><router-link to="/contact">문의</router-link></li>
        </ul>
      </nav>
    </header>

    <main class="main-content">
      <section class="hero">
        <h2>환영합니다</h2>
        <p>Astride Picker와 함께 새로운 경험을 시작하세요</p>
      </section>

      <section class="features">
        <div class="feature-card">
          <h3>기능 1</h3>
          <p>첫 번째 주요 기능에 대한 설명입니다.</p>
        </div>
        <div class="feature-card">
          <h3>기능 2</h3>
          <p>두 번째 주요 기능에 대한 설명입니다.</p>
        </div>
        <div class="feature-card">
          <h3>기능 3</h3>
          <p>세 번째 주요 기능에 대한 설명입니다.</p>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>&copy; 2024 Astride Picker. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import '../assets/styles/home.css'

defineOptions({
  name: 'HomePage',
})
</script>
