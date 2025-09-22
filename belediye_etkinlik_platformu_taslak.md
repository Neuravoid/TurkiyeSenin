# BELEDİYE ETKİNLİK PLATFORMU - KAPSAMLI PROTOTİP TASLAĞI

## 1. PLATFORM GENEL BAKIŞ

### Platform Adı ve Konsept
**Platform Adı:** **EtkinlikTR** (Türkiye Belediye Etkinlik Platformu)

**Konsept:** Türkiye'nin en kapsamlı belediye etkinlik keşif ve katılım platformu. Tüm il ve ilçe belediyelerinin kültürel, sanatsal, spor, eğitim ve sosyal etkinliklerini tek bir platformda toplayan, kullanıcıların kolayca keşfedebileceği ve QR kod teknolojisi ile sorunsuz katılım sağlayabileceği dijital çözüm.

### Hedef Kitle

#### Birincil Hedef Kitle:
- **Yaş:** 18-45 yaş arası teknoloji kullanımına aşina vatandaşlar
- **Profil:** Aktif yaşam tarzına sahip, kültürel ve sosyal etkinliklere katılmayı seven
- **Lokasyon:** Türkiye geneli (başlangıçta büyük şehirler öncelikli)
- **Davranış:** Mobil cihazları aktif kullanan, sosyal medyada aktif

#### İkincil Hedef Kitle:
- **Aile Bireyları:** Çocukları ile birlikte etkinliklere katılmak isteyen ebeveynler
- **Yaşlı Vatandaşlar:** 45+ yaş grubu, belediye hizmetlerine ilgi duyan
- **Öğrenciler:** Üniversite ve lise öğrencileri
- **Turistler:** Türkiye'yi ziyaret eden yabancı ve yerli turistler

#### Kurumsal Hedef Kitle:
- **Belediyeler:** Etkinliklerini duyurmak isteyen tüm belediyeler
- **Etkinlik Organizatörleri:** Belediye işbirliği ile çalışan organizatörler
- **STK'lar:** Sosyal sorumluluk projeleri yürüten kuruluşlar

### Ana Özellikler

#### 🎯 Kullanıcı Odaklı Özellikler:
1. **Akıllı Etkinlik Keşfi**
   - Lokasyon bazlı öneri algoritması
   - Kişiselleştirilmiş etkinlik önerileri
   - İlgi alanı bazlı filtreleme
   - Sosyal çevre etkileşimi

2. **Sorunsuz Katılım Sistemi**
   - QR kod ile anlık check-in
   - Digital bilet sistemi
   - Kapasite takibi ve uyarı sistemi
   - Bekleme listesi yönetimi

3. **Topluluk ve Sosyal Özellikler**
   - Arkadaşlarla etkinlik paylaşımı
   - Etkinlik değerlendirme ve yorumlama
   - Sosyal medya entegrasyonu
   - Etkinlik fotoğrafı paylaşımı

#### 🏛️ Belediye Odaklı Özellikler:
1. **Kapsamlı Admin Paneli**
   - Etkinlik oluşturma ve yönetim
   - Katılımcı analitikleri
   - Kapasite ve kaynak yönetimi
   - Raporlama ve istatistikler

2. **Dijital Dönüşüm Desteği**
   - Kolay entegrasyon API'leri
   - Mevcut sistemlerle uyumluluk
   - Personel eğitim desteği
   - Teknik destek hizmeti

#### 📱 Teknik Özellikler:
1. **Modern Teknoloji Altyapısı**
   - Mobil-first responsive tasarım
   - Progressive Web App (PWA) desteği
   - Offline kullanım imkanı
   - Gerçek zamanlı senkronizasyon

2. **Güvenlik ve Güvenilirlik**
   - End-to-end şifreleme
   - GDPR uyumlu veri yönetimi
   - Fraud detection sistemi
   - 99.9% uptime garantisi

## 2. KULLANICI AKIŞLARI (USER FLOWS)

### 2.1 Kayıt Olma Süreci (Sign Up Flow)

#### Akış Adımları:
1. **Giriş Noktası**
   - Ana sayfadan "Kayıt Ol" butonuna tıklama
   - Etkinlik detay sayfasından "Katılmak için kayıt ol" bağlantısı
   - Mobil uygulamadan doğrudan kayıt

2. **Kayıt Yöntemi Seçimi**
   ```
   [E-posta ile Kayıt] [Google ile Kayıt] [Apple ID ile Kayıt] [Telefon ile Kayıt]
   ```

3. **Kişisel Bilgi Toplama**
   - **Zorunlu Alanlar:** Ad Soyad, E-posta, Şifre, İl/İlçe
   - **Opsiyonel Alanlar:** Telefon, Doğum Tarihi, İlgi Alanları
   - **Gerçek zamanlı doğrulama:** E-posta formatı, şifre güçlülüğü

4. **Onay ve Doğrulama**
   - E-posta doğrulama linki gönderimi
   - SMS doğrulama (telefon kayıt için)
   - KVKK ve kullanım şartları onayı

5. **İlk Kurulum**
   - Lokasyon izni talebi
   - İlgi alanı seçimi (5-10 kategori)
   - Bildirim tercihleri ayarı
   - Hoşgeldin turu başlatma

#### Alternatif Akışlar:
- **Sosyal Medya Kayıt:** Google/Apple OAuth entegrasyonu
- **Hızlı Kayıt:** Sadece e-posta + şifre ile minimum bilgi
- **Davetli Kayıt:** Referans kodu ile kayıt bonusu

### 2.2 Giriş Yapma (Login Flow)

#### Ana Giriş Akışı:
1. **Giriş Sayfası**
   ```
   E-posta/Telefon: [____________________]
   Şifre:          [____________________]
   [Beni Hatırla]  [Şifremi Unuttum]
   
   [GİRİŞ YAP]
   
   ─── veya ───
   [Google ile Giriş] [Apple ID ile Giriş]
   ```

2. **Doğrulama ve Yönlendirme**
   - Bilgi doğrulama (backend validation)
   - 2FA kontrolü (aktif ise)
   - Son ziyaret edilen sayfa veya ana sayfaya yönlendirme

#### Şifremi Unuttum Akışı:
1. E-posta/telefon girişi → Doğrulama kodu gönderimi
2. Kod girişi → Yeni şifre belirleme
3. Şifre güncelleme → Otomatik giriş

#### Güvenlik Akışları:
- **Çoklu başarısız deneme:** Geçici hesap kilidi + CAPTCHA
- **Şüpheli aktivite:** E-posta uyarı + 2FA zorlaması
- **Cihaz tanıma:** Yeni cihaz bildirimi + onay süreci

### 2.3 Etkinlik Arama/Keşfi

#### Ana Keşif Akışı:
1. **Ana Sayfa Giriş**
   - Lokasyon bazlı öneriler yükleniyor
   - Kategorilere göz atma seçeneği
   - Arama çubuğu her zaman erişilebilir

2. **Filtreleme ve Arama**
   ```
   🔍 [Etkinlik ara...]
   
   📅 Tarih: [Bu Hafta ▼] 📍 Konum: [İstanbul ▼] 
   🏷️ Kategori: [Hepsi ▼]   💰 Fiyat: [Ücretsiz ▼]
   
   [FİLTRELE] [TEMİZLE]
   ```

3. **Sonuç Görüntüleme**
   - **Liste Görünüm:** Kronolojik sıralama, kart tasarımı
   - **Harita Görünüm:** İnteraktif harita + pin'ler
   - **Takvim Görünüm:** Aylık/haftalık takvim

4. **Etkinlik Ön İnceleme**
   - Kart üzerinden hızlı bilgi (tarih, yer, fiyat)
   - Beğeni/kaydetme butonları
   - Arkadaşlara paylaşma seçenekleri

#### Akıllı Öneri Sistemi:
- **Geçmiş davranış bazlı:** Daha önce katıldığı etkinlik türleri
- **Sosyal çevre etkisi:** Arkadaşlarının katıldığı etkinlikler
- **Lokasyon optimizasyonu:** Ev/iş adresine yakın etkinlikler
- **Trend takibi:** Popüler olan ve viral giden etkinlikler

### 2.4 Etkinliğe Kayıt Olma

#### Standart Kayıt Akışı:
1. **Etkinlik Detay İnceleme**
   - Etkinlik bilgileri, program, konuşmacı detayları
   - Katılımcı sayısı ve yorumlar
   - Lokasyon detayları ve ulaşım bilgileri

2. **Kayıt Karar Süreci**
   ```
   [🎫 ÜCRETSİZ KAYIT OL] [❤️ BEĞENDİM] [📤 PAYLAŞ]
   
   Kalan Kapasite: 847/1000
   Son Kayıt Tarihi: 15 Mart 2025, 23:59
   ```

3. **Kayıt Formu**
   - **Kişi sayısı:** Kendisi + ek katılımcılar
   - **Özel gereksinimler:** Erişebilirlik, diyet vb.
   - **İletişim tercihleri:** SMS/E-posta/Push notification

4. **Onay ve Biletlendirme**
   - Kayıt onay ekranı
   - Digital bilet oluşturma
   - QR kod üretimi
   - Takvim ekleme seçeneği

#### Özel Kayıt Senaryoları:
- **Ücretli Etkinlik:** Ödeme sayfasına yönlendirme
- **Davetiye Gerekli:** Davet kodu girişi
- **Yaş Sınırı:** Kimlik doğrulama
- **Kapasite Dolu:** Bekleme listesi kayıt

### 2.5 QR Kod ile Giriş Yapma

#### Check-in Akışı:
1. **Etkinlik Günü Hazırlık**
   - Push notification: "Etkinliğiniz 2 saat sonra başlıyor"
   - Digital bilet hazırlama (offline erişim)
   - Lokasyon paylaşımı ve navigasyon

2. **Etkinlik Alanında QR Tarama**
   ```
   📱 Kullanıcı Tarafı:
   - "Biletime Git" → QR kod ekranı
   - QR kod gösterme
   - Başarılı giriş onayı
   
   🏛️ Belediye Tarafı:
   - QR kod tarayıcı açma
   - QR kod okutma
   - Katılımcı doğrulama
   - Giriş onayı/reddi
   ```

3. **Giriş Sonrası**
   - Hoşgeldiniz mesajı
   - Etkinlik programı hatırlatma
   - Sosyal özellikler (check-in paylaşımı)
   - İç navigasyon (büyük etkinlikler için)

#### Alternatif Giriş Yöntemleri:
- **Manuel kontrol:** Kimlik + isim listesi
- **NFC desteği:** Telefon teması ile giriş
- **Backup QR:** İnternet bağlantısı olmadığında

### 2.6 Profil Yönetimi

#### Profil Ana Akışı:
1. **Profil Sayfası Yapısı**
   ```
   👤 [Profil Fotoğrafı]
   📛 Ahmet Yılmaz
   📧 ahmet.yilmaz@example.com
   📱 +90 555 123 4567
   📍 İstanbul, Türkiye
   
   ─────────────────────
   🎫 Etkinliklerim (12)
   ❤️ Beğendiklerim (5)
   📅 Takvimim
   ⚙️ Ayarlar
   ```

2. **Etkinlik Geçmişi Yönetimi**
   - **Gelecek Etkinlikler:** QR kod erişimi, hatırlatıcı ayarları
   - **Geçmiş Etkinlikler:** Fotoğraf galerisi, değerlendirme yapma
   - **İptal Edilen:** Geri ödeme takibi, alternatif öneriler

3. **Kişiselleştirme Ayarları**
   - İlgi alanları güncelleme
   - Bildirim tercihleri (push, e-posta, SMS)
   - Gizlilik ayarları (profil görünümü, etkinlik paylaşım)
   - Lokasyon izinleri yönetimi

4. **Sosyal Özellikler**
   - Arkadaş ekleme/çıkarma
   - Etkinlik önerme
   - Değerlendirme ve yorumlar
   - Başarım rozetleri (gamification)

#### Hesap Yönetimi:
- **Güvenlik:** Şifre değiştirme, 2FA ayarları, oturum yönetimi
- **Veri:** Kişisel veri indirme, hesap silme talepleri
- **Abonelik:** Premium özellikler, ödeme yöntemleri
- **Destek:** Yardım merkezi, canlı destek, geri bildirim

## 3. SAYFA YAPILARI VE ÖZELLİKLER

### 3.1 Ana Sayfa (Homepage)

#### Sayfa Yapısı (Desktop/Mobile)

```
┌─────────────────────────────────────────┐
│ 🏛️ EtkinlikTR        👤 [Profil] [🔔]   │ Header
├─────────────────────────────────────────┤
│ 🔍 [Etkinlik ara...] 📍 [İstanbul ▼]    │ Search Bar
├─────────────────────────────────────────┤
│ 📅 Bu Hafta Sonu │ 🎭 Kültür │ 🎵 Müzik │ Quick Filters
├─────────────────────────────────────────┤
│                                         │
│ ⚡ SİZİN İÇİN ÖNERİLER                   │ Personalized Section
│ [Kart1] [Kart2] [Kart3] [Tümünü Gör]   │
│                                         │
│ 🔥 POPÜLER ETKİNLİKLER                  │ Trending Section
│ [Kart1] [Kart2] [Kart3] [Tümünü Gör]   │
│                                         │
│ 🗓️ BU HAFTA                             │ This Week Section
│ [Kart1] [Kart2] [Kart3] [Tümünü Gör]   │
│                                         │
│ 🌟 YENİ EKLENENLER                      │ New Additions
│ [Kart1] [Kart2] [Kart3] [Tümünü Gör]   │
├─────────────────────────────────────────┤
│ 📱 [Ana] [Keşfet] [Biletlerim] [Profil] │ Bottom Navigation
└─────────────────────────────────────────┘
```

#### Ana Sayfa Özellikleri:

1. **Hero Section (Mobil için Compact)**
   - Lokasyon tabanlı hoş geldiniz mesajı
   - Hızlı etkinlik arama
   - Kategoriler için yatay kaydırma

2. **Akıllı Öneri Algoritması**
   - Kullanıcı geçmişi bazlı öneriler
   - Demografik benzerlik
   - Arkadaş aktiviteleri
   - Lokasyon proximiti

3. **Dinamik İçerik Blokları**
   - **Popüler Bu Hafta:** En çok kayıt olan etkinlikler
   - **Sizin İçin:** Kişiselleştirilmiş öneriler
   - **Yakınınızda:** 5km çapında etkinlikler
   - **Ücretsiz:** Bütçe dostu seçenekler
   - **Bugün:** Same-day etkinlikler

4. **Etkileşim Öğeleri**
   - Hızlı beğeni (double-tap veya ❤️)
   - Kaydetme (bookmark)
   - Paylaşma (native sharing)
   - Takvime ekleme (deep link)

### 3.2 Etkinlik Listesi Sayfası

#### Liste Görünüm Modları:

1. **Kart Görünüm (Varsayılan)**
```
┌─────────────────────────────────────┐
│ [📷 Etkinlik Görseli]               │
│                                     │
│ 🎭 Tiyatro Oyunu: "Hamlet"          │ Başlık
│ 📅 15 Mart 2025, Cumartesi 20:00   │ Tarih/Saat
│ 📍 Kadıköy Belediyesi Kültür Merkz  │ Lokasyon
│ 💰 Ücretsiz  👥 340/500 kişi        │ Fiyat/Kapasite
│                                     │
│ [❤️ 142] [💾] [📤] [QR] [KAYIT OL]   │ Action Buttons
└─────────────────────────────────────┘
```

2. **Kompakt Liste Görünüm**
```
🎭 Hamlet | 📅 15 Mar 20:00 | 📍 Kadıköy | [KAYIT OL]
🎵 Konser | 📅 16 Mar 19:30 | 📍 Üsküdar | [KAYIT OL]
🎨 Sergi  | 📅 17 Mar 10:00 | 📍 Beşiktaş | [KAYIT OL]
```

