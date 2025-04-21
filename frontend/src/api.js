import axios from "axios";

const API = {
  user: axios.create({ baseURL: "http://localhost:4001/api/users" }),
  product: axios.create({ baseURL: "http://localhost:4002/api/products" }),
  order: axios.create({ baseURL: "http://localhost:4003/api/orders" }),
  payment: axios.create({ baseURL: "http://localhost:4004/api/payments" }),
};

export default API;
