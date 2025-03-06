<template>
  <div class="home">
    <div class="menu-grid">
      <router-link to="/characters" class="menu-item">
        <div class="menu-content">
          <i class="fas fa-users"></i>
          <h2>캐릭터 목록</h2>
          <p>캐릭터 목록 및 필터링 도구</p>
        </div>
      </router-link>

      <router-link to="/team-builder" class="menu-item">
        <div class="menu-content">
          <i class="fas fa-random"></i>
          <h2>팀 빌더</h2>
          <p>랜덤 캐릭터 팀 뽑기 게임</p>
        </div>
      </router-link>

      <router-link to="/board" class="menu-item">
        <div class="menu-content">
          <i class="fas fa-comments"></i>
          <h2>게시판</h2>
          <p>커뮤니티 게시판</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home {
  padding: 2rem;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.menu-item {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.menu-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.menu-content {
  text-align: center;
}

.menu-content i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.menu-content h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.menu-content p {
  color: #666;
}

@media (max-width: 768px) {
  .menu-grid {
    grid-template-columns: 1fr;
  }
}
</style> 