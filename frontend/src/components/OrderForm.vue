<template>
  <div>
    <h2>Tạo đơn hàng</h2>

    <input v-model="email" placeholder="Email người dùng" />

    <select v-model="selectedProductId" @change="updateSelectedProduct">
      <option disabled value="">-- Chọn dịch vụ --</option>
      <option v-for="p in products" :key="p._id" :value="p._id">
        {{ p.name }} ({{ p.price }} đ)
      </option>
    </select>

    <input type="number" v-model.number="quantity" placeholder="Số lượng" min="1" />

    <p v-if="selectedProduct">
      💡 Mô tả: {{ selectedProduct.description }} <br />
      💸 Giá 1 dịch vụ: {{ selectedProduct.price }} đ <br />
      🧮 Tổng giá: <strong>{{ totalPrice }} đ</strong>
    </p>

    <button @click="submitOrder">Tạo đơn</button>
    <p v-if="errorMsg" style="color: red">{{ errorMsg }}</p>
  </div>
</template>

<script>
import API from "../api";

export default {
  data() {
    return {
      email: "",
      quantity: 1,
      selectedProductId: "",
      selectedProduct: null,
      products: [],
      errorMsg: "",
    };
  },
  computed: {
    totalPrice() {
      return this.selectedProduct ? this.selectedProduct.price * this.quantity : 0;
    },
  },
  methods: {
    isEmailValid(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },
    updateSelectedProduct() {
      this.selectedProduct = this.products.find((p) => p._id === this.selectedProductId);
    },
    async submitOrder() {
      this.errorMsg = "";

      if (!this.email || !this.isEmailValid(this.email)) {
        this.errorMsg = "❌ Email không hợp lệ!";
        return;
      }
      if (!this.selectedProduct) {
        this.errorMsg = "❌ Vui lòng chọn dịch vụ!";
        return;
      }
      if (this.quantity < 1) {
        this.errorMsg = "❌ Số lượng phải lớn hơn 0!";
        return;
      }

      try {
        const orderRes = await API.order.post("/", {
          userEmail: this.email,
          productId: this.selectedProductId,
          quantity: this.quantity,
          totalPrice: this.totalPrice,
        });
        alert("✅ Tạo đơn hàng thành công! Order ID: " + orderRes.data._id);

        await API.payment.post("/", {
          orderId: orderRes.data._id,
          amount: this.totalPrice,
        });
        alert("✅ Thanh toán thành công!");

        // Reset form
        this.email = "";
        this.selectedProductId = "";
        this.selectedProduct = null;
        this.quantity = 1;
      } catch (err) {
        console.error("❌ Lỗi khi tạo đơn hàng:", err);
        this.errorMsg = err.response?.data?.error || "Tạo đơn hàng thất bại!";
      }
    },
  },
  async mounted() {
    try {
      const res = await API.product.get("/");
      this.products = res.data;
    } catch (err) {
      console.error("❌ Lỗi khi tải danh sách dịch vụ:", err);
    }
  },
};
</script>

<style scoped>
select,
input {
  display: block;
  margin: 10px 0;
  padding: 5px;
  width: 250px;
}
button {
  padding: 6px 12px;
  background: #2ecc71;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background: #27ae60;
}
</style>
