import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const demoPath = path.resolve(__dirname, '../data/demo.json');
const demo = JSON.parse(readFileSync(demoPath, 'utf-8'));

const prisma = new PrismaClient();

async function main() {
  // Basic categories (from titles): culture, music, family, sport
  const categories = [
    { slug: 'kultur', name: 'Kültür' },
    { slug: 'muzik', name: 'Müzik' },
    { slug: 'aile', name: 'Aile' },
    { slug: 'spor', name: 'Spor' }
  ];
  for (const c of categories) {
    await prisma.category.upsert({ where: { slug: c.slug }, update: {}, create: c });
  }

  // Sample municipalities for quick start
  const sampleMunicipalities = [
    { name: 'Kadıköy', city: 'İstanbul', district: 'Kadıköy' },
    { name: 'Üsküdar', city: 'İstanbul', district: 'Üsküdar' },
    { name: 'Yenimahalle', city: 'Ankara', district: 'Yenimahalle' },
    { name: 'Konak', city: 'İzmir', district: 'Konak' },
  ];
  for (const m of sampleMunicipalities) {
    // No unique on municipality, so try findFirst then create
    const exists = await prisma.municipality.findFirst({ where: { name: m.name, city: m.city } });
    if (!exists) {
      await prisma.municipality.create({ data: m });
    }
  }

  // Municipalities from demo
  const munByKey = new Map<string, string>();
  function muniKey(city: string, name: string) { return `${city.toLowerCase()}-${name.toLowerCase()}`; }

  for (const e of (demo as any).events) {
    const key = muniKey(e.venue_address?.split('/')[0] || 'istanbul', e.municipality_id || e.venue_name);
    if (!munByKey.has(key)) {
      const m = await prisma.municipality.create({ data: { name: e.municipality_id || e.venue_name, city: (e.venue_address?.split('/') ?? [''])[0] || 'İstanbul' } });
      munByKey.set(key, m.id);
    }
  }

  // Sample admin user
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      passwordHash: '$2a$10$aiJ/Dd4Prmib0EQMcn52S.GD6Nv0KVaOvzHsXdbvKFv1DIaszsh9C', // bcrypt of "Admin123!"
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN'
    }
  });

  // Events from demo.json
  for (const e of (demo as any).events) {
    const catSlug = e.category_id?.replace('cat-', '') || 'kultur';
    const cat = await prisma.category.findFirst({ where: { slug: catSlug } });
    if (!cat) continue;

  const anyMunId = (await prisma.municipality.findFirst())!.id;

    await prisma.event.upsert({
      where: { id: e.id },
      update: {},
      create: {
        id: e.id,
        municipalityId: anyMunId,
        title: e.title,
        description: e.description,
        categoryId: cat.id,
        startDatetime: new Date(e.start_datetime),
        endDatetime: new Date(e.end_datetime),
        venueName: e.venue_name,
        venueAddress: e.venue_address ?? null,
        venueLatitude: e.venue_latitude ?? null,
        venueLongitude: e.venue_longitude ?? null,
        capacity: e.capacity,
        currentRegistrations: e.current_registrations ?? 0,
        price: e.price ?? 0,
        isFree: !!e.is_free,
        registrationRequired: !!e.registration_required,
        status: e.status || 'active'
      }
    });
  }

  // Sample scholarships
  const kadikoy = await prisma.municipality.findFirst({ where: { name: 'Kadıköy' } });
  const uskudar = await prisma.municipality.findFirst({ where: { name: 'Üsküdar' } });
  if (kadikoy) {
    await (prisma as any).scholarship.create({
      data: {
        municipalityId: kadikoy.id,
        title: 'Kadıköy Belediyesi Üniversite Öğrencisi Bursu',
        description: 'İhtiyaç sahibi üniversite öğrencilerine 8 ay boyunca aylık destek.',
        eligibilityCriteria: 'İstanbul’da ikamet; aktif öğrenci belgesi; gelir beyanı.',
        applicationStart: new Date(),
        applicationEnd: new Date(Date.now() + 1000*60*60*24*30),
        quota: 100,
        educationLevel: 'Lisans',
        status: 'active'
      }
    }).catch(()=>{});
  }
  if (uskudar) {
    await (prisma as any).scholarship.create({
      data: {
        municipalityId: uskudar.id,
        title: 'Üsküdar Belediyesi Lise Destek Bursu',
        description: 'İlçedeki lise öğrencilerine eğitim desteği.',
        eligibilityCriteria: 'Üsküdar’da ikamet; not ortalaması; ihtiyaç durumu.',
        applicationStart: new Date(Date.now() - 1000*60*60*24*7),
        applicationEnd: new Date(Date.now() + 1000*60*60*24*21),
        quota: 200,
        educationLevel: 'Lise',
        status: 'active'
      }
    }).catch(()=>{});
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});