3. **Harita Görünüm**
   - İnteraktif harita (Mapbox/Google Maps)
   - Etkinlik pinleri (kategoriye göre renk kodlu)
   - Cluster desteği (yoğun alanlar için)
   - Pop-up bilgi kutuları

#### Filtreleme Sistemi:

```
┌─────────────────────────────────────┐
│ FİLTRELE                        [X] │
├─────────────────────────────────────┤
│ 📅 TARİH                            │
│ ○ Bugün     ○ Bu Hafta              │
│ ○ Bu Ay     ○ Özel tarih seç        │
│                                     │
│ 📍 LOKASYON                         │
│ [İstanbul ▼] [Kadıköy ▼]            │
│ ○ 1km ○ 5km ○ 10km ○ Farketmez     │
│                                     │
│ 🏷️ KATEGORİ                         │
│ ☑️ Kültür   ☑️ Sanat   □ Spor      │
│ □ Eğitim    □ Sosyal   □ Çocuk      │
│                                     │
│ 💰 FİYAT                            │
│ ○ Ücretsiz  ○ 0-50₺  ○ 50-100₺    │
│                                     │
│ [TEMİZLE]            [UYGULA]       │
└─────────────────────────────────────┘
```

#### Sıralama Seçenekleri:
- **Varsayılan:** Relevance score (öneri algoritması)
- **En Yakın:** Mesafe bazlı
- **En Yeni:** Ekleme tarihi
- **En Popüler:** Kayıt sayısı
- **Alfabetik:** A-Z sıralama
- **Fiyat:** Artan/azalan

### 3.3 Etkinlik Detay Sayfası

#### Sayfa Bölümleri:

1. **Hero Section**
```
┌─────────────────────────────────────┐
│ [🔙] [❤️] [💾] [📤]       [Menu ⋯] │ Top Actions
│                                     │
│     📷 [Etkinlik Ana Görseli]       │ Main Image
│                                     │ (Swipe gallery)
└─────────────────────────────────────┘
```

2. **Etkinlik Bilgileri**
```
🎭 HAMLETMat Tiyatro Topluluğu
15 Mart 2025, Cumartesi 20:00 - 22:30

📍 Kadıköy Belediyesi Atatürk Kültür Merkezi
    Rıhtım Cad. No:14, Kadıköy/İSTANBUL
    [📍 Haritada Gör] [🚌 Ulaşım Bilgisi]

👥 Katılımcılar: 340/500 kişi
💰 Giriş: Ücretsiz
🎫 Kayıt Gerekli: Evet

[🎫 KAYIT OL] [📅 TAKVİME EKLE]
```

3. **Ayrıntılı Açıklama**
```
📝 ETKİNLİK DETAYLARI
Shakespeare'in ölümsüz eseri Hamlet, modern yorumlamalar 
eşliğinde Kadıköy sahnesinde sizlerle buluşuyor...

👨‍🎭 SANATÇILAR
• Hamlet: Mehmet Yılmaz
• Ophelia: Ayşe Demir
• Claudius: Ali Vural

⏰ PROGRAM
20:00 - Giriş ve yerleşme
20:30 - Oyun başlangıcı
21:45 - Ara
22:00 - İkinci perde
22:30 - Final
```

4. **Lokasyon ve Ulaşım**
```
🗺️ [İnteraktif Harita]

🚌 ULAŞIM SEÇENEKLERİ
• Otobüs: 16, 16A, 16C Kadıköy İskele durağı
• Metro: M4 Kadıköy - 5dk yürüme
• Vapur: Kadıköy İskelesi - 2dk yürüme
• Araç: Otopark mevcut (ücretsiz, 50 araç)
```

5. **Sosyal ve Değerlendirmeler**
```
⭐ DEĞERLENDIRMELER (4.7/5.0)
👥 42 değerlendirme

💬 "Harika bir performanstı!" - Ahmet K.
💬 "Müthiş oyunculuk" - Zeynep M.
💬 "Kesinlikle tavsiye ederim" - Can B.

[TÜM DEĞERLENDİRMELERİ GÖR]
```

6. **İlgili Etkinlikler**
```
🔗 BENZERİ ETKİNLİKLER
[Kart1] [Kart2] [Kart3] [Tümünü Gör]

🏛️ AYNI BELEDİYEDEN
[Kart1] [Kart2] [Kart3] [Tümünü Gör]
```

### 3.4 Kullanıcı Profili Sayfası

#### Profil Genel Görünüm:
```
┌─────────────────────────────────────┐
│ [⚙️ Ayarlar]              [✏️ Düzenle]│
├─────────────────────────────────────┤
│     👤 [Profil Fotoğrafı]           │
│       Ahmet Yılmaz                  │
│    📍 İstanbul, Türkiye             │
│  🎭 Kültür Meraklısı | 🏆 15 Etkinlik│
├─────────────────────────────────────┤
│                                     │
│ 📊 İSTATİSTİKLERİM                  │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐    │
│ │ 15  │ │ 42  │ │ 8   │ │ 156 │    │
│ │Etkinlik│Saat │Şehir│ Puan│      │
│ └─────┘ └─────┘ └─────┘ └─────┘    │
│                                     │
│ 🎫 ETKİNLİKLERİM                    │
│ [Gelecek (3)] [Geçmiş (12)]         │
│                                     │
│ ❤️ BEĞENDİKLERİM (5)                │
│ [Mini Kart1] [Mini Kart2] [...]     │
│                                     │
│ 🏆 BAŞARIMLARIM                     │
│ 🥇 İlk Etkinlik  🎭 Kültür Sever    │
│ 🌟 Aktif Kullanıcı  📍 Şehir Kaşifi │
└─────────────────────────────────────┘
```

#### Alt Sayfalar:

1. **Etkinlik Geçmişi**
   - Gelecek etkinlikler (QR kod butonları ile)
   - Geçmiş etkinlikler (değerlendirme seçenekleri ile)
   - İptal edilenler
   - Bekleme listesi

2. **Ayarlar Sayfası**
```
⚙️ AYARLAR

👤 HESAP BİLGİLERİ
• Kişisel bilgileri düzenle
• Şifre değiştir
• E-posta güncelle

🔔 BİLDİRİMLER
• Push bildirimleri      [🔘]
• E-posta bildirimleri   [○]
• SMS bildirimleri       [○]

🔒 GİZLİLİK
• Profil görünürlüğü     [Herkes▼]
• Etkinlik paylaşımları  [🔘]
• Konum paylaşımı        [○]

🌍 DİL VE BÖLGE
• Dil: Türkçe           [▼]
• Zaman dilimi: TR      [▼]

💾 VERİ YÖNETİMİ
• Verilerimi indir
• Hesabımı sil
• Çerez ayarları
```

### 3.5 QR Kod Sayfası

#### Digital Bilet Ekranı:
```
┌─────────────────────────────────────┐
│ [🔙]      Digital Bilet      [⋯]    │
├─────────────────────────────────────┤
│                                     │
│ 🎭 Hamlet Tiyatro Oyunu             │
│ 📅 15 Mart 2025, Cumartesi 20:00   │
│ 📍 Kadıköy Kültür Merkezi           │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │    ▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄  ▄▄▄▄▄▄    │ │ QR Code
│ │    █ ▄▄▄ █  █ ▄▄▄ █  █ ▄▄▄▄    │ │ (Large)
│ │    █ ███ █  █ ███ █  █ ▄▄▄▄    │ │
│ │    █▄▄▄▄▄█  █▄▄▄▄▄█  █▄▄▄▄▄    │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 🎫 Bilet ID: #ETK2025-1542         │
│ 👤 Ahmet Yılmaz                    │
│ 📱 +90 555 123 4567                │
│                                     │
│ ✅ Kayıt Onaylandı                 │
│ 🕐 Giriş: 19:30 - 20:15            │
│                                     │
│ [📍 LOKASYON] [⏰ HATIRLATICI AYARlA]│
│                                     │
│ 💡 İpucu: QR kodu personele         │
│ göstererek giriş yapabilirsiniz.    │
└─────────────────────────────────────┘
```

#### QR Tarayıcı (Belediye Personeli İçin):
```
┌─────────────────────────────────────┐
│ QR KOD TARAYICI                     │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │        📹 KAMERA                │ │
│ │                                 │ │
│ │   [  QR kodu çerçeve içine  ]   │ │ Camera View
│ │   [  yerleştirin ve bekleyin ]  │ │
│ │                                 │ │
│ │        💡 El feneri: [○]       │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Son Tarama: ✅ Ahmet Y. (19:45)     │
│                                     │
│ 📊 ETKİNLİK İSTATİSTİKLERİ          │
│ • Toplam Kapasite: 500 kişi        │
│ • Şu an içeride: 127 kişi          │ Real-time Stats
│ • Bugün giriş: 127 kişi            │
│ • Kayıtlı toplam: 340 kişi         │
│                                     │
│ [📋 KATILIMCI LİSTESİ] [📊 RAPOR]   │
└─────────────────────────────────────┘
```

### 3.6 Belediye Admin Paneli

#### Dashboard Ana Sayfası:
```
┌─────────────────────────────────────┐
│ 🏛️ Kadıköy Belediyesi Admin Panel   │
│ 👤 Kültür Müdürü: Mehmet YILMAZ     │
├─────────────────────────────────────┤
│                                     │
│ 📊 ÖZET İSTATİSTİKLER              │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐│
│ │  47  │ │ 1.247│ │ 4.8  │ │ 89%  ││
│ │Etkinlik│Katıl.│Rating│ Dolu.││
│ │ Bu Ay │Total │Ort. │ Ort. ││
│ └──────┘ └──────┘ └──────┘ └──────┘│
│                                     │
│ 📈 [Detaylı Grafik Görünümü]        │
│                                     │
│ ⚡ HIZLI ERİŞİM                     │
│ [➕ Yeni Etkinlik] [📊 Raporlar]    │
│ [👥 Katılımcılar] [⚙️ Ayarlar]      │
│                                     │
│ 🔥 AKTİF ETKİNLİKLER               │
│ • Hamlet (15 Mar) - 340 kayıt      │
│ • Konser (16 Mar) - 156 kayıt       │
│ • Sergi (17 Mar) - 89 kayıt        │
│                                     │
│ 📝 BEKLEYEN GÖREVLER               │
│ • 3 etkinlik onay bekliyor          │
│ • 12 katılımcı geri bildirimi       │
│ • 1 iptal talebi incelemede         │
└─────────────────────────────────────┘
```

#### Etkinlik Yönetimi:
```
┌─────────────────────────────────────┐
│ ETKİNLİK YÖNETİMİ                   │
│ [➕ Yeni Ekle] [📊 Analiz] [⚙️]      │
├─────────────────────────────────────┤
│                                     │
│ 🔍 [Etkinlik ara...] [🗓️][📊][⚙️]   │
│                                     │
│ ┌─ Hamlet Tiyatro ─────────────────┐│
│ │ 📅 15 Mar 2025  👥 340/500      ││
│ │ 📍 Kültür Merkezi 💰 Ücretsiz   ││
│ │ ✅ Aktif  🔔 16 saat kaldı      ││
│ │ [✏️ Düzenle] [📊 Detay] [⏹️ Durdur]││
│ └─────────────────────────────────┘│
│                                     │
│ ┌─ Müzik Dinletisi ────────────────┐│
│ │ 📅 16 Mar 2025  👥 156/200      ││
│ │ 📍 Sahil Parkı   💰 Ücretsiz    ││
│ │ ⏸️ Taslak  📝 Onay bekliyor      ││
│ │ [✏️ Düzenle] [✅ Onayla] [❌ Reddet]││
│ └─────────────────────────────────┘│
│                                     │
│ [Sayfa: 1 2 3 ... 12] [25/sayfa]    │
└─────────────────────────────────────┘
```

#### Analitik ve Raporlama:
```
📊 ANALİTİK RAPOR

📈 ETKİNLİK TRENDLERİ
[Son 6 ay grafik - çizgi, bar, daire grafikler]

📊 KATEGORİ DAĞILIMI
🎭 Kültür: 35% (47 etkinlik)
🎵 Müzik: 28% (38 etkinlik) 
🎨 Sanat: 22% (29 etkinlik)
🏃 Spor: 15% (20 etkinlik)

👥 KATILIM ANALİZİ
• Ortalama katılım: 78%
• En popüler gün: Cumartesi
• En popüler saat: 19:00-21:00
• Tekrar eden katılımcı: 34%

📱 PLATFORM KULLANIMI
• Mobil: 67%
• Desktop: 33%
• Ortalama kayıt süresi: 3.4 gün önceden
• QR kod kullanım oranı: 89%

[📊 PDF İNDİR] [📧 E-POSTA GÖNDER]
```

## 4. TEKNİK GEREKSİNİMLER

### 4.1 Frontend Teknolojileri

#### Ana Teknoloji Stack'i:

1. **Web Uygulaması**
   ```javascript
   // Core Framework
   React 18+ (Hooks, Suspense, Concurrent Features)
   Next.js 14+ (App Router, SSR, SSG, ISR)
   TypeScript 5+ (Type Safety, Developer Experience)
   
   // State Management
   Zustand (Lightweight, Simple) 
   React Query/TanStack Query (Server State)
   
   // Styling & UI
   Tailwind CSS 3+ (Utility-first)
   Headless UI (Accessible Components)
   Framer Motion (Animations)
   React Hook Form (Form Management)
   
   // Maps & Visualization
   Mapbox GL JS (Interactive Maps)
   Chart.js / Recharts (Analytics)
   React-QR-Code (QR Generation)
   ```

2. **Mobil Uygulama (Hybrid)**
   ```javascript
   // Primary Choice: PWA + Capacitor
   - Progressive Web App (Service Worker, Offline)
   - Capacitor (Native Bridge for Camera, GPS, Push)
   - Same React/Next.js codebase
   
   // Alternative: React Native
   - React Native 0.73+
   - Expo SDK 50+ (Managed Workflow)
   - React Navigation 6+
   ```

3. **Geliştirme Araçları**
   ```bash
   # Build & Development
   Vite 5+ (Fast HMR, Build Tool)
   ESLint + Prettier (Code Quality)
   Husky + Lint-staged (Git Hooks)
   
   # Testing
   Vitest (Unit Testing)
   Playwright (E2E Testing)
   React Testing Library (Component Testing)
   
   # Deployment
   Vercel (Frontend Hosting)
   Docker (Containerization)
   GitHub Actions (CI/CD)
   ```

### 4.2 Backend Yapısı

#### Microservices Architecture:

1. **API Gateway & Load Balancer**
   ```yaml
   # Nginx/Traefik Configuration
   services:
     api-gateway:
       image: nginx:alpine
       # Route management, SSL termination, Load balancing
     
     rate-limiter:
       # Redis-based rate limiting
       # DDoS protection
   ```

2. **Core Services (Node.js/Python)**
   ```javascript
   // User Service (Node.js + Express/Fastify)
   - Authentication & Authorization (JWT + Refresh Tokens)
   - User profile management
   - Session management
   
   // Event Service (Node.js + Express/Fastify)
   - Event CRUD operations
   - Search & filtering
   - Category management
   - Recommendation engine
   
   // Notification Service (Python + FastAPI)
   - Push notifications (Firebase FCM)
   - Email notifications (SendGrid/AWS SES)
   - SMS notifications (Twilio)
   
   // Analytics Service (Python + FastAPI)
   - Event tracking
   - User behavior analysis
   - Reporting & dashboard data
   
   // QR Code Service (Go/Node.js)
   - QR code generation
   - Validation & verification
   - Check-in/out logic
   
   // File Upload Service
   - Image processing (Sharp/ImageMagick)
   - CDN integration (AWS CloudFront/Cloudinary)
   - File validation & security
   ```

3. **Real-time Features**
   ```javascript
   // WebSocket Server (Socket.io/ws)
   - Real-time capacity updates
   - Live event status changes
   - Admin panel real-time stats
   - Chat/messaging (future feature)
   ```

