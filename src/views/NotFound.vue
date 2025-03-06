<template>
  <div class="not-found">
    <h1>404</h1>
    <p>페이지를 찾을 수 없습니다.</p>
    <router-link to="/" class="home-link">홈으로 돌아가기</router-link>
  </div>
</template>

<script setup>
defineOptions({
  name: 'NotFoundPage',
})
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.not-found h1 {
  font-size: 6rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.not-found p {
  font-size: 1.5rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.home-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.home-link:hover {
  color: #0056b3;
}
</style>
