# SarjNoktamV3 Mikroservis Mimarisi

## Genel Yapı

- Her servis Node.js (TypeScript) ile yazılmıştır.
- Servisler: user-service, payment-service, station-service, notification-service
- API Gateway: Tüm istemciler için tek giriş noktası
- Ortak kütüphaneler ve protolar: common, libs, proto
- Altyapı: Docker, Kubernetes, CI/CD, Monitoring, Logging

## Servisler
- Her servis kendi veritabanına ve bağımsız kod tabanına sahiptir.
- Servisler arası iletişim RabbitMQ ile sağlanır.
- Kimlik doğrulama JWT ile yapılır.

## API Gateway
- Servis yönlendirme, rate limiting, kimlik doğrulama
- Swagger/OpenAPI ile dokümantasyon

## Altyapı
- docker-compose ile lokal geliştirme
- Kubernetes ile production ortamı
- Prometheus & Grafana ile monitoring
- ELK stack ile merkezi log yönetimi
- CI/CD pipeline (GitHub Actions)

## Dosya Yapısı
```
backend-services/
  user-service/
  payment-service/
  station-service/
  notification-service/
  common/
  libs/
  proto/
api-gateway/
  src/
  docs/
infra/
  k8s/
  monitoring/
  logging/
  ci-cd/
docs/
  ARCHITECTURE.md
```

## Diyagram
![Mimari Diyagram](mimari-diyagram.png)

---
Detaylı adımlar ve servislerin teknik dokümantasyonu ilerleyen dosyalarda yer alacaktır.