### 4.3 Veritabanı Tasarımı

#### Database Schema (PostgreSQL + Redis + MongoDB):

1. **Primary Database: PostgreSQL**
   ```sql
   -- Users Table
   CREATE TABLE users (
       user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       email VARCHAR(255) UNIQUE NOT NULL,
       password_hash VARCHAR(255) NOT NULL,
       first_name VARCHAR(100) NOT NULL,
       last_name VARCHAR(100) NOT NULL,
       phone VARCHAR(20),
       date_of_birth DATE,
       profile_picture_url TEXT,
       city VARCHAR(100),
       district VARCHAR(100),
       interests TEXT[], -- JSONB array
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       is_active BOOLEAN DEFAULT TRUE,
       email_verified BOOLEAN DEFAULT FALSE,
       phone_verified BOOLEAN DEFAULT FALSE
   );

   -- Municipalities Table  
   CREATE TABLE municipalities (
       municipality_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       name VARCHAR(255) NOT NULL,
       city VARCHAR(100) NOT NULL,
       district VARCHAR(100),
       type VARCHAR(50) NOT NULL, -- 'metropolitan', 'district', 'town'
       population INTEGER,
       mayor_name VARCHAR(255),
       contact_email VARCHAR(255),
       contact_phone VARCHAR(20),
       website_url TEXT,
       logo_url TEXT,
       address TEXT,
       latitude DECIMAL(10, 8),
       longitude DECIMAL(11, 8),
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       is_active BOOLEAN DEFAULT TRUE
   );

   -- Events Table
   CREATE TABLE events (
       event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       municipality_id UUID REFERENCES municipalities(municipality_id),
       title VARCHAR(500) NOT NULL,
       description TEXT,
       category_id UUID REFERENCES categories(category_id),
       subcategory_id UUID REFERENCES subcategories(subcategory_id),
       start_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
       end_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
       venue_name VARCHAR(255),
       venue_address TEXT,
       venue_latitude DECIMAL(10, 8),
       venue_longitude DECIMAL(11, 8),
       capacity INTEGER,
       current_registrations INTEGER DEFAULT 0,
       price DECIMAL(10, 2) DEFAULT 0.00,
       is_free BOOLEAN DEFAULT TRUE,
       registration_required BOOLEAN DEFAULT TRUE,
       registration_start TIMESTAMP WITH TIME ZONE,
       registration_end TIMESTAMP WITH TIME ZONE,
       age_restriction INTEGER, -- minimum age
       accessibility_info TEXT,
       images TEXT[], -- JSONB array of image URLs
       tags TEXT[], -- JSONB array
       status VARCHAR(50) DEFAULT 'draft', -- draft, active, cancelled, completed
       created_by UUID REFERENCES users(user_id),
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Event Registrations Table
   CREATE TABLE event_registrations (
       registration_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       event_id UUID REFERENCES events(event_id),
       user_id UUID REFERENCES users(user_id),
       registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       status VARCHAR(50) DEFAULT 'registered', -- registered, attended, no_show, cancelled
       qr_code VARCHAR(255) UNIQUE NOT NULL,
       check_in_time TIMESTAMP WITH TIME ZONE,
       check_out_time TIMESTAMP WITH TIME ZONE,
       guest_count INTEGER DEFAULT 1,
       special_requirements TEXT,
       rating INTEGER CHECK (rating >= 1 AND rating <= 5),
       review TEXT,
       review_date TIMESTAMP WITH TIME ZONE
   );

   -- Categories & Subcategories
   CREATE TABLE categories (
       category_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       name VARCHAR(255) NOT NULL,
       slug VARCHAR(255) UNIQUE NOT NULL,
       description TEXT,
       icon VARCHAR(100),
       color VARCHAR(7), -- hex color
       sort_order INTEGER DEFAULT 0,
       is_active BOOLEAN DEFAULT TRUE
   );

   CREATE TABLE subcategories (
       subcategory_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       category_id UUID REFERENCES categories(category_id),
       name VARCHAR(255) NOT NULL,
       slug VARCHAR(255) NOT NULL,
       icon VARCHAR(100),
       is_active BOOLEAN DEFAULT TRUE
   );
   ```

2. **Caching Layer: Redis**
   ```redis
   # Session Storage
   session:{user_id} -> {session_data}
   
   # Event Cache (frequently accessed events)
   event:{event_id} -> {event_json}
   events:popular:{city} -> [event_ids]
   events:recent:{city} -> [event_ids]
   
   # Search Cache
   search:{query_hash} -> {results_json}
   
   # Rate Limiting
   rate_limit:{ip}:{endpoint} -> {request_count}
   
   # Real-time Counters
   event_capacity:{event_id} -> {current_count}
   ```

3. **Analytics & Logs: MongoDB**
   ```javascript
   // User Activity Collection
   {
     "_id": ObjectId,
     "user_id": "uuid",
     "action": "view_event|register_event|search",
     "event_id": "uuid",
     "metadata": {
       "search_query": "string",
       "filters": {},
       "device_info": {},
       "location": { "lat": 0, "lng": 0 }
     },
     "timestamp": ISODate,
     "session_id": "string"
   }
   
   // System Logs Collection  
   {
     "_id": ObjectId,
     "level": "info|warn|error",
     "service": "user-service|event-service",
     "message": "string",
     "error_stack": "string",
     "request_id": "string",
     "timestamp": ISODate
   }
   ```

### 4.4 API Endpoints

#### RESTful API Design:

1. **Authentication & Users**
   ```javascript
   // Authentication
   POST /api/v1/auth/register
   POST /api/v1/auth/login
   POST /api/v1/auth/refresh
   POST /api/v1/auth/logout
   POST /api/v1/auth/forgot-password
   POST /api/v1/auth/reset-password
   POST /api/v1/auth/verify-email
   POST /api/v1/auth/verify-phone
   
   // Users
   GET    /api/v1/users/me
   PUT    /api/v1/users/me
   DELETE /api/v1/users/me
   GET    /api/v1/users/me/events
   GET    /api/v1/users/me/favorites
   POST   /api/v1/users/me/favorites/{event_id}
   DELETE /api/v1/users/me/favorites/{event_id}
   ```

2. **Events & Search**
   ```javascript
   // Events
   GET    /api/v1/events
   GET    /api/v1/events/{event_id}
   POST   /api/v1/events/{event_id}/register
   DELETE /api/v1/events/{event_id}/register
   POST   /api/v1/events/{event_id}/review
   GET    /api/v1/events/{event_id}/reviews
   
   // Search & Filtering
   GET    /api/v1/events/search?q={query}&city={city}&category={cat}
   GET    /api/v1/events/recommendations?user_id={id}&limit={n}
   GET    /api/v1/events/nearby?lat={lat}&lng={lng}&radius={km}
   GET    /api/v1/events/popular?city={city}&period={week|month}
   GET    /api/v1/events/trending?limit={n}
   ```

3. **Categories & Municipalities**
   ```javascript
   // Categories
   GET /api/v1/categories
   GET /api/v1/categories/{category_id}/subcategories
   
   // Municipalities
   GET /api/v1/municipalities
   GET /api/v1/municipalities/{municipality_id}
   GET /api/v1/municipalities/{municipality_id}/events
   ```

4. **QR Code & Check-in**
   ```javascript
   // QR Code Generation
   POST /api/v1/qr/generate/{registration_id}
   GET  /api/v1/qr/validate/{qr_code}
   POST /api/v1/qr/check-in
   POST /api/v1/qr/check-out
   ```

5. **Admin Panel (Municipality)**
   ```javascript
   // Admin Authentication
   POST /api/v1/admin/auth/login
   POST /api/v1/admin/auth/refresh
   
   // Event Management
   GET    /api/v1/admin/events
   POST   /api/v1/admin/events
   GET    /api/v1/admin/events/{event_id}
   PUT    /api/v1/admin/events/{event_id}
   DELETE /api/v1/admin/events/{event_id}
   POST   /api/v1/admin/events/{event_id}/publish
   
   // Analytics
   GET /api/v1/admin/analytics/dashboard
   GET /api/v1/admin/analytics/events/{event_id}
   GET /api/v1/admin/analytics/reports/{type}
   ```

### 4.5 QR Kod Sistemi

#### QR Code Implementation:

1. **QR Kod Üretimi**
   ```javascript
   // QR Code Structure
   const qrData = {
     type: 'event_registration',
     registration_id: 'uuid',
     event_id: 'uuid',
     user_id: 'uuid',
     expires_at: 'iso_timestamp',
     signature: 'hmac_sha256_hash' // Security signature
   };
   
   // QR String Format
   const qrString = base64Encode(encrypt(JSON.stringify(qrData)));
   
   // QR Code Generation (Server-side)
   const qrCode = await QRCode.toDataURL(qrString, {
     width: 300,
     margin: 2,
     color: {
       dark: '#000000',
       light: '#FFFFFF'
     },
     errorCorrectionLevel: 'M'
   });
   ```

2. **QR Kod Doğrulama Süreci**
   ```javascript
   // Validation Flow
   async function validateQRCode(qrString) {
     try {
       // 1. Decode and decrypt
       const qrData = JSON.parse(decrypt(base64Decode(qrString)));
       
       // 2. Verify signature
       const expectedSignature = createHMAC(
         qrData.registration_id + qrData.event_id + qrData.user_id
       );
       if (qrData.signature !== expectedSignature) {
         throw new Error('Invalid signature');
       }
       
       // 3. Check expiration
       if (new Date() > new Date(qrData.expires_at)) {
         throw new Error('QR code expired');
       }
       
       // 4. Validate against database
       const registration = await getRegistration(qrData.registration_id);
       if (!registration || registration.status !== 'registered') {
         throw new Error('Invalid registration');
       }
       
       // 5. Check event timing
       const event = await getEvent(qrData.event_id);
       const now = new Date();
       const eventStart = new Date(event.start_datetime);
       const checkInWindow = 60 * 60 * 1000; // 1 hour before event
       
       if (now < eventStart - checkInWindow) {
         throw new Error('Check-in not yet available');
       }
       
       return { valid: true, registration, event, user };
       
     } catch (error) {
       return { valid: false, error: error.message };
     }
   }
   ```

3. **Offline Support**
   ```javascript
   // Generate offline-capable QR codes
   const offlineQR = {
     ...qrData,
     offline_token: generateOfflineToken(),
     sync_required: true
   };
   
   // Offline validation (when internet unavailable)
   function validateOfflineQR(qrData, cachedEvents) {
     // Basic validation using cached data
     // Mark for sync when online
   }
   ```

### 4.6 Güvenlik Önlemleri

#### Security Implementation:

1. **Authentication & Authorization**
   ```javascript
   // JWT Implementation
   const tokenConfig = {
     access: {
       secret: process.env.JWT_ACCESS_SECRET,
       expiresIn: '15m'
     },
     refresh: {
       secret: process.env.JWT_REFRESH_SECRET,
       expiresIn: '7d'
     }
   };
   
   // Role-based Access Control
   const permissions = {
     user: ['read:events', 'create:registration', 'read:own_profile'],
     admin: ['read:events', 'write:events', 'read:analytics'],
     super_admin: ['*']
   };
   ```

2. **Data Protection**
   ```javascript
   // Encryption at Rest
   const crypto = require('crypto');
   
   // Sensitive data encryption
   function encryptSensitiveData(data) {
     const cipher = crypto.createCipher('aes-256-gcm', process.env.ENCRYPTION_KEY);
     return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
   }
   
   // Password Hashing
   const bcrypt = require('bcrypt');
   const saltRounds = 12;
   
   async function hashPassword(password) {
     return await bcrypt.hash(password, saltRounds);
   }
   ```

3. **API Security**
   ```javascript
   // Rate Limiting
   const rateLimit = {
     '/api/auth/login': { windowMs: 15 * 60 * 1000, max: 5 }, // 5 tries per 15min
     '/api/events/search': { windowMs: 1 * 60 * 1000, max: 60 }, // 60 per minute
     '/api/qr/validate': { windowMs: 1 * 60 * 1000, max: 30 }
   };
   
   // Input Validation & Sanitization
   const joi = require('joi');
   
   const eventSchema = joi.object({
     title: joi.string().min(3).max(500).required(),
     description: joi.string().max(5000),
     start_datetime: joi.date().iso().required(),
     capacity: joi.number().integer().min(1).max(100000)
   });
   ```

4. **Infrastructure Security**
   ```yaml
   # Docker Security
   security_opt:
     - no-new-privileges:true
   user: "1000:1000"
   read_only: true
   
   # Network Security
   networks:
     backend:
       internal: true
     frontend:
       external: true
   
   # Environment Variables
   environment:
     - NODE_ENV=production
     - JWT_SECRET_FILE=/run/secrets/jwt_secret
     - DB_PASSWORD_FILE=/run/secrets/db_password
   ```

5. **GDPR Compliance**
   ```javascript
   // Data Privacy Features
   const privacyFeatures = {
     dataPortability: '/api/users/export-data',
     rightToErasure: '/api/users/delete-account',
     consentManagement: '/api/users/consent',
     dataMinimization: 'collect only necessary data',
     pseudonymization: 'hash/encrypt personal identifiers'
   };
   
   // Cookie Policy
   const cookieConsent = {
     necessary: ['session', 'csrf_token'], // Always allowed
     functional: ['language', 'theme'], // User preference
     analytics: ['ga_tracking', 'event_analytics'], // Requires consent
     marketing: ['fb_pixel', 'google_ads'] // Requires consent
   };
   ```

## 5. UI/UX DETAYLARI

### 5.1 Renk Paleti

#### Ana Marka Renkleri:

```css
/* Primary Colors - Türkiye Teması */
--primary-red: #E30A17;        /* Türk Bayrağı Kırmızısı */
--primary-red-light: #FF6B75;  /* Açık kırmızı vurgu */
--primary-red-dark: #B8000C;   /* Koyu kırmızı (hover) */

/* Secondary Colors - Belediye Teması */
--secondary-blue: #2563EB;     /* Kurumsal mavi */
--secondary-blue-light: #60A5FA; /* Açık mavi */
--secondary-blue-dark: #1D4ED8;  /* Koyu mavi */

/* Neutral Colors - Modern & Clean */
--neutral-50: #F8FAFC;   /* Background light */
--neutral-100: #F1F5F9;  /* Card background */
--neutral-200: #E2E8F0;  /* Border light */
--neutral-300: #CBD5E1;  /* Border */
--neutral-400: #94A3B8;  /* Text muted */
--neutral-500: #64748B;  /* Text secondary */
--neutral-600: #475569;  /* Text primary */
--neutral-700: #334155;  /* Text dark */
--neutral-800: #1E293B;  /* Heading */
--neutral-900: #0F172A;  /* Black */

/* Accent Colors - Kategori Kodlama */
--accent-culture: #8B5CF6;    /* Violet - Kültür */
--accent-music: #EC4899;      /* Pink - Müzik */
--accent-sport: #10B981;      /* Emerald - Spor */
--accent-education: #F59E0B;  /* Amber - Eğitim */
--accent-social: #06B6D4;     /* Cyan - Sosyal */
--accent-art: #EF4444;        /* Red - Sanat */
--accent-family: #84CC16;     /* Lime - Aile */
--accent-business: #6366F1;   /* Indigo - İş */

/* Status Colors - Sistem Durumları */
--success: #10B981;    /* Başarılı işlemler */
--warning: #F59E0B;    /* Uyarı mesajları */
--error: #EF4444;      /* Hata durumları */
--info: #3B82F6;       /* Bilgi mesajları */

/* Gradient Colors - Modern Dokunuşlar */
--gradient-primary: linear-gradient(135deg, #E30A17 0%, #B8000C 100%);
--gradient-secondary: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
--gradient-sunset: linear-gradient(135deg, #FF6B75 0%, #EC4899 100%);
```

