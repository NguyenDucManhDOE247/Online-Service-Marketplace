<template>
  <div>
    <h2>Danh sách dịch vụ</h2>
    <ul>
      <li v-for="p in products" :key="p._id">
        <strong>{{ p.name }}</strong> - {{ p.price }} đ - {{ p.description }}
        <br />
        <code>ID dịch vụ: {{ p._id }}</code>
      </li>
    </ul>
  </div>
</template>

<script>
import API from "../api";
export default {
  data() {
    return {
      products: [],
    };
  },
  async mounted() {
    try {
      const res = await API.product.get("/");
      this.products = res.data;
    } catch (err) {
      console.error("Lỗi khi lấy danh sách dịch vụ:", err);
    }
  },
};
</script>

<style scoped>
ul {
  list-style-type: circle;
  padding-left: 1.2em;
}
li {
  margin-bottom: 15px;
}
code {
  display: inline-block;
  margin-top: 4px;
  color: #f39c12;
  font-size: 0.9em;
}
</style>
