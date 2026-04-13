---
title: Firewall Và Network Security Căn Bản
date: 2026-04-10 08:00:00 +0700
description: Nguyên tắc cơ bản về firewall, ACL, NAT và cách thiết lập để bảo vệ mạng.
categories: [An ninh mạng, Network]
tags: [firewall, acl, nat, iptables, network-security, defense]
---

## Lớp bảo mật trong kiến trúc mạng

```
Internet
   ↓
   Firewall (Biên ranh)
   ↓
   NAT (Dịch địa chỉ)
   ↓
   ACL (Luật cho phép/từ chối)
   ↓
   Internal Network
```

## Firewall là gì?

Firewall là một hệ thống hoặc thiết bị lọc lưu lượng mạng dựa trên các luật được định trước.

### Loại Firewall

- **Stateless**: lọc từng gói tin độc lập (cổ điển, nhanh)
- **Stateful**: theo dõi kết nối, thông minh hơn
- **Application**: lọc ở tầng ứng dụng (WAF)

## Thiết lập Firewall trên Linux với iptables

### Cấu trúc cơ bản

```
iptables -A CHAIN -p PROTOCOL -d DESTINATION --dport PORT -j TARGET
```

### Ví dụ thực tế

```bash
# Xóa tất cả rule cũ
iptables -F
iptables -X

# Set policy mặc định
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Cho phép local traffic
iptables -A INPUT -i lo -j ACCEPT

# Cho phép established connection
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Cho phép SSH (port 22)
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Cho phép HTTP/HTTPS
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Cho phép DNS
iptables -A INPUT -p udp --dport 53 -j ACCEPT

# Ping
iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT

# Lưu config (CentOS/RHEL)
service iptables save

# Kiểm tra rule
iptables -L -n -v
```

## NAT (Network Address Translation)

Cho phép các máy nội bộ có địa chỉ riêng giao tiếp với internet qua một IP công khai.

```bash
# Enable IP forwarding
echo 1 > /proc/sys/net/ipv4/ip_forward

# Masquerade (SNAT)
iptables -t nat -A POSTROUTING -j MASQUERADE

# Port forwarding: 8080 ngoài → 80 trong
iptables -t nat -A PREROUTING -p tcp --dport 8080 -j REDIRECT --to-port 80
```

## ACL (Access Control List)

Danh sách cho phép/từ chối truy cập dựa trên IP, port, giao thức.

```bash
# Cho phép từ subnet cụ thể
iptables -A INPUT -p tcp -s 192.168.1.0/24 --dport 3306 -j ACCEPT

# Từ chối từ IP cụ thể
iptables -A INPUT -s 203.0.113.50 -j DROP

# Rate limiting (chống DDoS cơ bản)
iptables -A INPUT -p tcp --dport 80 -m limit --limit 25/minute --limit-burst 100 -j ACCEPT
iptables -A INPUT -p tcp --dport 80 -j DROP
```

## UFW (Uncomplicated Firewall) - Giao diện dễ dùng

```bash
# Enable
ufw enable

# Cấu hình mặc định
ufw default deny incoming
ufw default allow outgoing

# Cho phép port
ufw allow 22
ufw allow 80
ufw allow 443

# Từ chối port
ufw deny 23

# Xem status
ufw status verbose

# Xóa rule
ufw delete allow 22
```

## Best practices

1. **Default Deny**: từ chối tất cả, rồi cho phép cái cần thiết
2. **Least Privilege**: mở đúng port, địa chỉ cần thiết thôi
3. **Logging**: ghi log lưu lượng nghi vấn
4. **Regular Review**: thường xuyên kiểm tra, xóa rule cũ không dùng
5. **WAF Layer**: thêm Web Application Firewall (ModSecurity, Cloudflare)

## Kết luận

Firewall là tuyến phòng thủ đầu tiên của hệ thống. Học cách cấu hình tốt sẽ giúp bảo vệ mạng và ứng dụng một cách hiệu quả.