#### Renk Kullanım Kuralları:

1. **Accessibility First Approach**
   - Tüm renk kombinasyonları WCAG 2.1 AA standardına uygun
   - Minimum contrast ratio 4.5:1 (normal metin)
   - Minimum contrast ratio 3:1 (büyük metin ve UI elementler)

2. **Kategori Renk Sistemi**
   ```css
   .category-culture { --category-color: var(--accent-culture); }
   .category-music { --category-color: var(--accent-music); }
   .category-sport { --category-color: var(--accent-sport); }
   .category-education { --category-color: var(--accent-education); }
   
   .category-tag {
     background-color: color-mix(in srgb, var(--category-color) 10%, white);
     border: 1px solid color-mix(in srgb, var(--category-color) 30%, white);
     color: var(--category-color);
   }
   ```

### 5.2 Tipografi

#### Font Ailesi Seçimi:

```css
/* Primary Font Stack - Modern & Türkçe Desteği */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 
                'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 
                'Cantarell', sans-serif;

/* Heading Font - Daha Karakteristik */
--font-heading: 'Poppins', -apple-system, BlinkMacSystemFont, 
                'Segoe UI', sans-serif;

/* Monospace - Kod ve Teknik Bilgiler */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', 
             'Monaco', monospace;

/* Arabic/Ottoman Style (Özel Durumlarda) */
--font-arabic: 'Noto Naskh Arabic', 'Times New Roman', serif;
```

#### Tipografi Scale Sistemi:

```css
/* Modern Type Scale (1.250 - Major Third) */
--text-xs: 0.75rem;      /* 12px - Küçük etiketler */
--text-sm: 0.875rem;     /* 14px - Yardımcı metin */
--text-base: 1rem;       /* 16px - Ana metin */
--text-lg: 1.125rem;     /* 18px - Büyük metin */
--text-xl: 1.25rem;      /* 20px - Küçük başlık */
--text-2xl: 1.5rem;      /* 24px - Alt başlık */
--text-3xl: 1.875rem;    /* 30px - Sayfa başlığı */
--text-4xl: 2.25rem;     /* 36px - Ana başlık */
--text-5xl: 3rem;        /* 48px - Hero başlık */
--text-6xl: 3.75rem;     /* 60px - Banner başlık */

/* Font Weights */
--font-thin: 100;
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
--font-black: 900;

/* Line Heights */
--leading-tight: 1.25;    /* Başlıklar için */
--leading-snug: 1.375;    /* Kart başlıkları için */
--leading-normal: 1.5;    /* Ana metin için */
--leading-relaxed: 1.625; /* Uzun metinler için */
--leading-loose: 2;       /* Çok rahat okuma için */
```

#### Tipografi Component Sistemi:

```css
/* Heading Styles */
.heading-1 { /* Ana sayfa hero başlık */
  font-family: var(--font-heading);
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.025em;
}

.heading-2 { /* Sayfa başlıkları */
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
}

.heading-3 { /* Bölüm başlıkları */
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
}

/* Body Text Styles */
.body-large { /* Önemli açıklamalar */
  font-family: var(--font-primary);
  font-size: var(--text-lg);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
}

.body-normal { /* Standart metin */
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}

.body-small { /* Yardımcı bilgiler */
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}

/* Specialized Text */
.text-caption { /* Küçük etiketler */
  font-family: var(--font-primary);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.text-button { /* Buton metinleri */
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}
```

### 5.3 İkon Seti ve Görsel Dil

#### İkon Sistemi:

1. **Ana İkon Kütüphanesi: Heroicons + Custom Icons**
   ```javascript
   // Heroicons - Temel UI ikonları için
   import {
     HomeIcon, SearchIcon, CalendarIcon, MapPinIcon,
     UserIcon, HeartIcon, ShareIcon, QrCodeIcon
   } from '@heroicons/react/24/outline';
   
   // Custom Icons - Kategori özel ikonları
   const CategoryIcons = {
     culture: '🎭', music: '🎵', sport: '⚽', education: '📚',
     social: '🤝', art: '🎨', family: '👨‍👩‍👧‍👦', business: '💼'
   };
   ```

2. **İkon Boyut Sistemi**
   ```css
   --icon-xs: 12px;    /* Küçük inline ikonlar */
   --icon-sm: 16px;    /* Metin yanı ikonlar */
   --icon-md: 20px;    /* Buton ikonları */
   --icon-lg: 24px;    /* Navigation ikonları */
   --icon-xl: 32px;    /* Kart başlık ikonları */
   --icon-2xl: 48px;   /* Feature ikonları */
   --icon-3xl: 64px;   /* Hero section ikonları */
   ```

3. **İkon Kullanım Kuralları**
   - Tüm ikonlar 24x24 grid sistemi üzerinde tasarlanmalı
   - Minimum 2px stroke width (accessibility için)
   - Kategori ikonları için emoji + outline ikon kombinasyonu
   - Durum ikonları (success, warning, error) için renk kodlama

#### Görsel Hiyerarşi:

```css
/* Card Component Hierarchy */
.event-card {
  /* Ana kart yapısı */
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  transition: all 0.2s ease-in-out;
}

.event-card:hover {
  /* Hover efekti */
  box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1);
  transform: translateY(-2px);
}

/* Visual Hierarchy Elements */
.badge { /* Kategori ve durum rozetleri */
  padding: 4px 8px;
  border-radius: 6px;
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.divider { /* Bölüm ayırıcılar */
  height: 1px;
  background: linear-gradient(to right, 
    transparent, 
    var(--neutral-200), 
    transparent
  );
}
```

### 5.4 Responsive Tasarım

#### Breakpoint Sistemi:

```css
/* Mobile-First Breakpoints */
:root {
  --screen-xs: 475px;    /* Small phones */
  --screen-sm: 640px;    /* Large phones */
  --screen-md: 768px;    /* Tablets */
  --screen-lg: 1024px;   /* Small laptops */
  --screen-xl: 1280px;   /* Large laptops */
  --screen-2xl: 1536px;  /* Desktops */
}

/* Container Sizes */
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem; /* 16px */
}

@media (min-width: 640px) {
  .container { max-width: 640px; padding: 0 1.5rem; }
}
@media (min-width: 768px) {
  .container { max-width: 768px; padding: 0 2rem; }
}
@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}
@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}
```

#### Responsive Component Davranışları:

1. **Navigation System**
   ```css
   /* Mobile Navigation */
   .mobile-nav {
     position: fixed;
     bottom: 0;
     left: 0;
     right: 0;
     display: flex;
     justify-content: space-around;
     background: white;
     border-top: 1px solid var(--neutral-200);
   }
   
   /* Desktop Navigation */
   @media (min-width: 1024px) {
     .mobile-nav { display: none; }
     .desktop-nav {
       display: flex;
       justify-content: space-between;
       align-items: center;
     }
   }
   ```

2. **Grid Sistemi - Events Layout**
   ```css
   .events-grid {
     display: grid;
     gap: 1rem;
     grid-template-columns: 1fr; /* Mobile: 1 column */
   }
   
   @media (min-width: 640px) {
     .events-grid {
       grid-template-columns: repeat(2, 1fr); /* Tablet: 2 columns */
     }
   }
   
   @media (min-width: 1024px) {
     .events-grid {
       grid-template-columns: repeat(3, 1fr); /* Desktop: 3 columns */
       gap: 1.5rem;
     }
   }
   
   @media (min-width: 1280px) {
     .events-grid {
       grid-template-columns: repeat(4, 1fr); /* Large: 4 columns */
       gap: 2rem;
     }
   }
   ```

3. **Typography Responsive Scaling**
   ```css
   /* Fluid Typography */
   .hero-title {
     font-size: clamp(1.875rem, 4vw, 3rem); /* 30px - 48px */
   }
   
   .section-title {
     font-size: clamp(1.5rem, 3vw, 2.25rem); /* 24px - 36px */
   }
   
   .body-text {
     font-size: clamp(0.875rem, 2vw, 1rem); /* 14px - 16px */
   }
   ```

### 5.5 Erişilebilirlik (Accessibility)

#### WCAG 2.1 AA Uyumluluğu:

