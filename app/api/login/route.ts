// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';
import User from '@/models/User';
import { deadManCheck } from '@/utils/deadManCheck';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();
    const lowerEmail = email.toLowerCase();
    
    // Corrected password trimming
    const trimPassword = password.trim(); 

    const dm = await deadManCheck();
    if (!dm.ok) {
      return NextResponse.json({ error: dm.message }, { status: 423 });
    }

    const user = await User.findOne({ email: lowerEmail });
    if (!user) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
    }

    // Corrected password comparison
    if (user.password !== trimPassword) { 
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Success', user }, { status: 200 });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Server error during login' }, { status: 500 });
  }
}