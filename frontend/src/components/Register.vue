<template>
  <div>
    <h2>Register</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="register">Register</button>
  </div>
</template>

<script>
import API from "../api";
export default {
  data() {
    return { email: "", password: "" };
  },
  methods: {
    async register() {
      await API.user.post("/register", {
        email: this.email,
        password: this.password,
      });
      alert("Đăng ký thành công!");
    },
  },
};
</script>
