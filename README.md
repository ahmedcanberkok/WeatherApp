# Hava Durumu Uygulaması

Bu proje, kullanıcıların şehir bazında güncel hava durumu bilgilerini görüntülemelerini sağlayan bir hava durumu uygulamasıdır. Uygulama, `OpenWeather` API'si üzerinden hava durumu verilerini çeker ve kullanıcıya güncel sıcaklık, nem ve rüzgar hızı bilgilerini sunar. Uygulama, hem açık hem de koyu tema destekler; kullanıcı tercihleri ve hava durumu verileri `localStorage`'da saklanarak, sayfa yenilendiğinde aynı ayarlarda kalması sağlanır.

## Özellikler

- **Şehir Bazlı Hava Durumu Arama**: Şehir adı girilerek anlık hava durumu bilgisi sorgulanabilir.
- **Açık ve Koyu Tema Desteği**: Kullanıcı, açık ve koyu tema arasında geçiş yapabilir; seçilen tema `localStorage`'da saklanır.
- **Verilerin Kalıcılığı**: Aranan şehirlerin hava durumu bilgileri ve tema seçimi `localStorage`'da saklanır, böylece sayfa yenilendiğinde veriler ve tema seçimi korunur.
- **Hava Durumu Bilgileri**: Sıcaklık, nem ve rüzgar hızı gibi temel meteorolojik bilgiler gösterilir.

## Kullanılan Teknolojiler

- **React**: UI (kullanıcı arayüzü) oluşturmak için kullanılan JavaScript kütüphanesi.
- **Tailwind CSS**: Hızlı ve özelleştirilebilir stil seçenekleri sunan CSS çerçevesi.
- **OpenWeather API**: Hava durumu verilerini sağlamak için kullanılan API.
- **useReducer ve localStorage**: `useReducer` ile durum yönetimi sağlanırken, `localStorage` ile verilerin kalıcı olması sağlanır.
