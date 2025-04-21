<template>
  <div>
    <h2>Danh sách dịch vụ</h2>
    <ul>
      <li v-for="p in products" :key="p._id">
        {{ p.name }} - {{ p.price }} đ - {{ p.description }}
      </li>
    </ul>
  </div>
</template>

<script>
import API from "../api";
export default {
  data() {
    return { products: [] };
  },
  async mounted() {
    const res = await API.product.get("/");
    this.products = res.data;
  },
};
</script>
