import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { userSchema } from '@/lib/validators';
import { ZodError } from 'zod';
import bcrypt from 'bcryptjs';

type RouteContext = {
  params: {
    id: string;
  };
};

// GET a single user by ID
export async function GET(req: Request, { params }: RouteContext) {
  try {
    await verifyAdminRequest();
    
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        city: true,
        district: true,
        createdAt: true,
        updatedAt: true,
        registrations: {
          include: {
            event: {
              select: {
                id: true,
                title: true,
                startDatetime: true,
                venueName: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            registrations: true
          }
        }
      }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Users GET Error:', error);
    if (error instanceof Error) {
      if (error.message.includes('Authentication required')) {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
      if (error.message.includes('Forbidden')) {
        return NextResponse.json({ error: error.message }, { status: 403 });
      }
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT (update) a user by ID
export async function PUT(req: Request, { params }: RouteContext) {
  try {
    const adminUser = await verifyAdminRequest();
    const body = await req.json();
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id }
    });
    
    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Prevent admin from demoting themselves
    if (existingUser.id === adminUser.sub && body.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'You cannot change your own admin role' }, 
        { status: 400 }
      );
    }
    
    const { password, ...userData } = body;
    const data = userSchema.parse(userData);
    
    // Check if email is being changed and if it's already taken
    if (data.email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: data.email }
      });
      
      if (emailExists) {
        return NextResponse.json(
          { error: 'Email is already taken by another user' }, 
          { status: 400 }
        );
      }
    }
    
    let updateData: any = data;
    
    // If password is provided, hash it
    if (password && password.length >= 6) {
      updateData.passwordHash = await bcrypt.hash(password, 12);
    } else if (password && password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' }, 
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        city: true,
        district: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error('Admin User PUT Error:', error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid input data', 
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        }, 
        { status: 400 }
      );
    }
    
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email is already taken by another user' }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error.message }, 
      { status: error.message.includes('privileges') ? 403 : 500 }
    );
  }
}

// DELETE a user by ID
export async function DELETE(req: Request, { params }: RouteContext) {
  try {
    const adminUser = await verifyAdminRequest();
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            registrations: true
          }
        }
      }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Prevent admin from deleting themselves
    if (user.id === adminUser.sub) {
      return NextResponse.json(
        { error: 'You cannot delete your own account' }, 
        { status: 400 }
      );
    }
    
    // Optional: Prevent deletion if user has registrations
    if (user._count.registrations > 0) {
      return NextResponse.json(
        { 
          error: 'Cannot delete user with existing event registrations. Please cancel all registrations first.',
          registrationCount: user._count.registrations
        }, 
        { status: 400 }
      );
    }
    
    await prisma.user.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error('Admin User DELETE Error:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Cannot delete user due to existing references. Please remove all related data first.' }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error.message }, 
      { status: error.message.includes('privileges') ? 403 : 500 }
    );
  }
}