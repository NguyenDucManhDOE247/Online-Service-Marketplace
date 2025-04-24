# 🛠️ Online Service Marketplace

Một hệ thống marketplace đơn giản cho phép người dùng đăng ký, đăng nhập, xem danh sách dịch vụ, đặt hàng, thanh toán, và theo dõi lịch sử đơn hàng. Dự án được triển khai theo kiến trúc Microservices với CI/CD pipeline tự động trên DigitalOcean Kubernetes bằng Jenkins.

## 📂 Cấu trúc dự án

```
dacn/
├── docker-compose.yaml
├── Jenkinsfile
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── gateway/
│   ├── nginx.conf
│   └── Dockerfile
├── k8s/
│   ├── deployment/
│   ├── service/
│   └── ingress.yaml
├── user-service/
│   ├── src/
│   ├── tests/
│   └── package.json
├── product-service/
│   ├── src/
│   ├── tests/
│   └── package.json
├── order-service/
│   ├── src/
│   ├── tests/
│   └── package.json
├── payment-service/
│   ├── src/
│   ├── tests/
│   └── package.json
└── README.md
```

## ⚙️ Công nghệ sử dụng

| Layer            | Technology                        |
| ---------------- | --------------------------------- |
| Frontend         | Vue 3 + Vue Router + Vite         |
| Backend          | Node.js + Express.js              |
| Database         | MongoDB                           |
| CI/CD            | Jenkins + Docker + GitHub Webhook |
| Deployment       | DigitalOcean Kubernetes           |
| Reverse Proxy    | NGINX                             |
| API Gateway      | Custom NGINX                      |
| Containerization | Docker                            |
| Orchestration    | Kubernetes                        |

---

## 🚀 Tính năng chính

- [x] Đăng ký và đăng nhập người dùng
- [x] Danh sách dịch vụ sản phẩm
- [x] Đặt hàng và thanh toán
- [x] Xem lịch sử đơn hàng
- [x] Giao diện thân thiện và responsive
- [x] Quản lý route frontend bằng Vue Router
- [x] CI/CD tự động build + push Docker images và deploy lên K8s
- [x] Không cần reload khi login/đăng ký/lịch sử đơn cập nhật
- [x] Tự động cập nhật dữ liệu sau khi đặt hàng

---

## 📦 Triển khai hệ thống

### 1. Jenkins + CI/CD

- Build Docker images cho từng service
- Push image lên DockerHub
- Apply toàn bộ `k8s/*.yaml` lên cluster

### 2. Kubernetes cluster

```bash
kubectl apply -f k8s/
kubectl get pods
kubectl get svc
```

---

## 📎 Thông tin triển khai

| Thành phần  | Thông tin                                   |
| ----------- | ------------------------------------------- |
| DockerHub   | `nguyenducmanh247/*`                        |
| GitHub      | https://github.com/NguyenDucManhDOE247/dacn |
| Gateway URL | `http://<ip>:32000/`                        |
| Jenkins     | Chạy dưới container, mount kubeconfig       |
| Cluster     | DigitalOcean Kubernetes                     |

---

## 👤 Thành viên thực hiện

- Nguyễn Đức Mạnh - BCSE2022 - Vietnam Japan University

---

## 📄 License

MIT License © 2025 Nguyễn Đức Mạnh
