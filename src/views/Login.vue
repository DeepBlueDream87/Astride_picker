<template>
  <div class="login-page">
    <div class="login-container">
      <h1>로그인</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">이메일</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <button type="submit" class="login-button">로그인</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'LoginPage',
})

const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = () => {
  // TODO: 실제 로그인 로직 구현
  console.log('로그인 시도:', { email: email.value, password: password.value })
  router.push('/')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);
}

.login-container {
  background-color: var(--white);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
  width: 100%;
  max-width: 400px;
}

.login-container h1 {
  text-align: center;
  color: var(--text-color);
  margin-bottom: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: var(--text-color);
  font-weight: 500;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.login-button {
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>
