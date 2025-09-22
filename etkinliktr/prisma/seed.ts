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
}

main().finally(async () => {
  await prisma.$disconnect();
});
