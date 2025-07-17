import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';
import User from '@/models/User';
import { deadManCheck } from '@/utils/deadManCheck';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();
    const lowerEmail = email.toLowerCase();
    
    // Corrected password trimming (removes leading/trailing whitespace)
    const trimmedPassword = password.trim(); 

    const dm = await deadManCheck();
    if (!dm.ok) {
      return NextResponse.json({ error: dm.message }, { status: 423 });
    }

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Corrected password length check
    if (trimmedPassword.length < 8) { 
      return NextResponse.json({ error: 'Password must be at least eight characters long' }, { status: 400 });
    }

    const existing = await User.findOne({ email: lowerEmail });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // Use trimmedPassword when creating the user
    const newUser = await User.create({ name, email: lowerEmail, password: trimmedPassword });
    return NextResponse.json({ message: 'User created', user: newUser }, { status: 201 });
  } catch (err: unknown) { // Changed 'any' to 'unknown'
    let errorMessage = 'Server error during signup';
    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === 'string') {
      errorMessage = err;
    }
    console.error('Signup error:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}