---
title: Container Orchestration Với Kubernetes
date: 2026-04-12 10:00:00 +0700
description: Hướng dẫn thực hành cơ bản về Kubernetes để quản lý container ở quy mô lớn.
categories: [Hạ tầng, Kubernetes]
tags: [k8s, container, orchestration, cluster, pod, service]
---

## Vấn đề cần giải quyết

Khi số lượng container tăng lên hàng chục, hàng trăm thì quản lý thủ công bằng Docker Compose không còn khả thi. Kubernetes ra đời để tự động hóa việc này.

## Kiến trúc cơ bản

```
Master Node (Control Plane)
├── API Server
├── Scheduler
├── Controller Manager
└── etcd (data store)

Worker Nodes
├── kubelet
├── kube-proxy
└── container runtime
```

## Khái niệm chính

### Pod

Đơn vị nhỏ nhất trong Kubernetes, chứa một hoặc nhiều container (thường là một).

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
  - name: app
    image: myapp:1.0
    ports:
    - containerPort: 8080
```

### Service

Cung cấp cách truy cập từ ngoài và load balancing giữa pods.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: LoadBalancer
```

### Deployment

Quản lý replica pods và cập nhật phiên bản ứng dụng.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: myapp:1.0
        ports:
        - containerPort: 8080
```

## Lợi ích của Kubernetes

- **Tự động công suất**: tự động scale tăng/giảm pods theo demand
- **Self-healing**: khởi động lại pods khi chết
- **Rolling update**: cập nhật phiên bản mà không gián đoạn dịch vụ
- **Cân bằng tải**: phân phối request giữa pods
- **Lưu trữ**: quản lý volume persistent

## Bắt đầu

```bash
# Cài đặt minikube (để test cục bộ)
minikube start

# Deploy ứng dụng
kubectl apply -f deployment.yaml

# Xem status
kubectl get deployments
kubectl get pods
kubectl get services

# Forward port để test
kubectl port-forward svc/my-app-service 8080:80
```

## Kết luận

Kubernetes có đường học dốc nhưng một khi thành thạo sẽ mở khóa cấp độ quản lý hạ tầng mới. Bắt đầu từ minikube hoặc EKS/GKE managed service để giảm bớt phức tạp.
