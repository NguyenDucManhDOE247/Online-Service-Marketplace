<template>
  <div class="order-container">
    <h2>📜 Lịch sử đơn hàng</h2>
    <ul v-if="orders.length > 0">
      <li v-for="order in orders" :key="order._id">
        🧾 <strong>{{ getProductName(order.productId) }}</strong> | Số lượng: {{ order.quantity }} |
        Tổng: {{ order.totalPrice }} đ | Thời gian: {{ formatDate(order.createdAt) }}
      </li>
    </ul>
    <p v-else>Không có đơn hàng nào.</p>
  </div>
</template>

<script>
import API from "../api";

export default {
  data() {
    return {
      orders: [],
      products: [],
    };
  },
  methods: {
    async fetchOrders() {
      const email = localStorage.getItem("email");
      if (!email) return;
      try {
        const [orderRes, productRes] = await Promise.all([
          API.order.get(`/user/${email}`),
          API.product.get("/"),
        ]);
        this.orders = orderRes.data;
        this.products = productRes.data;
      } catch (err) {
        console.error("❌ Không lấy được đơn hàng:", err);
      }
    },
    formatDate(d) {
      return new Date(d).toLocaleString("vi-VN");
    },
    getProductName(id) {
      const found = this.products.find((p) => p._id === id);
      return found ? found.name : id;
    },
  },
  mounted() {
    this.fetchOrders();

    window.addEventListener("order-updated", this.fetchOrders);
  },
  beforeUnmount() {
    window.removeEventListener("order-updated", this.fetchOrders);
  },
};
</script>

<style scoped>
.order-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
}
li {
  margin-bottom: 10px;
  border-bottom: 1px dashed #555;
  padding-bottom: 5px;
}
</style>