1. **Renk ve Kontrast**
   ```css
   /* High Contrast Mode Support */
   @media (prefers-contrast: high) {
     :root {
       --primary-red: #D00000;
       --neutral-600: #000000;
       --neutral-400: #444444;
     }
   }
   
   /* Reduced Motion Support */
   @media (prefers-reduced-motion: reduce) {
     * {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

2. **Klavye Navigasyon**
   ```css
   /* Focus States */
   .focusable {
     outline: none;
     position: relative;
   }
   
   .focusable:focus-visible::before {
     content: '';
     position: absolute;
     inset: -2px;
     border: 2px solid var(--primary-blue);
     border-radius: 6px;
     background: var(--primary-blue);
     opacity: 0.1;
   }
   
   /* Skip Links */
   .skip-link {
     position: absolute;
     top: -40px;
     left: 6px;
     background: var(--primary-red);
     color: white;
     padding: 8px;
     text-decoration: none;
     border-radius: 4px;
   }
   
   .skip-link:focus {
     top: 6px;
   }
   ```

3. **Screen Reader Support**
   ```html
   <!-- Semantic HTML Structure -->
   <main role="main" aria-label="Ana içerik">
     <section aria-labelledby="events-heading">
       <h2 id="events-heading">Popüler Etkinlikler</h2>
       
       <article aria-label="Hamlet Tiyatro Oyunu">
         <h3>Hamlet</h3>
         <p aria-label="Tarih ve saat">15 Mart 2025, Cumartesi 20:00</p>
         <p aria-label="Konum">Kadıköy Kültür Merkezi</p>
         <button aria-label="Hamlet etkinliğine kayıt ol">
           Kayıt Ol
         </button>
       </article>
     </section>
   </main>
   
   <!-- ARIA Labels ve Descriptions -->
   <button aria-describedby="register-help">Kayıt Ol</button>
   <div id="register-help" class="sr-only">
     Bu etkinliğe kayıt olmak için butona tıklayın
   </div>
   ```

4. **Responsive Font Scaling**
   ```css
   /* Support for user font size preferences */
   html {
     font-size: 100%; /* Respect user browser settings */
   }
   
   /* Scalable components */
   .button {
     padding: 0.75em 1.5em; /* em units for scaling */
     font-size: 1rem;
   }
   
   .input {
     padding: 0.75em 1em;
     font-size: 1rem;
     line-height: 1.5;
   }
   ```

#### Accessibility Testing Checklist:

1. **Automated Testing**
   - axe-core integration
   - Lighthouse accessibility audit
   - WAVE tool validation

2. **Manual Testing**
   - Keyboard-only navigation
   - Screen reader testing (NVDA, JAWS)
   - High contrast mode
   - 200% zoom level usability

3. **User Testing**
   - Testing with actual users with disabilities
   - Feedback collection and iteration
   - Continuous improvement process

### 5.6 Animation ve Mikro-Etkileşimler

#### Animation Sistemi:

```css
/* Animation Tokens */
:root {
  --duration-instant: 0ms;
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
  
  --easing-linear: linear;
  --easing-ease: ease;
  --easing-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --easing-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Common Transitions */
.transition-default {
  transition: all var(--duration-normal) var(--easing-ease-out);
}

.transition-colors {
  transition: color var(--duration-fast) var(--easing-ease-out),
              background-color var(--duration-fast) var(--easing-ease-out),
              border-color var(--duration-fast) var(--easing-ease-out);
}

.transition-transform {
  transition: transform var(--duration-normal) var(--easing-ease-out);
}

/* Hover Effects */
.hover-lift:hover {
  transform: translateY(-2px);
}

.hover-scale:hover {
  transform: scale(1.02);
}

.hover-glow:hover {
  box-shadow: 0 0 20px var(--primary-red);
}
```

#### Mikro-Etkileşim Örnekleri:

```css
/* Loading States */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading-skeleton {
  background: linear-gradient(90deg, 
    var(--neutral-200) 25%, 
    var(--neutral-100) 50%, 
    var(--neutral-200) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Success Feedback */
@keyframes checkmark {
  0% {
    stroke-dasharray: 0 100;
  }
  100% {
    stroke-dasharray: 100 0;
  }
}

.success-checkmark {
  animation: checkmark var(--duration-slow) var(--easing-ease-out);
}

/* Button Press Feedback */
.button-press:active {
  transform: scale(0.98);
  transition: transform var(--duration-fast) var(--easing-ease-out);
}
```

## 6. ÖZELLİK DETAYLARI

### 6.1 Etkinlik Kategorileri

#### Ana Kategori Yapısı:

```javascript
const EventCategories = {
  culture: {
    id: 'culture',
    name: 'Kültür',
    slug: 'kultur',
    icon: '🎭',
    color: '#8B5CF6', // Violet
    description: 'Tiyatro, opera, edebiyat ve kültürel etkinlikler',
    subcategories: [
      { id: 'theater', name: 'Tiyatro', icon: '🎭' },
      { id: 'literature', name: 'Edebiyat', icon: '📚' },
      { id: 'opera', name: 'Opera', icon: '🎵' },
      { id: 'folklore', name: 'Halk Oyunları', icon: '💃' },
      { id: 'history', name: 'Tarih', icon: '🏛️' },
      { id: 'museum', name: 'Müze Etkinlikleri', icon: '🏛️' }
    ]
  },
  
  music: {
    id: 'music',
    name: 'Müzik',
    slug: 'muzik',
    icon: '🎵',
    color: '#EC4899', // Pink
    description: 'Konserler, müzik dinletileri ve müzikal etkinlikler',
    subcategories: [
      { id: 'classical', name: 'Klasik Müzik', icon: '🎻' },
      { id: 'folk', name: 'Halk Müziği', icon: '🪗' },
      { id: 'modern', name: 'Modern Müzik', icon: '🎸' },
      { id: 'jazz', name: 'Caz', icon: '🎷' },
      { id: 'choir', name: 'Koro', icon: '👥' },
      { id: 'festival', name: 'Müzik Festivali', icon: '🎪' }
    ]
  },
  
  art: {
    id: 'art',
    name: 'Sanat',
    slug: 'sanat',
    icon: '🎨',
    color: '#EF4444', // Red
    description: 'Sergiler, atölyeler ve sanat etkinlikleri',
    subcategories: [
      { id: 'exhibition', name: 'Sergi', icon: '🖼️' },
      { id: 'workshop', name: 'Atölye', icon: '🎨' },
      { id: 'sculpture', name: 'Heykel', icon: '🗿' },
      { id: 'photography', name: 'Fotoğraf', icon: '📸' },
      { id: 'handicraft', name: 'El Sanatları', icon: '🧵' },
      { id: 'ceramic', name: 'Seramik', icon: '🏺' }
    ]
  },
  
  sport: {
    id: 'sport',
    name: 'Spor',
    slug: 'spor',
    icon: '⚽',
    color: '#10B981', // Emerald
    description: 'Spor müsabakaları, turnuvalar ve fiziksel aktiviteler',
    subcategories: [
      { id: 'football', name: 'Futbol', icon: '⚽' },
      { id: 'basketball', name: 'Basketbol', icon: '🏀' },
      { id: 'volleyball', name: 'Voleybol', icon: '🏐' },
      { id: 'swimming', name: 'Yüzme', icon: '🏊' },
      { id: 'running', name: 'Koşu', icon: '🏃' },
      { id: 'fitness', name: 'Fitness', icon: '🏋️' }
    ]
  },
  
  education: {
    id: 'education',
    name: 'Eğitim',
    slug: 'egitim',
    icon: '📚',
    color: '#F59E0B', // Amber
    description: 'Seminerler, kurslar ve eğitici etkinlikler',
    subcategories: [
      { id: 'seminar', name: 'Seminer', icon: '🎯' },
      { id: 'workshop', name: 'Atölye', icon: '🔧' },
      { id: 'course', name: 'Kurs', icon: '📖' },
      { id: 'conference', name: 'Konferans', icon: '🎤' },
      { id: 'vocational', name: 'Meslek Kursu', icon: '💼' },
      { id: 'language', name: 'Dil Kursu', icon: '🗣️' }
    ]
  },
  
  social: {
    id: 'social',
    name: 'Sosyal',
    slug: 'sosyal',
    icon: '🤝',
    color: '#06B6D4', // Cyan
    description: 'Toplumsal etkinlikler, gönüllülük ve sosyal sorumluluk',
    subcategories: [
      { id: 'volunteer', name: 'Gönüllülük', icon: '❤️' },
      { id: 'charity', name: 'Yardım', icon: '🎁' },
      { id: 'community', name: 'Mahalle', icon: '🏘️' },
      { id: 'senior', name: 'Yaşlı Hizmetleri', icon: '👴' },
      { id: 'disability', name: 'Engelli Hizmetleri', icon: '♿' },
      { id: 'environment', name: 'Çevre', icon: '🌱' }
    ]
  },
  
  family: {
    id: 'family',
    name: 'Aile',
    slug: 'aile',
    icon: '👨‍👩‍👧‍👦',
    color: '#84CC16', // Lime
    description: 'Çocuklar ve aileler için etkinlikler',
    subcategories: [
      { id: 'children', name: 'Çocuk', icon: '👶' },
      { id: 'family_fun', name: 'Aile Eğlencesi', icon: '🎪' },
      { id: 'parenting', name: 'Ebeveynlik', icon: '👨‍👩‍👧' },
      { id: 'playground', name: 'Oyun Alanı', icon: '🛝' },
      { id: 'storytelling', name: 'Masal', icon: '📚' },
      { id: 'puppet_show', name: 'Kukla', icon: '🎭' }
    ]
  },
  
  business: {
    id: 'business',
    name: 'İş Dünyası',
    slug: 'is-dunyasi',
    icon: '💼',
    color: '#6366F1', // Indigo
    description: 'Girişimcilik, iş geliştirme ve ekonomik etkinlikler',
    subcategories: [
      { id: 'entrepreneurship', name: 'Girişimcilik', icon: '🚀' },
      { id: 'networking', name: 'Networking', icon: '🤝' },
      { id: 'startup', name: 'Startup', icon: '💡' },
      { id: 'investment', name: 'Yatırım', icon: '💰' },
      { id: 'market', name: 'Pazar', icon: '🏪' },
      { id: 'economy', name: 'Ekonomi', icon: '📊' }
    ]
  }
};
```

#### Kategori Dinamikleri:

1. **Popülerlik Algoritması**
   ```javascript
   // Kategori popülerlik hesaplama
   function calculateCategoryPopularity(category, timeframe) {
     const metrics = {
       registrations: getCategoryRegistrations(category, timeframe),
       views: getCategoryViews(category, timeframe),
       searches: getCategorySearches(category, timeframe),
       reviews: getCategoryReviews(category, timeframe)
     };
     
     return (
       metrics.registrations * 0.4 +
       metrics.views * 0.3 +
       metrics.searches * 0.2 +
       metrics.reviews * 0.1
     );
   }
   ```

2. **Sezonsal Kategori Önerileri**
   ```javascript
   const seasonalCategories = {
     spring: ['sport', 'family', 'social'], // Bahar
     summer: ['culture', 'music', 'art'],   // Yaz
     autumn: ['education', 'business'],     // Sonbahar
     winter: ['culture', 'education', 'art'] // Kış
   };
   ```

### 6.2 Filtreleme Seçenekleri

#### Gelişmiş Filtreleme Sistemi:

```javascript
const FilterOptions = {
  // Zaman Filtreleri
  dateFilters: {
    today: { label: 'Bugün', value: 'today' },
    tomorrow: { label: 'Yarın', value: 'tomorrow' },
    this_week: { label: 'Bu Hafta', value: 'this_week' },
    this_weekend: { label: 'Bu Hafta Sonu', value: 'this_weekend' },
    next_week: { label: 'Gelecek Hafta', value: 'next_week' },
    this_month: { label: 'Bu Ay', value: 'this_month' },
    custom: { label: 'Özel Tarih', value: 'custom' }
  },
  
  // Zaman Dilimleri
  timeSlots: {
    morning: { label: 'Sabah (06:00-12:00)', value: 'morning' },
    afternoon: { label: 'Öğleden Sonra (12:00-18:00)', value: 'afternoon' },
    evening: { label: 'Akşam (18:00-22:00)', value: 'evening' },
    night: { label: 'Gece (22:00-06:00)', value: 'night' }
  },
  
  // Lokasyon Filtreleri
  locationFilters: {
    proximity: [
      { label: 'Çok Yakın (1km)', value: 1 },
      { label: 'Yakın (5km)', value: 5 },
      { label: 'Orta (10km)', value: 10 },
      { label: 'Uzak (25km)', value: 25 },
      { label: 'Farketmez', value: null }
    ],
    districts: 'dynamic', // İl/ilçe listesi API'den gelir
    venues: 'dynamic'     // Mekan listesi API'den gelir
  },
  
  // Fiyat Filtreleri
  priceFilters: {
    free: { label: 'Ücretsiz', value: { min: 0, max: 0 } },
    budget: { label: 'Ekonomik (0-50₺)', value: { min: 0, max: 50 } },
    moderate: { label: 'Orta (50-100₺)', value: { min: 50, max: 100 } },
    premium: { label: 'Pahalı (100₺+)', value: { min: 100, max: null } },
    custom: { label: 'Özel Aralık', value: 'custom' }
  },
  
  // Kapasite Filtreleri
  capacityFilters: {
    intimate: { label: 'Küçük (1-50 kişi)', value: { min: 1, max: 50 } },
    medium: { label: 'Orta (51-200 kişi)', value: { min: 51, max: 200 } },
    large: { label: 'Büyük (201-500 kişi)', value: { min: 201, max: 500 } },
    massive: { label: 'Çok Büyük (500+ kişi)', value: { min: 500, max: null } }
  },
  
  // Erişilebilirlik Filtreleri
  accessibilityFilters: {
    wheelchair: { label: 'Tekerlekli Sandalye Erişimi', value: 'wheelchair_accessible' },
    hearing: { label: 'İşitme Engelli Desteği', value: 'hearing_support' },
    visual: { label: 'Görme Engelli Desteği', value: 'visual_support' },
    parking: { label: 'Engelli Otoparkı', value: 'accessible_parking' }
  },
  
  // Etkinlik Özellikleri
  eventFeatures: {
    registration_required: { label: 'Kayıt Gerekli', value: 'registration_required' },
    family_friendly: { label: 'Aile Dostu', value: 'family_friendly' },
    age_restricted: { label: 'Yaş Sınırı Var', value: 'age_restricted' },
    food_provided: { label: 'Yemek Var', value: 'food_provided' },
    certificate: { label: 'Sertifika Verilir', value: 'certificate_provided' },
    outdoor: { label: 'Açık Hava', value: 'outdoor' },
    indoor: { label: 'Kapalı Mekan', value: 'indoor' }
  }
};
```

#### Akıllı Filtreleme Algoritması:

```javascript
class SmartFilter {
  constructor(userProfile, eventHistory) {
    this.userProfile = userProfile;
    this.eventHistory = eventHistory;
  }
  
  // Kullanıcı davranışı bazlı filtre önerileri
  suggestFilters(searchContext) {
    const suggestions = [];
    
    // Geçmiş kategori tercihleri
    const preferredCategories = this.getMostAttendedCategories();
    if (preferredCategories.length > 0) {
      suggestions.push({
        type: 'category',
        values: preferredCategories,
        reason: 'Sıklıkla katıldığınız kategoriler'
      });
    }
    
    // Zaman tercihleri
    const preferredTimeSlots = this.getPreferredTimeSlots();
    if (preferredTimeSlots.length > 0) {
      suggestions.push({
        type: 'time_slot',
        values: preferredTimeSlots,
        reason: 'Genelde tercih ettiğiniz saatler'
      });
    }
    
    // Lokasyon tercihleri
    const preferredLocations = this.getPreferredLocations();
    if (preferredLocations.length > 0) {
      suggestions.push({
        type: 'location',
        values: preferredLocations,
        reason: 'Sıklıkla gittiğiniz bölgeler'
      });
    }
    
    return suggestions;
  }
  
  // Dinamik filtre optimizasyonu
  optimizeFilters(currentFilters) {
    // Çok dar filtre kombinasyonları için öneriler
    const resultCount = this.getFilteredResultCount(currentFilters);
    
    if (resultCount < 5) {
      return {
        type: 'suggestion',
        message: 'Çok az sonuç bulundu. Bu filtreleri gevşetmeyi deneyin:',
        suggestions: this.getSuggestionToExpandResults(currentFilters)
      };
    }
    
    if (resultCount > 100) {
      return {
        type: 'suggestion',
        message: 'Çok fazla sonuç bulundu. Bu filtreleri ekleyerek daraltabilirsiniz:',
        suggestions: this.getSuggestionToNarrowResults(currentFilters)
      };
    }
    
    return null;
  }
}
```

### 6.3 Bildirim Sistemi

#### Bildirim Türleri ve Kanalları:

```javascript
const NotificationTypes = {
  // Etkinlik İlgili Bildirimler
  event_reminder: {
    title: 'Etkinlik Hatırlatması',
    channels: ['push', 'email', 'sms'],
    timing: [
      { offset: '1_week_before', default: false },
      { offset: '1_day_before', default: true },
      { offset: '2_hours_before', default: true },
      { offset: '30_minutes_before', default: false }
    ],
    template: 'Etkinliğiniz {event_time} saatinde başlıyor: {event_title}'
  },
  
  event_update: {
    title: 'Etkinlik Güncelleme',
    channels: ['push', 'email'],
    critical: true,
    template: '{event_title} etkinliğinde güncelleme: {update_message}'
  },
  
  event_cancellation: {
    title: 'Etkinlik İptal',
    channels: ['push', 'email', 'sms'],
    critical: true,
    template: 'Maalesef {event_title} etkinliği iptal edildi. Detaylar: {reason}'
  },
  
  // Kayıt ve Katılım
  registration_success: {
    title: 'Kayıt Başarılı',
    channels: ['push', 'email'],
    immediate: true,
    template: '{event_title} etkinliğine kayıt başarılı! QR kodunuz hazır.'
  },
  
  waitlist_notification: {
    title: 'Bekleme Listesi',
    channels: ['push', 'email'],
    immediate: true,
    template: '{event_title} için bekleme listesine eklendiniz. Yer açılırsa haber vereceğiz!'
  },
  
  spot_available: {
    title: 'Yer Açıldı',
    channels: ['push', 'sms'],
    urgent: true,
    template: '{event_title} için yer açıldı! 24 saat içinde kayıt olabilirsiniz.'
  },
  
  // Keşif ve Öneriler
  new_event_recommendation: {
    title: 'Yeni Etkinlik Önerisi',
    channels: ['push'],
    frequency: 'weekly',
    template: 'İlginizi çekebilecek yeni bir etkinlik: {event_title}'
  },
  
  trending_event: {
    title: 'Popüler Etkinlik',
    channels: ['push'],
    frequency: 'daily',
    template: 'Bölgenizde popüler: {event_title} - {remaining_spots} yer kaldı!'
  },
  
  friend_activity: {
    title: 'Arkadaş Aktivitesi',
    channels: ['push'],
    social: true,
    template: '{friend_name} {event_title} etkinliğine katılacak. Siz de katılın!'
  },
  
  // Sistem Bildirimleri
  check_in_reminder: {
    title: 'Check-in Hatırlatması',
    channels: ['push'],
    location_triggered: true,
    template: '{event_title} için check-in yapmayı unutmayın!'
  },
  
  review_request: {
    title: 'Değerlendirme Daveti',
    channels: ['push', 'email'],
    post_event: true,
    delay: '2_hours',
    template: '{event_title} etkinliği nasıldı? Değerlendirmenizi bekliyoruz!'
  }
};
```

#### Bildirim Kişiselleştirmesi:

```javascript
class NotificationPersonalization {
  constructor(userProfile) {
    this.userProfile = userProfile;
  }
  
  // Kullanıcı davranışına göre bildirim zamanlaması
  optimizeNotificationTiming(notificationType, baseSchedule) {
    const userBehavior = this.userProfile.notificationBehavior;
    
    // En aktif olduğu saatler
    const activeHours = userBehavior.mostActiveHours || [9, 18];
    
    // Cihaz kullanım alışkanlıkları
    const deviceUsage = userBehavior.deviceUsage;
    
    // Geçmiş etkileşim oranları
    const engagementRates = userBehavior.engagementByTime;
    
    return this.adjustScheduleBasedOnBehavior(
      baseSchedule, 
      activeHours, 
      engagementRates
    );
  }
  
  // A/B test için bildirim varyantları
  createNotificationVariants(baseNotification) {
    return {
      variant_a: {
        ...baseNotification,
        title: `🎭 ${baseNotification.title}`,
        style: 'emoji_prefix'
      },
      variant_b: {
        ...baseNotification,
        title: baseNotification.title.toUpperCase(),
        style: 'uppercase'
      },
      variant_c: {
        ...baseNotification,
        title: `${baseNotification.title} - Hemen Kaydol!`,
        style: 'urgency_suffix'
      }
    };
  }
  
  // Bildirim sıklığı kontrolü
  shouldSendNotification(notificationType, lastSent) {
    const preferences = this.userProfile.notificationPreferences;
    const frequency = preferences[notificationType]?.frequency || 'normal';
    
    const frequencyRules = {
      never: () => false,
      minimal: (lastSent) => Date.now() - lastSent > 7 * 24 * 60 * 60 * 1000, // 1 hafta
      normal: (lastSent) => Date.now() - lastSent > 24 * 60 * 60 * 1000,      // 1 gün
      frequent: (lastSent) => Date.now() - lastSent > 6 * 60 * 60 * 1000,     // 6 saat
      all: () => true
    };
    
    return frequencyRules[frequency](lastSent);
  }
}
```

### 6.4 Sosyal Özellikler

#### Sosyal Etkileşim Sistemi:

```javascript
const SocialFeatures = {
  // Arkadaşlık Sistemi
  friendSystem: {
    // Arkadaş ekleme yöntemleri
    addFriendMethods: [
      'phone_contacts',      // Telefon rehberi
      'email_contacts',      // E-posta rehberi
      'qr_code',            // QR kod paylaşımı
      'username_search',     // Kullanıcı adı arama
      'mutual_events',       // Ortak etkinlik katılımcıları
      'social_media_import'  // Sosyal medya bağlantısı
    ],
    
    // Gizlilik seviyeleri
    privacyLevels: {
      public: 'Herkes görebilir',
      friends: 'Sadece arkadaşlar',
      private: 'Sadece ben'
    }
  },
  
  // Etkinlik Paylaşımı
  eventSharing: {
    // Paylaşım kanalları
    channels: [
      { id: 'native_share', name: 'Sistem Paylaşım', icon: '📤' },
      { id: 'whatsapp', name: 'WhatsApp', icon: '💬', color: '#25D366' },
      { id: 'twitter', name: 'Twitter', icon: '🐦', color: '#1DA1F2' },
      { id: 'facebook', name: 'Facebook', icon: '📘', color: '#1877F2' },
      { id: 'instagram', name: 'Instagram Stories', icon: '📷', color: '#E4405F' },
      { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: '#0077B5' },
      { id: 'copy_link', name: 'Linki Kopyala', icon: '🔗' }
    ],
    
    // Paylaşım şablonları
    templates: {
      basic: '{event_title} etkinliğine katılacağım! 🎉 Sen de katıl: {event_link}',
      excited: 'Bu etkinliği kaçırmam! {event_title} - {event_date} 🔥 {event_link}',
      invitation: '{event_title} etkinliğine beraber gidelim mi? 😊 {event_link}',
      achievement: 'Harika bir etkinlikti: {event_title}! ⭐ #{municipality_name}'
    }
  },
  
  // Grup Özelliği
  groupFeatures: {
    // Grup türleri
    groupTypes: [
      { id: 'family', name: 'Aile', icon: '👨‍👩‍👧‍👦', maxSize: 10 },
      { id: 'friends', name: 'Arkadaş Grubu', icon: '👥', maxSize: 20 },
      { id: 'colleagues', name: 'İş Arkadaşları', icon: '💼', maxSize: 50 },
      { id: 'community', name: 'Topluluk', icon: '🏘️', maxSize: 100 }
    ],
    
    // Grup etkinlik önerileri
    groupRecommendations: {
      algorithm: 'intersection_of_interests', // Ortak ilgi alanları
      weightings: {
        common_categories: 0.4,
        location_proximity: 0.3,
        schedule_compatibility: 0.2,
        price_range_agreement: 0.1
      }
    }
  },
  
  // Değerlendirme ve Yorumlama
  reviewSystem: {
    // Değerlendirme kriterleri
    ratingCriteria: {
      overall: { name: 'Genel', weight: 0.4 },
      organization: { name: 'Organizasyon', weight: 0.2 },
      venue: { name: 'Mekan', weight: 0.2 },
      content: { name: 'İçerik', weight: 0.2 }
    },
    
    // Yorum moderasyonu
    moderation: {
      auto_filter: true,         // Otomatik küfür filtresi
      manual_review: true,       // Manuel inceleme
      community_reporting: true, // Topluluk bildirimi
      reputation_system: true    // İtibar sistemi
    },
    
    // Faydalı yorum ödüllendirmesi
    helpfulnessRewards: {
      points_per_helpful_vote: 5,
      badges: ['Helpful Reviewer', 'Event Expert', 'Community Guide'],
      privileges: ['Early access', 'Beta features', 'Moderator tools']
    }
  },
  
  // Sosyal Gamification
  gamification: {
    // Rozet sistemi
    badges: [
      { id: 'first_event', name: 'İlk Adım', description: 'İlk etkinliğe katıldı', icon: '🥇' },
      { id: 'social_butterfly', name: 'Sosyal Kelebek', description: '10 farklı kategoride etkinlik', icon: '🦋' },
      { id: 'culture_lover', name: 'Kültür Sever', description: '25 kültür etkinliği', icon: '🎭' },
      { id: 'music_fan', name: 'Müzik Tutkunu', description: '25 müzik etkinliği', icon: '🎵' },
      { id: 'sports_enthusiast', name: 'Spor Meraklısı', description: '25 spor etkinliği', icon: '⚽' },
      { id: 'city_explorer', name: 'Şehir Kaşifi', description: '5 farklı ilçede etkinlik', icon: '🗺️' },
      { id: 'early_bird', name: 'Erken Kuş', description: 'Sabah etkinliklerine katılım', icon: '🐦' },
      { id: 'night_owl', name: 'Gece Kuşu', description: 'Akşam etkinliklerine katılım', icon: '🦉' },
      { id: 'weekend_warrior', name: 'Hafta Sonu Savaşçısı', description: 'Hafta sonu aktivist', icon: '⚔️' },
      { id: 'review_master', name: 'Değerlendirme Ustası', description: '50+ faydalı yorum', icon: '📝' }
    ],
    
    // Seviye sistemi
    levelSystem: {
      levels: [
        { level: 1, name: 'Yeni Başlayan', minPoints: 0, benefits: [] },
        { level: 2, name: 'Etkinlik Sever', minPoints: 100, benefits: ['Erken bildirim'] },
        { level: 3, name: 'Topluluk Üyesi', minPoints: 300, benefits: ['Özel etkinlikler'] },
        { level: 4, name: 'Etkinlik Uzmanı', minPoints: 600, benefits: ['VIP alanlar'] },
        { level: 5, name: 'Kültür Elçisi', minPoints: 1000, benefits: ['Beta özellikler'] }
      ],
      
      pointSources: {
        event_attendance: 10,      // Etkinliğe katılım
        event_check_in: 5,         // Check-in yapma
        event_review: 15,          // Değerlendirme yazma
        helpful_review_vote: 5,    // Faydalı yorum oyu alma
        friend_invitation: 20,     // Arkadaş davet etme
        event_sharing: 5,          // Etkinlik paylaşma
        consecutive_attendance: 25  // Ardışık katılım bonusu
      }
    }
  }
};
```

### 6.5 Harita Entegrasyonu

#### İnteraktif Harita Sistemi:

```javascript
const MapIntegration = {
  // Harita sağlayıcısı
  provider: 'mapbox', // Mapbox GL JS
  
  // Harita stilleri
  mapStyles: {
    default: 'mapbox://styles/mapbox/streets-v12',
    satellite: 'mapbox://styles/mapbox/satellite-v9',
    dark: 'mapbox://styles/mapbox/dark-v11',
    light: 'mapbox://styles/mapbox/light-v11',
    custom: 'mapbox://styles/etkinliktr/custom-style'
  },
  
  // Marker sistemi
  markers: {
    // Kategori bazlı marker stilleri
    categoryMarkers: {
      culture: {
        color: '#8B5CF6',
        icon: 'theater',
        size: 'medium'
      },
      music: {
        color: '#EC4899',
        icon: 'music',
        size: 'medium'
      },
      sport: {
        color: '#10B981',
        icon: 'pitch',
        size: 'medium'
      }
      // ... diğer kategoriler
    },
    
    // Cluster ayarları
    clustering: {
      enabled: true,
      maxZoom: 14,           // Cluster görünür maksimum zoom
      clusterRadius: 50,     // Cluster yarıçapı (px)
      clusterMaxZoom: 14,    // Cluster maksimum zoom
      clusterStyle: {
        small: {
          size: 40,
          color: '#51bbd3',
          textColor: '#ffffff'
        },
        medium: {
          size: 60,
          color: '#f1c40f',
          textColor: '#ffffff'
        },
        large: {
          size: 80,
          color: '#e74c3c',
          textColor: '#ffffff'
        }
      }
    },
    
    // Popup içeriği
    popupTemplate: {
      content: `
        <div class="map-popup">
          <img src="{event_image}" alt="{event_title}" class="popup-image" />
          <div class="popup-content">
            <h3 class="popup-title">{event_title}</h3>
            <p class="popup-date">📅 {event_date}</p>
            <p class="popup-location">📍 {venue_name}</p>
            <p class="popup-price">💰 {price_display}</p>
            <div class="popup-actions">
              <button class="btn-primary" data-event-id="{event_id}">
                Detay Gör
              </button>
              <button class="btn-secondary" data-event-id="{event_id}">
                Kayıt Ol
              </button>
            </div>
          </div>
        </div>
      `,
      maxWidth: 300,
      closeButton: true,
      closeOnClick: false
    }
  },
  
  // Harita filtreleri
  mapFilters: {
    // Görünür katmanlar
    layers: {
      events: { enabled: true, name: 'Etkinlikler' },
      venues: { enabled: false, name: 'Mekanlar' },
      transport: { enabled: false, name: 'Toplu Taşıma' },
      parking: { enabled: false, name: 'Otoparklar' },
      restaurants: { enabled: false, name: 'Restoranlar' },
      hotels: { enabled: false, name: 'Konaklama' }
    },
    
    // Zaman bazlı filtreleme
    timeFilter: {
      enabled: true,
      range: ['today', 'this_week', 'this_month'],
      slider: {
        min: 0,      // Şu andan
        max: 2592000, // 30 gün sonra (saniye)
        step: 86400   // 1 gün (saniye)
      }
    }
  },
  
  // Navigasyon entegrasyonu
  navigation: {
    // Desteklenen navigasyon uygulamaları
    apps: [
      {
        id: 'google_maps',
        name: 'Google Maps',
        icon: '🗺️',
        urlTemplate: 'https://maps.google.com/?q={lat},{lng}&z=15'
      },
      {
        id: 'apple_maps',
        name: 'Apple Maps',
        icon: '🧭',
        urlTemplate: 'http://maps.apple.com/?q={venue_name}&ll={lat},{lng}'
      },
      {
        id: 'waze',
        name: 'Waze',
        icon: '🚗',
        urlTemplate: 'https://waze.com/ul?q={venue_name}&ll={lat},{lng}&z=17'
      },
      {
        id: 'yandex_maps',
        name: 'Yandex Maps',
        icon: '🗺️',
        urlTemplate: 'https://yandex.com.tr/maps/?ll={lng},{lat}&z=15&text={venue_name}'
      }
    ],
    
    // Toplu taşıma bilgisi
    publicTransport: {
      enabled: true,
      providers: ['google_directions', 'moovit', 'citymapper'],
      showNearbyStops: true,
      maxWalkingDistance: 1000 // metre
    }
  },
  
  // Gelişmiş özellikler
  advancedFeatures: {
    // Isı haritası (event yoğunluğu)
    heatmap: {
      enabled: true,
      radius: 20,
      blur: 15,
      maxZoom: 12,
      intensity: 0.6
    },
    
    // Gerçek zamanlı konum paylaşımı
    liveLocation: {
      enabled: true,
      accuracy: 'high',
      updateInterval: 30000, // 30 saniye
      geofencing: {
        enabled: true,
        radius: 100, // metre
        notifications: true
      }
    },
    
    // Çevrimdışı harita desteği
    offlineMap: {
      enabled: true,
      downloadRadius: 5, // km
      compressionLevel: 'medium',
      autoUpdate: true
    },
    
    // Artırılmış gerçeklik (AR) entegrasyonu
    augmentedReality: {
      enabled: false, // Beta feature
      showDistance: true,
      showDirection: true,
      maxMarkers: 10
    }
  }
};
```

#### Konum Bazlı Akıllı Öneriler:

```javascript
class LocationBasedRecommendations {
  constructor(userLocation, mapBounds) {
    this.userLocation = userLocation;
    this.mapBounds = mapBounds;
  }
  
  // Yakındaki etkinlik önerileri
  getNearbyEvents(radius = 5000) { // 5km
    const nearbyEvents = this.findEventsInRadius(radius);
    
    return nearbyEvents.map(event => ({
      ...event,
      distance: this.calculateDistance(this.userLocation, event.location),
      walkingTime: this.estimateWalkingTime(this.userLocation, event.location),
      transportOptions: this.getTransportOptions(this.userLocation, event.location)
    }));
  }
  
  // Ulaşım önerisi algoritması
  getTransportOptions(from, to) {
    const distance = this.calculateDistance(from, to);
    const options = [];
    
    if (distance <= 1000) { // 1km altı
      options.push({
        type: 'walking',
        duration: Math.round(distance / 83.33), // ~5km/h hız
        icon: '🚶',
        description: 'Yürüyerek'
      });
    }
    
    if (distance <= 5000) { // 5km altı
      options.push({
        type: 'cycling',
        duration: Math.round(distance / 250), // ~15km/h hız
        icon: '🚴',
        description: 'Bisikletle'
      });
    }
    
    // Toplu taşıma her zaman seçenek
    options.push({
      type: 'public_transport',
      duration: this.getPublicTransportTime(from, to),
      icon: '🚌',
      description: 'Toplu Taşıma'
    });
    
    // Araba her zaman seçenek
    options.push({
      type: 'driving',
      duration: Math.round(distance / 833.33), // ~50km/h ortalama şehir içi
      icon: '🚗',
      description: 'Araba ile'
    });
    
    return options.sort((a, b) => a.duration - b.duration);
  }
  
  // Bölgesel etkinlik yoğunluk analizi
  analyzeEventDensity() {
    const districts = this.groupEventsByDistrict();
    
    return districts.map(district => ({
      name: district.name,
      eventCount: district.events.length,
      popularCategories: this.getMostPopularCategories(district.events),
      avgDistance: this.calculateAverageDistance(district.events),
      recommendation: this.generateDistrictRecommendation(district)
    }));
  }
}
```

## 7. PROTOTİP OLUŞTURMA REHBERİ

### 7.1 Geliştirme Adımları

#### Phase 1: Temel Altyapı (4-6 hafta)

**Hafta 1-2: Proje Kurulumu**
```bash
# 1. Repository oluşturma ve proje yapısı
mkdir etkinlik-tr-platform
cd etkinlik-tr-platform

# Frontend setup (Next.js)
npx create-next-app@latest frontend --typescript --tailwind --eslint
cd frontend
npm install @headlessui/react @heroicons/react framer-motion
npm install zustand @tanstack/react-query react-hook-form
npm install mapbox-gl react-map-gl qrcode.js

# Backend setup (Node.js + Express)
mkdir backend
cd backend
npm init -y
npm install express cors helmet morgan
npm install jsonwebtoken bcryptjs joi
npm install pg redis mongodb
npm install socket.io nodemailer twilio

# Database setup
docker-compose up -d postgres redis mongodb
```

**Hafta 3-4: Core Backend Services**
```javascript
// 1. Authentication Service
- JWT token management
- Password hashing with bcrypt
- Rate limiting for login attempts
- Email verification system

// 2. User Service
- User CRUD operations
- Profile management
- Preferences storage

// 3. Event Service (Basic)
- Event CRUD operations
- Basic search functionality
- Category management

// 4. File Upload Service
- Image upload and processing
- CDN integration setup
```

**Hafta 5-6: Database Schema & API Design**
```sql
-- Core tables implementation
- users
- municipalities  
- categories & subcategories
- events
- event_registrations

-- Indexes for performance
CREATE INDEX idx_events_date ON events(start_datetime);
CREATE INDEX idx_events_location ON events(venue_latitude, venue_longitude);
CREATE INDEX idx_events_category ON events(category_id);
```

#### Phase 2: Frontend Core (3-4 hafta)

**Hafta 7-8: UI Component Library**
```typescript
// Design System Implementation
interface ComponentLibrary {
  // Layout Components
  Header: React.FC<HeaderProps>;
  Navigation: React.FC<NavigationProps>;
  Container: React.FC<ContainerProps>;
  
  // Data Display
  EventCard: React.FC<EventCardProps>;
  CategoryBadge: React.FC<CategoryProps>;
  UserProfile: React.FC<ProfileProps>;
  
  // Forms & Inputs
  SearchBox: React.FC<SearchProps>;
  FilterPanel: React.FC<FilterProps>;
  RegistrationForm: React.FC<RegistrationProps>;
  
  // Feedback
  Toast: React.FC<ToastProps>;
  Modal: React.FC<ModalProps>;
  LoadingSpinner: React.FC<LoadingProps>;
}

// Global State Management (Zustand)
interface AppState {
  user: User | null;
  events: Event[];
  filters: FilterState;
  loading: boolean;
  // Actions
  setUser: (user: User) => void;
  setEvents: (events: Event[]) => void;
  updateFilters: (filters: Partial<FilterState>) => void;
}
```

**Hafta 9-10: Core Pages Implementation**
```typescript
// Page Components
pages/
├── index.tsx           // Ana sayfa
├── events/
│   ├── index.tsx       // Etkinlik listesi
│   ├── [id].tsx        // Etkinlik detayı
│   └── search.tsx      // Arama sonuçları
├── auth/
│   ├── login.tsx       // Giriş
│   ├── register.tsx    // Kayıt
│   └── profile.tsx     // Profil
└── admin/
    ├── dashboard.tsx   // Admin dashboard
    ├── events.tsx      // Etkinlik yönetimi
    └── analytics.tsx   // Analitikler
```

#### Phase 3: Gelişmiş Özellikler (4-5 hafta)

**Hafta 11-12: QR Code System**
```typescript
// QR Code Generation & Validation
class QRCodeService {
  async generateEventQR(registrationId: string): Promise<string> {
    const qrData = {
      type: 'event_registration',
      registrationId,
      eventId: registration.eventId,
      userId: registration.userId,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      signature: this.createSignature(registrationId)
    };
    
    const qrString = this.encrypt(JSON.stringify(qrData));
    return QRCode.toDataURL(qrString);
  }
  
  async validateQR(qrString: string): Promise<ValidationResult> {
    // Decrypt, verify signature, check expiration
    // Return validation result with user/event info
  }
}

// Check-in Component
const CheckInScanner: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);
  
  const handleScan = async (qrData: string) => {
    const validation = await validateQRCode(qrData);
    setResult(validation);
    
    if (validation.valid) {
      // Success feedback + API call to mark attendance
    }
  };
  
  return (
    <QRCodeScanner
      onScan={handleScan}
      scanning={scanning}
      result={result}
    />
  );
};
```

**Hafta 13-14: Map Integration**
```typescript
// Mapbox Integration
const EventMap: React.FC<EventMapProps> = ({ events, userLocation }) => {
  const [viewport, setViewport] = useState({
    longitude: userLocation.lng,
    latitude: userLocation.lat,
    zoom: 12
  });
  
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  return (
    <Map
      {...viewport}
      style={{ width: '100%', height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      onMove={evt => setViewport(evt.viewState)}
    >
      {/* Event Markers */}
      {events.map(event => (
        <Marker
          key={event.id}
          longitude={event.venue_longitude}
          latitude={event.venue_latitude}
          onClick={() => setSelectedEvent(event)}
        >
          <EventMarker 
            category={event.category}
            size="medium"
          />
        </Marker>
      ))}
      
      {/* Popup */}
      {selectedEvent && (
        <Popup
          longitude={selectedEvent.venue_longitude}
          latitude={selectedEvent.venue_latitude}
          onClose={() => setSelectedEvent(null)}
        >
          <EventPopup event={selectedEvent} />
        </Popup>
      )}
    </Map>
  );
};
```

**Hafta 15: Notification System**
```typescript
// Push Notification Setup
const NotificationService = {
  async requestPermission(): Promise<boolean> {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  },
  
  async scheduleEventReminder(event: Event, timing: string) {
    const notificationTime = this.calculateNotificationTime(event.startDate, timing);
    
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      
      registration.showNotification(`${event.title} yaklaşıyor!`, {
        body: `Etkinliğiniz ${formatDate(event.startDate)} tarihinde başlayacak`,
        icon: '/icons/event-notification.png',
        badge: '/icons/badge.png',
        data: { eventId: event.id, type: 'event_reminder' },
        actions: [
          { action: 'view', title: 'Etkinliği Gör' },
          { action: 'checkin', title: 'Check-in Yap' }
        ]
      });
    }
  }
};

// Service Worker (sw.js)
self.addEventListener('notificationclick', event => {
  const { eventId, type } = event.notification.data;
  
  if (event.action === 'view') {
    clients.openWindow(`/events/${eventId}`);
  } else if (event.action === 'checkin') {
    clients.openWindow(`/events/${eventId}/checkin`);
  }
  
  event.notification.close();
});
```

#### Phase 4: Admin Panel (2-3 hafta)

**Hafta 16-17: Municipality Admin Dashboard**
```typescript
// Admin Dashboard Components
const AdminDashboard: React.FC = () => {
  const { data: stats } = useQuery('admin-stats', getAdminStats);
  const { data: events } = useQuery('admin-events', getAdminEvents);
  
  return (
    <AdminLayout>
      {/* Stats Overview */}
      <StatsGrid stats={stats} />
      
      {/* Quick Actions */}
      <QuickActions>
        <CreateEventButton />
        <ViewRegistrationsButton />
        <ExportDataButton />
      </QuickActions>
      
      {/* Recent Events Table */}
      <EventManagementTable 
        events={events}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
        onPublish={handlePublishEvent}
      />
      
      {/* Analytics Charts */}
      <AnalyticsSection>
        <AttendanceChart />
        <CategoryDistribution />
        <RevenueChart />
      </AnalyticsSection>
    </AdminLayout>
  );
};

// Event Creation Form
const EventCreateForm: React.FC = () => {
  const { register, handleSubmit, watch, setValue } = useForm<EventFormData>();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  
  const onSubmit = async (data: EventFormData) => {
    try {
      // Upload images first
      const imageUrls = await uploadEventImages(imageFiles);
      
      // Create event with image URLs
      const eventData = {
        ...data,
        images: imageUrls,
        municipalityId: currentUser.municipalityId
      };
      
      await createEvent(eventData);
      toast.success('Etkinlik başarıyla oluşturuldu!');
    } catch (error) {
      toast.error('Etkinlik oluşturulurken hata oluştu.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        label="Etkinlik Başlığı"
        register={register('title', { required: 'Başlık gerekli' })}
      />
      
      <FormField
        label="Açıklama"
        register={register('description')}
        type="textarea"
      />
      
      <DateTimePickerField
        label="Başlangıç Tarihi"
        value={watch('startDateTime')}
        onChange={(date) => setValue('startDateTime', date)}
      />
      
      <CategorySelector
        value={watch('categoryId')}
        onChange={(categoryId) => setValue('categoryId', categoryId)}
      />
      
      <VenueSelector
        value={watch('venueId')}
        onChange={(venueId) => setValue('venueId', venueId)}
      />
      
      <ImageUploader
        files={imageFiles}
        onChange={setImageFiles}
        maxFiles={5}
      />
      
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary">
          Taslak Olarak Kaydet
        </Button>
        <Button type="submit" variant="primary">
          Yayınla
        </Button>
      </div>
    </form>
  );
};
```

#### Phase 5: Test & Polish (2-3 hafta)

**Hafta 18-19: Testing & Bug Fixes**
**Hafta 20: Performance Optimization & Deployment**

### 7.2 Test Senaryoları

#### 7.2.1 Functional Testing Scenarios

**Kullanıcı Kaydı ve Girişi:**
```typescript
describe('Kullanıcı Authentication', () => {
  test('Yeni kullanıcı kaydı - başarılı', async () => {
    // Given: Geçerli kullanıcı bilgileri
    const userData = {
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      email: 'ahmet.yilmaz@example.com',
      password: 'SecurePassword123!',
      city: 'İstanbul',
      district: 'Kadıköy'
    };
    
    // When: Kayıt formu doldurulur ve gönderilir
    await userEvent.type(screen.getByLabelText('Ad'), userData.firstName);
    await userEvent.type(screen.getByLabelText('Soyad'), userData.lastName);
    await userEvent.type(screen.getByLabelText('E-posta'), userData.email);
    await userEvent.type(screen.getByLabelText('Şifre'), userData.password);
    await userEvent.click(screen.getByRole('button', { name: 'Kayıt Ol' }));
    
    // Then: Başarı mesajı görüntülenir ve e-posta doğrulama gönderilir
    expect(screen.getByText('Kayıt başarılı! E-posta adresinizi kontrol edin.')).toBeInTheDocument();
    expect(mockSendVerificationEmail).toHaveBeenCalledWith(userData.email);
  });
  
  test('Geçersiz şifre ile kayıt - hata', async () => {
    // Given: Zayıf şifre
    const weakPassword = '123';
    
    // When: Zayıf şifre girilir
    await userEvent.type(screen.getByLabelText('Şifre'), weakPassword);
    await userEvent.click(screen.getByRole('button', { name: 'Kayıt Ol' }));
    
    // Then: Şifre güçlülük hatası gösterilir
    expect(screen.getByText('Şifre en az 8 karakter olmalı ve özel karakter içermeli')).toBeInTheDocument();
  });
  
  test('Kullanıcı girişi - başarılı', async () => {
    // Given: Kayıtlı kullanıcı bilgileri
    const credentials = {
      email: 'ahmet.yilmaz@example.com',
      password: 'SecurePassword123!'
    };
    
    // When: Giriş yapılır
    await userEvent.type(screen.getByLabelText('E-posta'), credentials.email);
    await userEvent.type(screen.getByLabelText('Şifre'), credentials.password);
    await userEvent.click(screen.getByRole('button', { name: 'Giriş Yap' }));
    
    // Then: Ana sayfaya yönlendirme yapılır
    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(localStorage.getItem('authToken')).toBeTruthy();
  });
});
```

**Etkinlik Arama ve Filtreleme:**
```typescript
describe('Etkinlik Arama ve Filtreleme', () => {
  test('Kategori filtreleme - kültür etkinlikleri', async () => {
    // Given: Çeşitli kategorilerde etkinlikler mevcut
    const mockEvents = [
      { id: 1, title: 'Hamlet Tiyatro', category: 'culture' },
      { id: 2, title: 'Rock Konseri', category: 'music' },
      { id: 3, title: 'Resim Sergisi', category: 'art' }
    ];
    mockGetEvents.mockResolvedValue(mockEvents);
    
    // When: Kültür kategorisi seçilir
    await userEvent.click(screen.getByRole('button', { name: 'Filtrele' }));
    await userEvent.click(screen.getByLabelText('Kültür'));
    await userEvent.click(screen.getByRole('button', { name: 'Uygula' }));
    
    // Then: Sadece kültür etkinlikleri gösterilir
    expect(screen.getByText('Hamlet Tiyatro')).toBeInTheDocument();
    expect(screen.queryByText('Rock Konseri')).not.toBeInTheDocument();
  });
  
  test('Lokasyon bazlı arama - yakın etkinlikler', async () => {
    // Given: Kullanıcı konumu ve çevredeki etkinlikler
    const userLocation = { lat: 40.9876, lng: 29.0234 }; // Kadıköy
    const nearbyEvent = { 
      id: 1, 
      title: 'Kadıköy Konseri',
      venue_latitude: 40.9880,
      venue_longitude: 29.0250,
      distance: 150 // metre
    };
    
    mockGetNearbyEvents.mockResolvedValue([nearbyEvent]);
    
    // When: 500m yarıçapında arama yapılır
    await userEvent.selectOptions(screen.getByLabelText('Mesafe'), '0.5km');
    
    // Then: Yakın etkinlik gösterilir
    expect(screen.getByText('Kadıköy Konseri')).toBeInTheDocument();
    expect(screen.getByText('150m uzaklıkta')).toBeInTheDocument();
  });
});
```

**QR Kod Check-in:**
```typescript
describe('QR Kod Check-in', () => {
  test('Geçerli QR kod tarama - başarılı check-in', async () => {
    // Given: Geçerli bir QR kod
    const validQRData = {
      registrationId: 'reg123',
      eventId: 'event456',
      userId: 'user789',
      expiresAt: new Date(Date.now() + 3600000), // 1 saat sonra
      signature: 'valid_signature'
    };
    
    mockValidateQRCode.mockResolvedValue({
      valid: true,
      registration: { id: 'reg123', status: 'registered' },
      event: { id: 'event456', title: 'Test Etkinliği' }
    });
    
    // When: QR kod taranır
    const qrString = btoa(JSON.stringify(validQRData));
    await act(async () => {
      fireEvent(screen.getByTestId('qr-scanner'), new CustomEvent('scan', {
        detail: { data: qrString }
      }));
    });
    
    // Then: Check-in başarılı mesajı gösterilir
    expect(screen.getByText('Check-in başarılı!')).toBeInTheDocument();
    expect(mockMarkAttendance).toHaveBeenCalledWith('reg123');
  });
  
  test('Süresi dolmuş QR kod - hata', async () => {
    // Given: Süresi dolmuş QR kod
    const expiredQRData = {
      registrationId: 'reg123',
      expiresAt: new Date(Date.now() - 3600000) // 1 saat önce
    };
    
    mockValidateQRCode.mockResolvedValue({
      valid: false,
      error: 'QR code expired'
    });
    
    // When: QR kod taranır
    const qrString = btoa(JSON.stringify(expiredQRData));
    await act(async () => {
      fireEvent(screen.getByTestId('qr-scanner'), new CustomEvent('scan', {
        detail: { data: qrString }
      }));
    });
    
    // Then: Hata mesajı gösterilir
    expect(screen.getByText('QR kodunun süresi dolmuş')).toBeInTheDocument();
  });
});
```

#### 7.2.2 Performance Testing

**Load Testing Scenarios:**
```typescript
// Artillery.js configuration for load testing
module.exports = {
  config: {
    target: 'http://localhost:3000',
    phases: [
      { duration: 60, arrivalRate: 10 }, // Warm up
      { duration: 300, arrivalRate: 50 }, // Normal load
      { duration: 120, arrivalRate: 100 }, // Peak load
      { duration: 60, arrivalRate: 10 } // Cool down
    ]
  },
  scenarios: [
    {
      name: 'Event Search Flow',
      weight: 60,
      flow: [
        { get: { url: '/' } },
        { think: 2 },
        { get: { url: '/api/events?city=istanbul' } },
        { think: 3 },
        { get: { url: '/api/events/search?q=kültür' } },
        { think: 5 },
        { get: { url: '/api/events/{{ $randomInt(1, 1000) }}' } }
      ]
    },
    {
      name: 'User Registration',
      weight: 20,
      flow: [
        { get: { url: '/auth/register' } },
        { think: 10 },
        { 
          post: { 
            url: '/api/auth/register',
            json: {
              firstName: '{{ $randomFirstName() }}',
              lastName: '{{ $randomLastName() }}',
              email: '{{ $randomEmail() }}',
              password: 'TestPassword123!'
            }
          }
        }
      ]
    },
    {
      name: 'QR Code Validation',
      weight: 20,
      flow: [
        {
          post: {
            url: '/api/qr/validate',
            json: {
              qrData: '{{ $randomQRCode() }}'
            }
          }
        }
      ]
    }
  ]
};
```

**Database Performance Tests:**
```sql
-- Event search performance test
EXPLAIN ANALYZE 
SELECT e.*, c.name as category_name, m.name as municipality_name
FROM events e
JOIN categories c ON e.category_id = c.category_id
JOIN municipalities m ON e.municipality_id = m.municipality_id
WHERE e.start_datetime >= NOW()
  AND e.start_datetime <= NOW() + INTERVAL '30 days'
  AND ST_DWithin(
    ST_Point(e.venue_longitude, e.venue_latitude)::geography,
    ST_Point(29.0234, 40.9876)::geography,
    5000
  )
ORDER BY e.start_datetime
LIMIT 20;

-- Expected: Index scan, <10ms execution time

-- Registration lookup performance test  
EXPLAIN ANALYZE
SELECT r.*, e.title, u.first_name, u.last_name
FROM event_registrations r
JOIN events e ON r.event_id = e.event_id
JOIN users u ON r.user_id = u.user_id
WHERE r.qr_code = $1;

-- Expected: Index scan on qr_code, <1ms execution time
```

#### 7.2.3 Security Testing

**Authentication & Authorization Tests:**
```typescript
describe('Security Tests', () => {
  test('JWT token expiration handling', async () => {
    // Given: Expired JWT token
    const expiredToken = generateExpiredJWT();
    
    // When: API çağrısı yapılır
    const response = await fetch('/api/events', {
      headers: { Authorization: `Bearer ${expiredToken}` }
    });
    
    // Then: 401 Unauthorized döner
    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({
      error: 'Token expired'
    });
  });
  
  test('SQL injection prevention', async () => {
    // Given: SQL injection attempt
    const maliciousInput = "'; DROP TABLE events; --";
    
    // When: Search API'sine malicious input gönderilir
    const response = await fetch(`/api/events/search?q=${encodeURIComponent(maliciousInput)}`);
    
    // Then: Güvenli şekilde handle edilir
    expect(response.status).toBe(200);
    // Database'de hiçbir değişiklik olmadığını doğrula
    const eventsCount = await db.query('SELECT COUNT(*) FROM events');
    expect(eventsCount.rows[0].count).toBeGreaterThan(0);
  });
  
  test('Rate limiting enforcement', async () => {
    // Given: Rate limit (5 requests/minute)
    
    // When: 6 request in quick succession
    const promises = Array(6).fill().map(() => 
      fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@test.com', password: 'wrong' }),
        headers: { 'Content-Type': 'application/json' }
      })
    );
    
    const responses = await Promise.all(promises);
    
    // Then: 6th request should be rate limited
    expect(responses[5].status).toBe(429);
    expect(await responses[5].json()).toEqual({
      error: 'Too many requests'
    });
  });
});
```

#### 7.2.4 Accessibility Testing

**Screen Reader & Keyboard Navigation:**
```typescript
describe('Accessibility Tests', () => {
  test('Keyboard navigation - event card focus', async () => {
    // Given: Event list sayfası
    render(<EventList events={mockEvents} />);
    
    // When: Tab tuşu ile navigation
    const firstEventCard = screen.getAllByRole('article')[0];
    firstEventCard.focus();
    
    await userEvent.keyboard('{Tab}');
    
    // Then: Next focusable element focused
    expect(screen.getByRole('button', { name: 'Kayıt Ol' })).toHaveFocus();
  });
  
  test('Screen reader labels - event information', () => {
    // Given: Event card component
    const event = {
      title: 'Hamlet Tiyatro Oyunu',
      date: '2025-03-15T20:00:00Z',
      venue: 'Kültür Merkezi',
      price: 'Ücretsiz'
    };
    
    render(<EventCard event={event} />);
    
    // Then: Proper ARIA labels exist
    expect(screen.getByLabelText('Hamlet Tiyatro Oyunu etkinlik detayları')).toBeInTheDocument();
    expect(screen.getByLabelText('Tarih ve saat: 15 Mart 2025, Cumartesi 20:00')).toBeInTheDocument();
    expect(screen.getByLabelText('Konum: Kültür Merkezi')).toBeInTheDocument();
  });
  
  test('Color contrast compliance', () => {
    // Given: Event category badge
    const badge = screen.getByText('Kültür');
    const styles = getComputedStyle(badge);
    
    // Then: Contrast ratio meets WCAG AA standards
    const contrastRatio = calculateContrastRatio(
      styles.color,
      styles.backgroundColor
    );
    expect(contrastRatio).toBeGreaterThanOrEqual(4.5);
  });
});
```

### 7.3 Demo Veriler

#### 7.3.1 Municipalities Data

```javascript
const demoMunicipalities = [
  {
    id: 'mun-istanbul-kadikoy',
    name: 'Kadıköy Belediyesi',
    city: 'İstanbul',
    district: 'Kadıköy',
    type: 'district',
    population: 467919,
    mayor_name: 'Şerdil Dara Odabaşı',
    contact_email: 'info@kadikoy.bel.tr',
    contact_phone: '+90 216 348 4000',
    website_url: 'https://www.kadikoy.bel.tr',
    logo_url: '/logos/kadikoy-belediyesi.png',
    address: 'Osmanağa Mahallesi, Söğütlüçeşme Cd. No:16, Kadıköy/İstanbul',
    latitude: 40.9876,
    longitude: 29.0234
  },
  {
    id: 'mun-ankara-cankaya',
    name: 'Çankaya Belediyesi',
    city: 'Ankara',
    district: 'Çankaya',
    type: 'district',
    population: 919845,
    mayor_name: 'Alper Taşdelen',
    contact_email: 'bilgi@cankaya.bel.tr',
    contact_phone: '+90 312 419 3000',
    website_url: 'https://www.cankaya.bel.tr',
    logo_url: '/logos/cankaya-belediyesi.png',
    address: 'Kızılırmak Mahallesi, 1443. Cd. No:25, Çankaya/Ankara',
    latitude: 39.9180,
    longitude: 32.8610
  },
  {
    id: 'mun-izmir-konak',
    name: 'Konak Belediyesi',
    city: 'İzmir',
    district: 'Konak',
    type: 'district',
    population: 373565,
    mayor_name: 'Nilüfer Çınarlı Mutlu',
    contact_email: 'info@konak.bel.tr',
    contact_phone: '+90 232 293 4000',
    website_url: 'https://www.konak.bel.tr',
    logo_url: '/logos/konak-belediyesi.png',
    address: 'Konak, Cumhuriyet Blv. No:144, Konak/İzmir',
    latitude: 38.4189,
    longitude: 27.1287
  }
];
```

#### 7.3.2 Sample Events Data

```javascript
const demoEvents = [
  {
    id: 'event-hamlet-2025-001',
    municipality_id: 'mun-istanbul-kadikoy',
    title: 'Hamlet - Shakespeare\'in Ölümsüz Eseri',
    description: `Shakespeare'in en ünlü tragedyası Hamlet, modern yorumlamalar ve etkileyici performanslarla Kadıköy sahnesinde sizlerle buluşuyor. 
    
    Danimarkalı Prens Hamlet'in intikam, aşk ve varoluş sorunları arasındaki iç çelişkilerini konu alan bu eser, günümüz insanının ruhsal durumunu da sorguluyor.
    
    Oyuncular:
    - Hamlet: Mehmet Yılmaz
    - Ophelia: Ayşe Demir  
    - Claudius: Ali Vural
    - Gertrude: Sevil Ateş
    
    Süre: 2 saat 30 dakika (15 dakika ara dahil)`,
    category_id: 'cat-culture',
    subcategory_id: 'subcat-theater',
    start_datetime: '2025-03-15T20:00:00+03:00',
    end_datetime: '2025-03-15T22:30:00+03:00',
    venue_name: 'Kadıköy Belediyesi Atatürk Kültür Merkezi',
    venue_address: 'Rıhtım Cad. No:14, Kadıköy/İSTANBUL',
    venue_latitude: 40.9880,
    venue_longitude: 29.0250,
    capacity: 500,
    current_registrations: 342,
    price: 0.00,
    is_free: true,
    registration_required: true,
    registration_start: '2025-02-01T00:00:00+03:00',
    registration_end: '2025-03-15T18:00:00+03:00',
    age_restriction: null,
    accessibility_info: 'Tekerlekli sandalye erişimi mevcut. İşitme cihazı desteği bulunmaktadır.',
    images: [
      '/events/hamlet-poster.jpg',
      '/events/hamlet-scene1.jpg',
      '/events/hamlet-cast.jpg'
    ],
    tags: ['shakespeare', 'tiyatro', 'klasik', 'drama'],
    status: 'active',
    created_by: 'admin-kadikoy-001'
  },
  
  {
    id: 'event-jazz-night-2025-002',
    municipality_id: 'mun-istanbul-kadikoy',
    title: 'Kadıköy Jazz Gecesi - Önder Focan Trio',
    description: `Türk caz müziğinin usta ismi Önder Focan ve grubu, unutulmaz bir gece için Kadıköy'da!
    
    Program:
    - Önder Focan - Gitar
    - İsmet Sıral - Kontrbas
    - Ferit Odman - Davul
    
    Repertuvar:
    - Jazz standartları
    - Orijinal kompozisyonlar
    - Latin jazz etkiler
    
    Yer sayısı sınırlı, erken kayıt tavsiye edilir.`,
    category_id: 'cat-music',
    subcategory_id: 'subcat-jazz',
    start_datetime: '2025-03-20T21:00:00+03:00',
    end_datetime: '2025-03-20T23:30:00+03:00',
    venue_name: 'Kadıköy Sanat Merkezi',
    venue_address: 'Bahariye Cd. No:32, Kadıköy/İSTANBUL',
    venue_latitude: 40.9890,
    venue_longitude: 29.0270,
    capacity: 150,
    current_registrations: 89,
    price: 75.00,
    is_free: false,
    registration_required: true,
    registration_start: '2025-02-15T00:00:00+03:00',
    registration_end: '2025-03-20T18:00:00+03:00',
    age_restriction: null,
    accessibility_info: 'Tekerlekli sandalye erişimi mevcut.',
    images: [
      '/events/jazz-night-poster.jpg',
      '/events/onder-focan-trio.jpg'
    ],
    tags: ['jazz', 'canlı müzik', 'önder focan', 'trio'],
    status: 'active',
    created_by: 'admin-kadikoy-001'
  },
  
  {
    id: 'event-painting-workshop-2025-003',
    municipality_id: 'mun-ankara-cankaya',
    title: 'Çocuklar İçin Resim Atölyesi',
    description: `7-12 yaş arası çocuklar için eğlenceli ve öğretici resim atölyesi!
    
    Atölye İçeriği:
    - Temel renk teorisi
    - Fırça teknikleri
    - Yaratıcılık oyunları
    - Kendi eserini yaratma
    
    Malzemeler belediye tarafından sağlanacaktır.
    Ebeveyn katılımı opsiyoneldir.
    
    Atölye Lideri: Sanat Öğretmeni Zeynep Kaya`,
    category_id: 'cat-family',
    subcategory_id: 'subcat-children',
    start_datetime: '2025-03-18T14:00:00+03:00',
    end_datetime: '2025-03-18T16:00:00+03:00',
    venue_name: 'Çankaya Belediyesi Kültür Merkezi',
    venue_address: 'Kızılırmak Mah. 1443. Cd. No:25, Çankaya/ANKARA',
    venue_latitude: 39.9180,
    venue_longitude: 32.8610,
    capacity: 25,
    current_registrations: 18,
    price: 0.00,
    is_free: true,
    registration_required: true,
    registration_start: '2025-02-20T00:00:00+03:00',
    registration_end: '2025-03-17T23:59:00+03:00',
    age_restriction: 7,
    accessibility_info: 'Çocuk dostu ortam. Ebeveyn bekleme alanı mevcut.',
    images: [
      '/events/painting-workshop-kids.jpg',
      '/events/art-supplies.jpg'
    ],
    tags: ['çocuk', 'sanat', 'atölye', 'resim', 'kreativite'],
    status: 'active',
    created_by: 'admin-cankaya-001'
  },
  
  {
    id: 'event-marathon-izmir-2025-004',
    municipality_id: 'mun-izmir-konak',
    title: 'İzmir Konak Yarı Maratonu',
    description: `İzmir'in en güzel güzergahında koşma keyfi! Kordon boyunca uzanan eşsiz manzara eşliğinde yarı maraton.
    
    Parkur Detayları:
    - Mesafe: 21.1 km
    - Başlangıç: Konak Pier
    - Bitiş: Alsancak Kordon
    - Rakım farkı: Minimal
    
    Kategoriler:
    - Elit erkek/kadın
    - Yaş kategorileri (18-29, 30-39, 40-49, 50+)
    - Engelli atletler kategorisi
    
    Katılım Koşulları:
    - 18 yaş üstü
    - Sağlık raporu gerekli
    - Koşu deneyimi önerilir
    
    Ödüller:
    - İlk 3'e kupa ve para ödülü
    - Tüm finisherlere madalya
    - Katılım sertifikası`,
    category_id: 'cat-sport',
    subcategory_id: 'subcat-running',
    start_datetime: '2025-04-06T08:00:00+03:00',
    end_datetime: '2025-04-06T12:00:00+03:00',
    venue_name: 'Konak Pier - Alsancak Kordon',
    venue_address: 'Konak Pier, Akdeniz Cd. No:1, Konak/İZMİR',
    venue_latitude: 38.4189,
    venue_longitude: 27.1287,
    capacity: 2000,
    current_registrations: 1247,
    price: 50.00,
    is_free: false,
    registration_required: true,
    registration_start: '2025-01-15T00:00:00+03:00',
    registration_end: '2025-03-30T23:59:00+03:00',
    age_restriction: 18,
    accessibility_info: 'Engelli sporcular için özel kategori ve destek ekibi.',
    images: [
      '/events/izmir-marathon-poster.jpg',
      '/events/kordon-route.jpg',
      '/events/marathon-medals.jpg'
    ],
    tags: ['maraton', 'koşu', 'spor', 'yarışma', 'kordon'],
    status: 'active',
    created_by: 'admin-konak-001'
  }
];
```

#### 7.3.3 User Profiles for Testing

```javascript
const demoUsers = [
  {
    id: 'user-test-001',
    email: 'ahmet.kultur@example.com',
    first_name: 'Ahmet',
    last_name: 'Kültür',
    phone: '+90 555 123 4567',
    city: 'İstanbul',
    district: 'Kadıköy',
    interests: ['culture', 'music', 'art'],
    date_of_birth: '1985-05-15',
    profile_picture_url: '/avatars/ahmet-kultur.jpg',
    email_verified: true,
    phone_verified: true,
    notification_preferences: {
      event_reminder: { channels: ['push', 'email'], timing: '1_day_before' },
      new_recommendations: { channels: ['push'], frequency: 'weekly' }
    }
  },
  
  {
    id: 'user-test-002',
    email: 'zeynep.spor@example.com',
    first_name: 'Zeynep',
    last_name: 'Aktif',
    phone: '+90 555 987 6543',
    city: 'İzmir',
    district: 'Konak',
    interests: ['sport', 'family', 'social'],
    date_of_birth: '1990-08-22',
    profile_picture_url: '/avatars/zeynep-aktif.jpg',
    email_verified: true,
    phone_verified: false,
    notification_preferences: {
      event_reminder: { channels: ['push', 'sms'], timing: '2_hours_before' },
      friend_activity: { channels: ['push'], enabled: true }
    }
  }
];
```

#### 7.3.4 Admin Test Accounts

```javascript
const demoAdmins = [
  {
    id: 'admin-kadikoy-001',
    municipality_id: 'mun-istanbul-kadikoy',
    email: 'kultur.muduru@kadikoy.bel.tr',
    first_name: 'Mehmet',
    last_name: 'Yılmaz',
    title: 'Kültür ve Sosyal İşler Müdürü',
    permissions: [
      'create_event',
      'edit_event',
      'delete_event',
      'view_analytics',
      'manage_registrations',
      'export_data'
    ],
    last_login: '2025-03-10T14:30:00+03:00'
  },
  
  {
    id: 'admin-cankaya-001',
    municipality_id: 'mun-ankara-cankaya',
    email: 'etkinlik@cankaya.bel.tr',
    first_name: 'Ayşe',
    last_name: 'Demir',
    title: 'Etkinlik Koordinatörü',
    permissions: [
      'create_event',
      'edit_event',
      'view_analytics',
      'manage_registrations'
    ],
    last_login: '2025-03-11T09:15:00+03:00'
  }
];
```

#### 7.3.5 Sample Event Registrations

```javascript
const demoRegistrations = [
  {
    id: 'reg-hamlet-001',
    event_id: 'event-hamlet-2025-001',
    user_id: 'user-test-001',
    registration_date: '2025-02-15T16:20:00+03:00',
    status: 'registered',
    qr_code: 'QR_HAMLET_20250315_001_ABC123DEF456',
    guest_count: 2,
    special_requirements: 'Tekerlekli sandalye erişimi gerekli',
    created_at: '2025-02-15T16:20:00+03:00'
  },
  
  {
    id: 'reg-jazz-001', 
    event_id: 'event-jazz-night-2025-002',
    user_id: 'user-test-001',
    registration_date: '2025-02-20T11:45:00+03:00',
    status: 'registered',
    qr_code: 'QR_JAZZ_20250320_001_XYZ789ABC012',
    guest_count: 1,
    special_requirements: null,
    created_at: '2025-02-20T11:45:00+03:00'
  },
  
  {
    id: 'reg-marathon-001',
    event_id: 'event-marathon-izmir-2025-004', 
    user_id: 'user-test-002',
    registration_date: '2025-01-25T19:30:00+03:00',
    status: 'registered',
    qr_code: 'QR_MARATHON_20250406_002_MNO345PQR678',
    guest_count: 1,
    special_requirements: 'Vegetaryen beslenme tercihi',
    created_at: '2025-01-25T19:30:00+03:00'
  }
];
```

Bu demo veriler, platformun tüm özelliklerini test etmek ve potansiyel kullanıcılara platformun yeteneklerini göstermek için kullanılabilir. Gerçek hayatta benzer çeşitlilikte ve kalitede içerik sunulması platformun başarısı için kritik öneme sahiptir.

