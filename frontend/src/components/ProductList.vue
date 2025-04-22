<template>
  <div>
    <h2>Danh sách dịch vụ</h2>
    <ul>
      <li v-for="p in products" :key="p._id" style="margin-bottom: 1rem">
        <strong>{{ p.name }}</strong> - {{ p.price }} đ
        <br />
        {{ p.description }}
        <br />
        <button @click="createOrder(p._id)">🛒 Đặt dịch vụ</button>
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
    try {
      const res = await API.product.get("/");
      this.products = res.data;
    } catch (err) {
      console.error("Lỗi khi load sản phẩm:", err);
    }
  },
  methods: {
    async createOrder(productId) {
      const email = prompt("Nhập email người dùng:");
      if (!email) {
        alert("Bạn chưa nhập email!");
        return;
      }

      try {
        await API.order.post("/", {
          userEmail: email,
          productId: productId,
        });
        alert("✅ Đã tạo đơn hàng thành công!");
      } catch (error) {
        alert("❌ Tạo đơn hàng thất bại");
        console.error(error);
      }
    },
  },
};
</script>
