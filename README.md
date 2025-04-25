# 🛠️ Online Service Marketplace

A simple marketplace system that allows users to register, log in, view service listings, place orders, make payments, and track order history. The project is implemented using a Microservices architecture with an automated CI/CD pipeline deployed on DigitalOcean Kubernetes via Jenkins.

## 📂 Project Structure

```
dacn/
├── frontend/             # User interface (Vue.js)
├── gateway/              # API Gateway reverse proxy (Nginx)
├── user-service/         # User microservice
├── product-service/      # Product microservice
├── order-service/        # Order microservice
├── payment-service/      # Payment microservice
├── k8s/                  # Kubernetes manifests
├── docker-compose.yaml   # Run the entire system (local)
├── Jenkinsfile           # Jenkins CI/CD pipeline
├── README.md             # Project information
```

## ⚙️ Technologies Used

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

## 🚀 Key Features

- [x] User registration and login
- [x] Product and service listings
- [x] Order placement and payment processing
- [x] Order history tracking
- [x] User-friendly and responsive interface
- [x] Frontend routing management with Vue Router
- [x] Automated CI/CD pipeline for building, pushing Docker images, and deploying to Kubernetes
- [x] Real-time updates without page reloads for login, registration, and order history
- [x] Automatic data refresh after order placement

---

## 📦 Deployment Instructions

### 1. Jenkins + CI/CD Pipeline

- Build Docker images for each service
- Push images to DockerHub
- Apply all `k8s/*.yaml` files to the Kubernetes cluster

### 2. Kubernetes Cluster Commands

```bash
kubectl apply -f k8s/
kubectl get pods
kubectl get svc
```

---

## 📎 Deployment Details

| Component   | Details                                                                 |
| ----------- | ----------------------------------------------------------------------- |
| DockerHub   | `nguyenducmanh247/*`                                                    |
| GitHub Repo | [NguyenDucManhDOE247/dacn](https://github.com/NguyenDucManhDOE247/dacn) |
| Gateway URL | `http://<ip>:32000/`                                                    |
| Jenkins     | Runs in a container with kubeconfig mounted                             |
| Kubernetes  | DigitalOcean Kubernetes                                                 |

---

## 👤 Contributors

- **Nguyen Duc Manh**  
   BCSE2022 - Vietnam Japan University

---

## 📄 License

This project is licensed under the MIT License.  
Copyright © 2025 Nguyen Duc Manh

---

## 📘 Additional Notes

- Ensure that the Kubernetes cluster is properly configured with sufficient resources.
- Use `kubectl logs` to debug any issues with pods.
- Update the `nginx.conf` and `ingress.yaml` files as needed to match your domain or IP configuration.
- For local testing, use `docker-compose.yaml` to spin up services.
