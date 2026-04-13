---
title: Bảo Mật CI/CD Pipeline Thực Chiến
date: 2026-04-13 09:30:00 +0700
description: Checklist ngắn gọn để giảm rủi ro trong pipeline và bảo vệ chuỗi cung ứng phần mềm.
categories: [DevSecOps, Bảo mật]
tags: [sast, dast, secrets, supply-chain]
---

## Tại sao cần ưu tiên pipeline security

Pipeline là nơi code được build và phát hành. Nếu bị khai thác, toàn bộ hệ thống có thể bị ảnh hưởng.

## 6 điểm cần có

### 1. Secret management đúng cách

Không hard-code token. Dùng secret store và xoay khóa định kỳ.

### 2. SAST trong pull request

Quét lỗi bảo mật sớm để giảm chi phí sửa lỗi.

### 3. Dependency scanning

Theo dõi CVE của thư viện và đặt ngưỡng chặn build nếu lỗi nghiêm trọng.

### 4. Image scanning

Quét image container trước khi push và trước khi deploy.

### 5. Principle of least privilege

Tài khoản CI chỉ đủ quyền tối thiểu cần dùng.

### 6. Audit log

Lưu vết thao tác build/deploy để phục vụ điều tra sự cố.

## Kết luận

Bạn không cần làm tất cả một lúc. Bắt đầu từ secret + dependency scanning là đã giảm rủi ro đáng kể.
