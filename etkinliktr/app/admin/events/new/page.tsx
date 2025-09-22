'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import TurkeyMap from '../../../_components/ui/TurkeyMap';

interface Category {
  id: string;
  name: string;
}

interface Municipality {
  id: string;
  name: string;
  city: string;
  district?: string;
}

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    municipalityId: '',
    startDatetime: '',
    endDatetime: '',
    venueName: '',
    venueAddress: '',
    city: '',
    district: '',
    capacity: '100',
    price: '',
    isFree: true,
    registrationRequired: true
  });

  const SAMPLES = useMemo(
    () => [
      { city: 'İstanbul', name: 'Kadıköy', district: 'Kadıköy' },
      { city: 'İstanbul', name: 'Üsküdar', district: 'Üsküdar' },
      { city: 'Ankara', name: 'Yenimahalle', district: 'Yenimahalle' },
      { city: 'İzmir', name: 'Konak', district: 'Konak' },
    ],
    []
  );

  // Kategoriler ve belediyeleri yükle
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, municipalitiesRes] = await Promise.all([
          fetch('/api/admin/categories'),
          fetch('/api/admin/municipalities')
        ]);

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData.categories || []);
        }

        if (municipalitiesRes.ok) {
          const municipalitiesData = await municipalitiesRes.json();
          setMunicipalities(municipalitiesData.municipalities || []);
        }
      } catch (error) {
        console.error('Veri yükleme hatası:', error);
      }
    };

    fetchData();
  }, []);

  const filteredMunicipalities = useMemo(() => {
    return selectedCity
      ? municipalities.filter((m) => m.city?.toLowerCase() === selectedCity.toLowerCase())
      : municipalities;
  }, [municipalities, selectedCity]);

  const showFallbackForCity = useMemo(() => filteredMunicipalities.length === 0, [filteredMunicipalities.length]);

  // Şehir seçildiğinde uygun bir belediye değeri otomatik öner
  useEffect(() => {
    if (!selectedCity) return;
    if (filteredMunicipalities.length > 0) {
      if (!formData.municipalityId || formData.municipalityId.startsWith('fallback:')) {
        const m = filteredMunicipalities[0];
        setFormData((prev) => ({ ...prev, municipalityId: m.id, city: m.city || selectedCity, district: m.district || '' }));
      }
    } else {
      const sample = SAMPLES.find((s) => s.city.toLowerCase() === selectedCity.toLowerCase());
      if (sample) {
        setFormData((prev) => ({
          ...prev,
          municipalityId: `fallback:${sample.city}:${sample.name}:${sample.district ?? ''}`,
          city: sample.city,
          district: sample.district ?? sample.name,
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity, filteredMunicipalities.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));

    if (name === 'municipalityId') {
      // Seçilen belediyeye göre city/district alanlarını önden doldur
      if (value.startsWith('fallback:')) {
        const [, city, name, district] = value.split(':');
        setFormData(prev => ({ ...prev, city: city || prev.city, district: district || name || prev.district }));
      } else {
        const m = municipalities.find(m => m.id === value);
        if (m) {
          setFormData(prev => ({ ...prev, city: m.city || prev.city, district: m.district || prev.district }));
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let municipalityIdToUse = formData.municipalityId;

      // If a fallback municipality option selected, create it first then use its id
      if (municipalityIdToUse.startsWith('fallback:')) {
        const fallbackKey = municipalityIdToUse.replace('fallback:', '');
        const parts = fallbackKey.split(':'); // city:name[:district]
        const fbCity = parts[0];
        const fbName = parts[1];
        const fbDistrict = parts[2];
        const createRes = await fetch('/api/admin/municipalities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: fbName, city: fbCity, district: fbDistrict })
        });
        if (!createRes.ok) {
          const err = await createRes.json().catch(() => ({}));
          throw new Error(err?.error || 'Belediye oluşturulamadı');
        }
        const created = await createRes.json();
        municipalityIdToUse = created.id || created?.municipality?.id;
      }

      const payload: any = {
        title: formData.title,
        description: formData.description,
        categoryId: formData.categoryId,
        municipalityId: municipalityIdToUse,
        startDatetime: formData.startDatetime,
        endDatetime: formData.endDatetime,
        venueName: formData.venueName,
        venueAddress: formData.venueAddress || undefined,
        capacity: formData.capacity ? parseInt(formData.capacity) : 100,
        price: formData.price ? parseFloat(formData.price) : 0,
        isFree: formData.isFree,
        registrationRequired: formData.registrationRequired,
      };
      if (formData.city && formData.city.trim().length >= 2) payload.city = formData.city.trim();
      if (formData.district && formData.district.trim().length >= 2) payload.district = formData.district.trim();

      const response = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/admin/events');
      } else {
        const errorData = await response.json();
        alert('Hata: ' + (errorData.message || 'Etkinlik oluşturulamadı'));
      }
    } catch (error) {
      alert('Bir hata oluştu');
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Yeni Etkinlik Oluştur</h1>
          <p className="text-gray-600 mt-1">Haritadan şehir seçin, sağda detayları doldurun</p>
        </div>
        <button
          onClick={() => router.push('/admin/events')}
          className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Geri Dön
        </button>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sol: Harita ve Hızlı Seçimler */}
            <div className="space-y-4">
              <TurkeyMap selectedCity={selectedCity} onCitySelect={setSelectedCity} />
              {/* Hızlı örnek seçimler */}
              <div className="flex flex-wrap gap-2">
                {SAMPLES.map((m) => (
                  <button
                    key={`${m.city}-${m.name}`}
                    type="button"
                    onClick={() => {
                      setSelectedCity(m.city);
                      setFormData((prev) => ({
                        ...prev,
                        municipalityId: `fallback:${m.city}:${m.name}:${m.district ?? ''}`
                      }));
                    }}
                    className="text-xs px-3 py-1 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    {m.city} {m.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sağ: Form alanları */}
            {/* Başlık */}
            <div className="lg:col-span-1">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Etkinlik Başlığı *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Etkinlik başlığını girin"
              />
            </div>

            {/* Kategori */}
            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
                Kategori *
              </label>
              <select
                id="categoryId"
                name="categoryId"
                required
                value={formData.categoryId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Kategori seçin</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Belediye */}
            <div>
              <label htmlFor="municipalityId" className="block text-sm font-medium text-gray-700 mb-2">
                Belediye *
              </label>
              <select
                id="municipalityId"
                name="municipalityId"
                required
                value={formData.municipalityId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Belediye seçin</option>
                  {filteredMunicipalities.map((municipality) => (
                  <option key={municipality.id} value={municipality.id}>
                    {municipality.name} - {municipality.city}
                  </option>
                ))}
                  {/* Fallback örnekler - seçilen şehir için sonuç yoksa göster */}
                  {showFallbackForCity && (
                    <>
                      {SAMPLES
                        .filter((m) => !selectedCity || m.city.toLowerCase() === selectedCity.toLowerCase())
                        .map((m) => (
                          <option key={`fb-${m.city}-${m.name}`} value={`fallback:${m.city}:${m.name}:${m.district ?? ''}`}>
                            {m.name} - {m.city} (örnek)
                          </option>
                        ))}
                    </>
                  )}
              </select>
              <p className="text-xs text-gray-500 mt-1">Şehir seçerek seçenekleri daraltın. Veri yoksa örnek belediyeler gösterilir.</p>
            </div>

            {/* İl / İlçe */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                İl
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="İl"
              />
            </div>
            <div>
              <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
                İlçe
              </label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="İlçe"
              />
            </div>

            {/* Başlangıç Tarihi */}
            <div>
              <label htmlFor="startDatetime" className="block text-sm font-medium text-gray-700 mb-2">
                Başlangıç Tarihi ve Saati *
              </label>
              <input
                type="datetime-local"
                id="startDatetime"
                name="startDatetime"
                required
                value={formData.startDatetime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Bitiş Tarihi */}
            <div>
              <label htmlFor="endDatetime" className="block text-sm font-medium text-gray-700 mb-2">
                Bitiş Tarihi ve Saati *
              </label>
              <input
                type="datetime-local"
                id="endDatetime"
                name="endDatetime"
                required
                value={formData.endDatetime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Mekan Adı */}
            <div>
              <label htmlFor="venueName" className="block text-sm font-medium text-gray-700 mb-2">
                Mekan Adı *
              </label>
              <input
                type="text"
                id="venueName"
                name="venueName"
                required
                value={formData.venueName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Etkinlik mekanı"
              />
            </div>

            {/* Mekan Adresi */}
            <div>
              <label htmlFor="venueAddress" className="block text-sm font-medium text-gray-700 mb-2">
                Mekan Adresi
              </label>
              <input
                type="text"
                id="venueAddress"
                name="venueAddress"
                value={formData.venueAddress}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Detaylı adres"
              />
            </div>

            {/* Kapasite */}
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-2">
                Kapasite
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                min="1"
                required
                value={formData.capacity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Maksimum katılımcı sayısı"
              />
            </div>

            {/* Fiyat */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Fiyat (TL)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                min="0"
                step="0.01"
                disabled={formData.isFree}
                value={formData.isFree ? '0' : formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="0.00"
              />
              {formData.isFree && (
                <p className="text-xs text-green-600 mt-1">
                  Ücretsiz etkinlik olarak ayarlandı
                </p>
              )}
            </div>
          </div>

          {/* Açıklama */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Açıklama * <span className="text-xs text-gray-500">(En az 10 karakter)</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              minLength={10}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Etkinlik açıklaması (en az 10 karakter)"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length}/10 karakter
            </p>
          </div>

          {/* Ücretsiz mi? */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isFree"
              name="isFree"
              checked={formData.isFree}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isFree" className="ml-2 block text-sm text-gray-900">
              Ücretsiz etkinlik
            </label>
          </div>

          {/* Kayıt Gerekli mi? */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="registrationRequired"
              name="registrationRequired"
              checked={formData.registrationRequired}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="registrationRequired" className="ml-2 block text-sm text-gray-900">
              Kayıt gerekli
            </label>
          </div>

          {/* Submit Butonları */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={() => router.push('/admin/events')}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={loading || formData.description.length < 10}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Oluşturuluyor...' : 'Etkinlik Oluştur'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}