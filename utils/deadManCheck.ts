// utils/deadManCheck.ts
import { connectDB } from '.././lib/connectDB';
import User from '.././models/User';

export async function deadManCheck() {
  try {
    await connectDB();

    const SENTINEL_EMAIL = process.env.SENTINEL_EMAIL!;
    const SENTINEL_PASSWORD = process.env.SENTINEL_PASSWORD!;

    if (!SENTINEL_EMAIL || !SENTINEL_PASSWORD) {
      console.log('Dead Man Check: Missing environment variables');
      return { ok: false, message: 'System Unavailable Due To A Unfortunate Attack(Dead Man Protocol Engaged)' };
    }

    // Trim and lowercase email to match signup/login logic
    const trimmedEmail = SENTINEL_EMAIL.toLowerCase().trim();
    const trimmedPassword = SENTINEL_PASSWORD.trim();

    console.log('Dead Man Check: Looking for sentinel user with email:', trimmedEmail);
    
    const sentinel = await User.findOne({ email: trimmedEmail });
    if (!sentinel) {
      console.log('Dead Man Check: Sentinel user not found');
      return { ok: false, message: 'System Unavailable Due To A Unfortunate Attack(Dead Man Protocol Engaged)' };
    }

    console.log('Dead Man Check: Sentinel user found');
    console.log('Dead Man Check: Stored password length:', sentinel.password?.length);
    console.log('Dead Man Check: Expected password length:', trimmedPassword.length);

    // Compare trimmed passwords
    if (sentinel.password !== trimmedPassword) {
      console.log('Dead Man Check: Password mismatch');
      console.log('Dead Man Check: Stored password:', `"${sentinel.password}"`);
      console.log('Dead Man Check: Expected password:', `"${trimmedPassword}"`);
      return { ok: false, message: 'System Unavailable Due To A Unfortunate Attack(Dead Man Protocol Engaged)' };
    }

    console.log('Dead Man Check: SUCCESS - Sentinel verification passed');
    return { ok: true };
  } catch (error) {
    console.error('Dead Man Check: Error occurred:', error);
    return { ok: false, message: 'System Unavailable Due To A Unfortunate Attack(Dead Man Protocol Engaged)' };
  }
}