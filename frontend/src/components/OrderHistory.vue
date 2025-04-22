<template>
  <div class="order-container">
    <h2>📜 Lịch sử đơn hàng</h2>
    <ul v-if="orders.length > 0">
      <li v-for="order in orders" :key="order._id">
        🧾 Dịch vụ ID: {{ order.productId }} | Số lượng: {{ order.quantity }} | Tổng:
        {{ order.totalPrice }} đ | Thời gian: {{ formatDate(order.createdAt) }}
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
    };
  },
  methods: {
    formatDate(d) {
      return new Date(d).toLocaleString("vi-VN");
    },
  },
  async mounted() {
    const email = localStorage.getItem("email");
    if (!email) return;

    try {
      const res = await API.order.get(`/user/${email}`);
      this.orders = res.data;
    } catch (err) {
      console.error("❌ Không lấy được đơn hàng:", err);
    }
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
