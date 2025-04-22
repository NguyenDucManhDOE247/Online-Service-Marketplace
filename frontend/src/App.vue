<template>
  <div class="app-container">
    <h1>🛠️ Online Service Marketplace</h1>

    <div v-if="!isLoggedIn">
      <Register />
      <Login @login-success="checkLogin" />
    </div>

    <div v-else>
      <p>
        👋 Xin chào, <strong>{{ userEmail }}</strong>
        <button @click="logout" class="logout-btn">Đăng xuất</button>
      </p>

      <ProductList />
      <OrderForm />
      <OrderHistory />
    </div>
  </div>
</template>

<script>
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
import ProductList from "./components/ProductList.vue";
import OrderForm from "./components/OrderForm.vue";
import OrderHistory from "./components/OrderHistory.vue";

export default {
  components: {
    Register,
    Login,
    ProductList,
    OrderForm,
    OrderHistory,
  },
  data() {
    return {
      userEmail: "",
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("token");
    },
  },
  methods: {
    checkLogin() {
      this.userEmail = localStorage.getItem("email") || "";
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      location.reload();
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 20px;
  text-align: center;
}
.logout-btn {
  margin-left: 10px;
  padding: 5px 12px;
  background: #c0392b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.logout-btn:hover {
  background: #992d22;
}
</style>
