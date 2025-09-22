import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { scholarshipQuerySchema } from '@/lib/validators';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parsed = scholarshipQuerySchema.safeParse({
    city: searchParams.get('city') ?? undefined,
    educationLevel: searchParams.get('educationLevel') ?? undefined,
    activeOnly: searchParams.get('activeOnly') ?? undefined,
    q: searchParams.get('q') ?? undefined,
  });
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid query' }, { status: 400 });
  }

  const { city, educationLevel, activeOnly, q, on } = parsed.data;
  const where: any = {};
  if (activeOnly) where.status = 'active';
  if (educationLevel) where.educationLevel = { contains: educationLevel, mode: 'insensitive' };
  if (q) where.OR = [
    { title: { contains: q, mode: 'insensitive' } },
    { description: { contains: q, mode: 'insensitive' } },
    { eligibilityCriteria: { contains: q, mode: 'insensitive' } },
  ];
  if (city) {
    where.municipality = { is: { city: { contains: city, mode: 'insensitive' } } };
  }
  if (on) {
    where.AND = [
      { OR: [ { applicationStart: null }, { applicationStart: { lte: on } } ] },
      { OR: [ { applicationEnd: null }, { applicationEnd: { gte: on } } ] },
    ];
  }

  const scholarships = await (prisma as any).scholarship.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      municipality: { select: { id: true, name: true, city: true, district: true } }
    }
  });

  return NextResponse.json({ scholarships });
}
