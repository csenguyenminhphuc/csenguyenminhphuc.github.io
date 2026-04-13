---
title: Monitoring Hệ Thống 24/7 Bằng Prometheus Grafana
date: 2026-04-13 10:00:00 +0700
description: Thiết lập monitoring thực tế để nhìn thấy sức khỏe hệ thống và phát hiện sự cố sớm.
categories: [Hạ tầng, Giám sát]
tags: [prometheus, grafana, alerting, noc]
---

## Bài toán

Nhiều đội chỉ biết hệ thống lỗi khi khách hàng báo. Monitoring giúp chuyển từ bị động sang chủ động.

## Kiến trúc tối giản

- Node Exporter thu thập metric host
- Prometheus scrape metric theo chu kỳ
- Grafana vẽ dashboard và theo dõi trend
- Alertmanager gửi cảnh báo qua email/Telegram

## Dashboard nên có

### System Health

CPU, RAM, disk I/O, network throughput.

### Service Health

Error rate, latency, request volume.

### Capacity Planning

Theo dõi xu hướng tăng trưởng để dự đoán nâng cấp.

## Kết luận

Monitoring tốt không chỉ để "xem cho đẹp", mà để quyết định nhanh và đúng khi có sự cố.
