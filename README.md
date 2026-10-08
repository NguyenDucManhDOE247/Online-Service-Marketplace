# Online Service Marketplace — first version (2025)

A small service marketplace — register, log in, browse services, place an order, pay, view order history — built as
four Node.js microservices with a Vue frontend, packaged with Docker, pushed to Docker Hub by a Jenkins pipeline and
run on a DigitalOcean Kubernetes cluster.

This repository is the **2025 prototype**. The project was later continued as a graduation thesis on AWS (Terraform,
Ansible, ECR, EKS, tests, monitoring) in
[Microservices-Marketplace-System](https://github.com/NguyenDucManhDOE247/Microservices-Marketplace-System); the last
commit here is contained in that repository's `old-version` branch.

[![Node.js](https://img.shields.io/badge/Node.js-Express%204-339933?logo=node.js)](https://nodejs.org/)
[![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-plain%20manifests-326CE5?logo=kubernetes)](k8s/)
[![Jenkins](https://img.shields.io/badge/Jenkins-pipeline-D24939?logo=jenkins)](Jenkinsfile)
[![Status](https://img.shields.io/badge/Status-prototype%20%E2%80%94%20superseded-yellow)](#scope-and-known-limits)

## Table of contents

- [What's here](#whats-here)
- [Architecture](#architecture)
- [Microservices](#microservices)
- [Tech stack](#tech-stack)
- [Running locally](#running-locally)
- [Kubernetes](#kubernetes)
- [CI/CD — Jenkins](#cicd--jenkins)
- [Project status](#project-status)
- [Scope and known limits](#scope-and-known-limits)
- [License](#license)

## What's here

```
.
├── user-service/  product-service/  order-service/  payment-service/
│   └── src/        index.js, routes/, controllers/, models/
├── frontend/       Vue 3 + Vite SPA, served by Nginx (two-stage Dockerfile)
├── gateway/        Nginx reverse proxy — the single public entry point
├── k8s/            namespace, six Deployments with Services, MongoDB
├── docker-compose.yaml
├── Jenkinsfile     five-stage declarative pipeline
├── script.groovy   pipeline functions
└── do-token-ver.txt  an earlier Jenkinsfile variant that fetched the kubeconfig with doctl (contains no token)
```

## Architecture

```
 git push ─> GitHub ─> Jenkins ── docker build ×6 ─> Docker Hub (:latest) ── kubectl apply -f k8s/
                                                                                 │
 Browser ─ HTTP ─> LoadBalancer ─> gateway (Nginx)                               ▼
                                     │ /api/users/  /api/products/  /api/orders/  /api/payments/  /
                                     ▼
        ┌──────────────── Kubernetes, namespace "osm" ────────────────┐
        │  user · product · order · payment · frontend   (2 replicas) │
        │  order-service ── HTTP ──> user-service  (e-mail check)     │
        │  mongo  (1 replica)   databases: userservice,               │
        │                       productservice, orderservice          │
        └─────────────────────────────────────────────────────────────┘
```

## Microservices

| Service | Port | Responsibility | Notes |
|---|---|---|---|
| `user-service` | 4001 | Register, login, e-mail existence check | bcrypt hashing; issues a JWT on login |
| `product-service` | 4002 | Service catalogue CRUD | seeds five sample services on an empty database |
| `order-service` | 4003 | Create and list orders | checks the e-mail through `user-service` |
| `payment-service` | 4004 | Acknowledge a payment | stateless; returns `status: "paid"` |

## Tech stack

| Area | Choice |
|---|---|
| Backend | Node.js, Express 4, Mongoose 7 |
| Frontend | Vue 3, Vue Router, Vite, Nginx |
| Database | MongoDB 8.0, one database per service |
| Gateway | Nginx reverse proxy |
| Containers | Docker, Docker Hub |
| Orchestration | Kubernetes (plain manifests) on DigitalOcean |
| CI/CD | Jenkins declarative pipeline |

## Running locally

`docker-compose.yaml` in this repository does not start as committed (see the limits below). The steps here were
run on 2026-10-07 and work from a fresh clone.

1. For the UI only: in `frontend/src/api.js`, set `const BASE_URL = "";` so the browser calls the API through the
   local gateway instead of the address of the original cluster.

2. Build the images:

   ```bash
   for s in user-service product-service order-service payment-service frontend gateway; do
     docker build -t osm-local-$s ./$s
   done
   ```

3. Save this as `docker-compose.local.yaml` and start it:

   ```yaml
   name: osm-local
   services:
     mongo:
       image: mongo:8.0-noble
       volumes: [ mongo-data:/data/db ]
     user-service:
       image: osm-local-user-service
       environment:
         - MONGO_URI=mongodb://mongo:27017/userservice
         - JWT_SECRET=local-dev-only-change-me
       depends_on: [ mongo ]
       restart: always
     product-service:
       image: osm-local-product-service
       environment: [ "MONGO_URI=mongodb://mongo:27017/productservice" ]
       depends_on: [ mongo ]
       restart: always
     order-service:
       image: osm-local-order-service
       environment: [ "MONGO_URI=mongodb://mongo:27017/orderservice" ]
       depends_on: [ mongo ]
       restart: always
     payment-service:
       image: osm-local-payment-service
       restart: always
     frontend:
       image: osm-local-frontend
     gateway:
       image: osm-local-gateway
       ports: [ "8080:80" ]
       depends_on: [ user-service, product-service, order-service, payment-service, frontend ]
       restart: always
   volumes:
     mongo-data:
   ```

   ```bash
   docker compose -f docker-compose.local.yaml up -d
   ```

Open <http://localhost:8080>. To stop and remove everything, including the data volume:

```bash
docker compose -f docker-compose.local.yaml down -v
```

## Kubernetes

`k8s/` holds a namespace (`osm`), one Deployment and one Service per component, and MongoDB as a single-replica
Deployment. Only `gateway` is exposed, through a `LoadBalancer` Service on port 80; everything else is `ClusterIP`.

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/
kubectl get pods -n osm
```

The manifests reference `nguyenducmanh247/osm-*:latest` on Docker Hub and do not set `JWT_SECRET`; see the limits
below before deploying them.

## CI/CD — Jenkins

| # | Stage | What it does |
|---|---|---|
| 1 | Init | Loads `script.groovy` |
| 2 | Checkout Code | `checkout scm` |
| 3 | Build and Push Docker Images | Builds six images and pushes them to Docker Hub as `latest`; the registry password comes from Jenkins credentials |
| 4 | Deploy to Kubernetes | `kubectl apply` of the namespace, then of every manifest |
| 5 | Verify Deployment | Lists pods and services in the `osm` namespace |

## Project status

The DigitalOcean cluster and the Jenkins server no longer exist. Re-verified on 2026-10-07 from a clean export of
`main`, on a local Docker host:

| Check | Result |
|---|---|
| Six images build | yes |
| `docker compose config` on the committed compose file | invalid — a service depends on an undefined service |
| Stack wired as in `k8s/`, API through the gateway | register, catalogue, orders and payments respond |
| Login without `JWT_SECRET` (as in `k8s/user.yaml`) | `user-service` exits; the gateway returns 502 |
| Full flow in a browser, after the two local fixes above | register → login → order → payment → history works |
| Kubernetes on DigitalOcean, Jenkins | **not re-run** — described from the code |

## Scope and known limits

This is a **prototype** that was superseded by the thesis repository. It is kept as a record of the starting point
and should not be deployed as is.

**By design**

- One cluster, one environment, images tagged `latest`.
- Payments are simulated and nothing is stored for them.
- No HTTPS, no custom domain, no automated tests, no monitoring.

**Known issues** — the first group was confirmed by running the code; the second comes from reading the manifests and
the pipeline, which could not be re-run:

| Area | Issue |
|---|---|
| Local run | `docker-compose.yaml` names the database service `mongodb` while the other services depend on `mongo`; the volume names do not match; there are no `build:` entries and no gateway |
| Frontend | The API base URL is a hard-coded public IP address, compiled into the bundle |
| Login | `JWT_SECRET` is not provided by the manifests or the compose file; signing the token throws and the process exits |
| Authentication | A JWT is issued but no service verifies it and the frontend never sends it; every endpoint is open, and `/dashboard` renders without logging in |
| Orders and payments | The e-mail address and `totalPrice` are taken from the request body; a payment for an order that does not exist is accepted |
| Stability | A malformed id on `GET /api/products/:id` or `GET /api/orders/:id`, or a registration without a password, raises an unhandled rejection and the process exits |
| Validation | E-mail and password are only checked in the browser; ordering for an unknown e-mail returns 500 instead of 400 |
| Tokens | JWTs have no expiry; login distinguishes "user not found" from "incorrect password" |
| Database | MongoDB runs without authentication, so any service can read any database |
| Images | Containers run as root with `npm start` as PID 1, on a non-LTS Node base image, without lockfiles or `.dockerignore` (257–320 MB each) |
| Database storage *(code review)* | `k8s/mongo.yaml` is a Deployment without a volume; recreating the pod loses all data |
| Manifests *(code review)* | No resource requests or limits, no probes, no ConfigMap or Secret |
| Deployment *(code review)* | Manifests always reference `latest`, so `kubectl apply` reports no change after a new push and running pods keep the old image; there is no rollback target and the verify stage cannot fail |
| Repository history | The first commit contains `node_modules/` and three `.env` files |

## License

Intended to be released under the MIT License. A `LICENSE` file has not been added to the repository yet.

---

Nguyen Duc Manh — BCSE2022, Vietnam Japan University
