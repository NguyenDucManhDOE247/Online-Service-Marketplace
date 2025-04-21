<template>
  <div>
    <h2>Login</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
  </div>
</template>

<script>
import API from "../api";
export default {
  data() {
    return { email: "", password: "" };
  },
  methods: {
    async login() {
      const res = await API.user.post("/login", {
        email: this.email,
        password: this.password,
      });
      localStorage.setItem("token", res.data.token);
      alert("Đăng nhập thành công!");
    },
  },
};
</script>
