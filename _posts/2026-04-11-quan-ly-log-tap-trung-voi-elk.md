---
title: Quản Lý Log Tập Trung Với ELK Stack
date: 2026-04-11 09:30:00 +0700
description: Xây dựng hệ thống ELK (Elasticsearch, Logstash, Kibana) để thu thập, xử lý và phân tích log từ nhiều nguồn.
categories: [Hạ tầng, Logging]
tags: [elk, elasticsearch, logstash, kibana, centralized-logging, log-analysis]
---

## Tại sao cần log tập trung?

Khi có nhiều server, dùng SSH vào từng server để xem log là vô cùng bất tiện. Log tập trung giúp:
- Tìm kiếm nhanh chóng
- Phân tích xu hướng
- Phát hiện vấn đề sớm
- Lưu trữ dài hạn

## Kiến trúc ELK

```
Agents (Filebeat, Fluentd, ...)
        ↓
   Logstash (Process)
        ↓
   Elasticsearch (Index & Store)
        ↓
    Kibana (Visualize)
```

## Các thành phần

### Logstash

Thu thập, xử lý, lọc log từ nhiều nguồn.

```conf
input {
  beats {
    port => 5000
  }
}

filter {
  mutate {
    add_field => { "[@metadata][index_name]" => "logs-%{+YYYY.MM.dd}" }
  }
  
  grok {
    match => { "message" => "%{COMBINEDAPACHELOG}" }
  }
}

output {
  elasticsearch {
    hosts => ["localhost:9200"]
    index => "%{[@metadata][index_name]}"
  }
}
```

### Elasticsearch

Lưu trữ và đánh chỉ mục log, hỗ trợ truy vấn nhanh chóng.

```bash
# Kiểm tra trạng thái
curl -X GET "localhost:9200/_cluster/health?pretty"

# Liệt kê index
curl -X GET "localhost:9200/_cat/indices?v"
```

### Kibana

Giao diện web để tìm kiếm, phân tích, vẽ biểu đồ log.

```
Dashboard → Discover → Visualization
```

## Cài đặt nhanh với Docker Compose

```yaml
version: '3.8'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.17.0
    environment:
      - discovery.type=single-node
    ports:
      - "9200:9200"

  logstash:
    image: docker.elastic.co/logstash/logstash:7.17.0
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    ports:
      - "5000:5000"
    depends_on:
      - elasticsearch

  kibana:
    image: docker.elastic.co/kibana/kibana:7.17.0
    ports:
      - "5601:5601"
    depends_on:
      - elasticsearch
```

## Sử dụng Filebeat để gửi log

```yaml
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /var/log/application.log

output.logstash:
  hosts: ["localhost:5000"]
```

## Tạo Dashboard trong Kibana

1. Vào Kibana → Management → Index Patterns
2. Tạo pattern mới, ví dụ: `logs-*`
3. Vào Discover để xem log
4. Tạo Visualization và Dashboard từ data

## Kết luận

ELK là giải pháp mạnh mẽ và miễn phí cho log tập trung. Để scale lớn hơn, xem xét Elasticsearch Service trên cloud hoặc các giải pháp khác như Datadog, Splunk.
