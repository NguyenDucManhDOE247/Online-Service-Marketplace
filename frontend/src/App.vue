<template>
  <div>
    <h1>🛠️ Online Service Marketplace</h1>
    <Register />
    <Login />
    <ProductList />
    <OrderForm />
  </div>
</template>

<script>
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
import ProductList from "./components/ProductList.vue";
import OrderForm from "./components/OrderForm.vue";

export default {
  components: {
    Register,
    Login,
    ProductList,
    OrderForm,
  },
};
</script>
