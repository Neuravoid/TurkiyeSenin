import { PrismaClient } from '@prisma/client';
import { signToken } from './lib/auth.js';

const prisma = new PrismaClient();

async function testAuth() {
  console.log('🔍 Auth sistemi test ediliyor...\n');
  
  // 1. Admin kullanıcısını bul
  const admin = await prisma.user.findUnique({
    where: { email: 'admin@example.com' }
  });
  
  if (!admin) {
    console.log('❌ Admin kullanıcısı bulunamadı!');
    return;
  }
  
  console.log('✅ Admin kullanıcısı bulundu:');
  console.log(`   ID: ${admin.id}`);
  console.log(`   Email: ${admin.email}`);
  console.log(`   Role: ${admin.role}\n`);
  
  // 2. Token oluştur
  const token = signToken({
    sub: admin.id,
    email: admin.email,
    role: admin.role
  });
  
  console.log('🎫 Token oluşturuldu:');
  console.log(`   Token: ${token.substring(0, 50)}...\n`);
  
  // 3. Token'ı doğrula
  const { verifyToken } = await import('./lib/auth.js');
  const verified = verifyToken(token);
  
  console.log('🔐 Token doğrulama:');
  console.log(`   Sonuç: ${verified ? '✅ Başarılı' : '❌ Başarısız'}`);
  if (verified) {
    console.log(`   Sub: ${verified.sub}`);
    console.log(`   Email: ${verified.email}`);
    console.log(`   Role: ${verified.role}`);
  }
}

testAuth().finally(() => prisma.$disconnect());