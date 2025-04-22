<template>
  <div class="auth-form">
    <h2>🔑 Đăng nhập</h2>
    <input v-model="email" placeholder="Email" class="input" />
    <input v-model="password" type="password" placeholder="Password" class="input" />
    <button @click="login" class="button">Login</button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import API from "../api";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      this.error = "";
      try {
        const res = await API.user.post("/login", {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", this.email);
        alert("✅ Đăng nhập thành công!");
        this.$emit("login-success"); // thêm dòng này!
      } catch (err) {
        this.error = err.response?.data?.error || "Đăng nhập thất bại!";
      }
    },
  },
};
</script>

<style scoped>
@import "./Register.vue"; /* dùng style giống */
</style>
