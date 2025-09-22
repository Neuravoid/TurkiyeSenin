# Türkiye Senin - Belediye Etkinlik ve Burs Platformu

[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.20.0-green)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC)](https://tailwindcss.com/)

## 🌟 Vizyon

Türkiye Senin, belediyelerin vatandaşlarla daha etkili iletişim kurmasını sağlayan modern, dijital bir platformdur. Etkinlik yönetimi ve burs imkanları üzerinden toplumu bilgilendirir, katılımı teşvik eder ve yerel yönetimleri güçlendirir.

## 🚀 Özellikler

### 🎯 Etkinlik Yönetimi
- **İnteraktif Türkiye Haritası**: Şehir bazlı etkinlik keşfi ve oluşturma
- **QR Kodlu Kayıt Sistemi**: Güvenli katılım takibi
- **Kategori Bazlı Filtreleme**: Kültür, spor, aile gibi kategorilerde arama
- **Kapasite Yönetimi**: Otomatik doluluk kontrolü
- **Admin Paneli**: Etkinlik CRUD işlemleri, istatistikler

### 🎓 Burs Modülü
- **Belediye Bursları**: Eğitim desteği fırsatları
- **Akıllı Filtreleme**: Şehir, eğitim seviyesi, aktif burslar
- **Favori Sistemi**: Kullanıcıların ilgi burslarını kaydetmesi
- **Detaylı Bilgilendirme**: Başvuru şartları, tarihler, kontenjan

### 🔐 Güvenlik ve Yetkilendirme
- **JWT Tabanlı Kimlik Doğrulama**: Güvenli oturum yönetimi
- **Rol Bazlı Erişim**: Admin ve kullanıcı ayrıcalıkları
- **Middleware Koruması**: API endpoint güvenliği

### 📱 Kullanıcı Deneyimi
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **Modern UI/UX**: Tailwind CSS ile şık arayüz
- **Hızlı Arama**: Metin ve konum bazlı filtreleme
- **Gerçek Zamanlı Güncellemeler**: Etkinlik durumu takibi

## 🛠️ Teknoloji Stack

### Frontend
- **Next.js 14**: App Router, Server Components
- **React 18**: Modern React özellikleri
- **TypeScript**: Tip güvenliği
- **Tailwind CSS**: Utility-first CSS framework

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **Prisma ORM**: Veritabanı yönetimi
- **SQLite**: Geliştirme veritabanı

### Test ve Kalite
- **Vitest**: Unit testing framework
- **ESLint**: Kod kalitesi kontrolü
- **TypeScript**: Tip güvenliği

### Harici Entegrasyonlar
- **React Simple Maps**: Türkiye haritası görselleştirme
- **JWT**: Token tabanlı kimlik doğrulama
- **QR Code Generation**: Kayıt doğrulama
- **bcryptjs**: Şifre hashleme
- **Zod**: Schema validation

## 📋 Gereksinimler

- Node.js 18+
- npm veya yarn
- Git

## 🏗️ Kurulum ve Çalıştırma

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/Neuravoid/TurkiyeSenin.git
cd TurkiyeSenin/etkinliktr
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Veritabanını Hazırlayın
```bash
# Prisma client'ı oluşturun
npm run db:generate

# Migration'ları uygulayın
npm run db:migrate

# Örnek verileri yükleyin
npm run db:seed
```

### 4. Çevre Değişkenlerini Ayarlayın
`.env.local` dosyasını oluşturun:
```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-secret-key"
NEXTAUTH_SECRET="your-nextauth-secret"
```

### 5. Uygulamayı Çalıştırın
```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## 🎮 Kullanım

### Genel Kullanıcı
1. **Ana Sayfa**: Öne çıkan etkinlikleri görüntüleyin
2. **Etkinlikler**: Harita üzerinden şehir seçerek etkinlikleri keşfedin
3. **Burslar**: Eğitim fırsatlarını inceleyin ve favorilerinize ekleyin
4. **Kayıt**: Etkinliklere QR kod ile katılım sağlayın

### Admin Kullanıcı
1. **Giriş**: Admin hesabı ile oturum açın
2. **Etkinlik Yönetimi**: Yeni etkinlik oluşturun, düzenleyin veya silin
3. **Burs Yönetimi**: Burs fırsatları ekleyin ve yönetin
4. **İstatistikler**: Katılım ve kullanım verilerini görüntüleyin

## 📚 API Dokümantasyonu

### Genel API'ler
- `GET /api/events` - Etkinlik listesi ve arama
- `GET /api/events/[id]` - Etkinlik detayı
- `GET /api/scholarships` - Burs listesi ve filtreleme
- `GET /api/scholarships/[id]` - Burs detayı
- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/logout` - Kullanıcı çıkışı
- `GET /api/me` - Mevcut kullanıcı bilgileri
- `POST /api/registrations` - Etkinlik kaydı
- `POST /api/qr/validate` - QR kod doğrulama

### Admin API'ler
- `POST /api/admin/events` - Etkinlik oluşturma
- `PUT /api/admin/events/[id]` - Etkinlik güncelleme
- `DELETE /api/admin/events/[id]` - Etkinlik silme
- `POST /api/admin/scholarships` - Burs oluşturma
- `PUT /api/admin/scholarships/[id]` - Burs güncelleme
- `DELETE /api/admin/scholarships/[id]` - Burs silme

### Kimlik Doğrulama Gerektiren Endpointler
Tüm `/api/admin/*` endpointleri JWT token gerektirir.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

### Geliştirme Standartları
- TypeScript strict mode kullanın
- ESLint kurallarına uyun
- Test coverage'ı artırın
- Commit mesajları açıklayıcı olsun

## 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

- **Proje Sahipleri**: Nazlıcan Güvenoğlu, Umut Alkan, Murat Can Taner 
- **GitHub**: [@Neuravoid](https://github.com/Neuravoid)
- **E-posta**: [E-posta](alkanumut848@gmail.com)

---

**Türkiye Senin** - Belediyeler ve vatandaşlar için dijital köprü. 🌉

*Bu platform, yerel yönetimlerin dijital dönüşümüne katkı sağlamak amacıyla geliştirilmiştir.*