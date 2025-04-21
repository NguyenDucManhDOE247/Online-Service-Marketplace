<template>
  <div>
    <h2>Tạo đơn hàng</h2>
    <input v-model="email" placeholder="Email người dùng" />
    <input v-model="productId" placeholder="ID dịch vụ" />
    <input v-model.number="quantity" placeholder="Số lượng" />
    <input v-model.number="totalPrice" placeholder="Tổng giá" />
    <button @click="submitOrder">Tạo đơn</button>
  </div>
</template>

<script>
import API from "../api";
export default {
  data() {
    return {
      email: "",
      productId: "",
      quantity: 1,
      totalPrice: 0,
    };
  },
  methods: {
    async submitOrder() {
      const res = await API.order.post("/", {
        userEmail: this.email,
        productId: this.productId,
        quantity: this.quantity,
        totalPrice: this.totalPrice,
      });
      alert("Tạo đơn thành công! Order ID: " + res.data._id);

      // Gửi thanh toán
      await API.payment.post("/", {
        orderId: res.data._id,
        amount: this.totalPrice,
      });
      alert("Thanh toán thành công!");
    },
  },
};
</script>
