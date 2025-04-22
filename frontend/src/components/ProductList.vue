<template>
  <div>
    <h2>📋 Danh sách dịch vụ</h2>
    <ul>
      <li v-for="product in products" :key="product._id" style="margin-bottom: 10px">
        <strong>{{ product.name }}</strong> - {{ product.price }} đ - {{ product.description }}
        <br />
        <button @click="createOrder(product._id)" style="margin-top: 5px">🛒 Đặt dịch vụ</button>
      </li>
    </ul>
  </div>
</template>

<script>
import API from "../api";

export default {
  name: "ProductList",
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
      console.error("Lỗi khi tải sản phẩm:", err);
    }
  },
  methods: {
    async createOrder(productId) {
      const userEmail = prompt("Nhập email của bạn để đặt dịch vụ:");
      if (!userEmail) return alert("Bạn chưa nhập email!");

      try {
        const order = { userEmail, productId };
        await API.order.post("/", order);
        alert("✅ Đơn hàng đã được tạo thành công!");
      } catch (err) {
        alert("❌ Lỗi khi tạo đơn hàng.");
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
button {
  background-color: black;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #333;
}
</style>
