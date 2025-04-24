<template>
  <div class="welcome">
    <h1>🎉 Chào mừng đến với Online Service Marketplace</h1>
    <router-link to="/register" class="btn">Đăng ký</router-link>
    <router-link to="/login" class="btn">Đăng nhập</router-link>
  </div>
</template>

<style scoped>
.welcome {
  text-align: center;
  margin-top: 100px;
}
.btn {
  margin: 10px;
  padding: 10px 20px;
  background-color: #2980b9;
  color: white;
  border-radius: 8px;
  text-decoration: none;
}
.btn:hover {
  background-color: #1f6694;
}
</style>
