<template>
  <div class="order-form">
    <h2>📝 Tạo đơn hàng</h2>

    <select v-model="selectedProductId" @change="updateSelectedProduct" class="input">
      <option disabled value="">-- Chọn dịch vụ --</option>
      <option v-for="p in products" :key="p._id" :value="p._id">
        {{ p.name }} ({{ p.price }} đ)
      </option>
    </select>

    <input type="number" v-model.number="quantity" placeholder="Số lượng" min="1" class="input" />

    <div v-if="selectedProduct" class="info">
      💡 <strong>Mô tả:</strong> {{ selectedProduct.description }} <br />
      💸 <strong>Giá 1 dịch vụ:</strong> {{ selectedProduct.price }} đ <br />
      🧮 <strong>Tổng giá:</strong> <span style="color: #2ecc71">{{ totalPrice }} đ</span>
    </div>

    <button @click="submitOrder" class="button">Tạo đơn</button>
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
  </div>
</template>

<script>
import API from "../api";

export default {
  data() {
    return {
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
    updateSelectedProduct() {
      this.selectedProduct = this.products.find((p) => p._id === this.selectedProductId);
    },
    async submitOrder() {
      this.errorMsg = "";

      const email = localStorage.getItem("email");
      if (!email) {
        this.errorMsg = "❌ Bạn chưa đăng nhập!";
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
          userEmail: email,
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
        this.selectedProductId = "";
        this.selectedProduct = null;
        this.quantity = 1;
        window.dispatchEvent(new Event("order-updated"));
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
.order-form {
  max-width: 400px;
  margin: 30px auto;
  background: #1f1f1f;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
}
.input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  background: #2c2c2c;
  color: white;
  border: 1px solid #444;
  border-radius: 5px;
}
.button {
  width: 100%;
  padding: 10px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  font-weight: bold;
  cursor: pointer;
}
.button:hover {
  background: #27ae60;
}
.error {
  color: #ff4d4f;
  margin-top: 10px;
}
.info {
  background: #2c2c2c;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  line-height: 1.6;
}
</style>
