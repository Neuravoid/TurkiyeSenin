import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function checkAdmin() {
  try {
    // Admin kullanıcısını bul
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@example.com' }
    });
    
    if (!admin) {
      console.log('❌ Admin kullanıcısı bulunamadı!');
      return;
    }
    
    console.log('✅ Admin kullanıcısı bulundu:');
    console.log('- ID:', admin.id);
    console.log('- Email:', admin.email);
    console.log('- Role:', admin.role);
    console.log('- First Name:', admin.firstName);
    console.log('- Last Name:', admin.lastName);
    
    // Şifre doğrulaması test et
    const passwordTest = await bcrypt.compare('Admin123!', admin.passwordHash);
    console.log('- Şifre testi:', passwordTest ? '✅ Doğru' : '❌ Yanlış');
    
    if (!passwordTest) {
      console.log('🔧 Şifre hash\'i:', admin.passwordHash);
    }
    
  } catch (error) {
    console.error('Hata:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmin();