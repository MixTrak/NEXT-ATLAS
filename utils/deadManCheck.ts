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

    // Use exact email from env (no trimming/lowercasing to match what's actually in DB)
    const sentinelEmail = SENTINEL_EMAIL;
    const sentinelPassword = SENTINEL_PASSWORD;

    console.log('Dead Man Check: Looking for sentinel user with email:', sentinelEmail);
    
    const sentinel = await User.findOne({ email: sentinelEmail });
    if (!sentinel) {
      console.log('Dead Man Check: Sentinel user not found');
      // Auto-create sentinel user if not found
      try {
        const newSentinel = await User.create({
          name: 'System Sentinel',
          email: sentinelEmail,
          password: sentinelPassword
        });
        console.log('Dead Man Check: Sentinel user created successfully');
        return { ok: true };
      } catch (createError) {
        console.error('Dead Man Check: Failed to create sentinel user:', createError);
        return { ok: false, message: 'System Unavailable Due To A Unfortunate Attack(Dead Man Protocol Engaged)' };
      }
    }

    console.log('Dead Man Check: Sentinel user found');

    // Direct password comparison without trimming
    if (sentinel.password !== sentinelPassword) {
      console.log('Dead Man Check: Password mismatch');
      console.log('Dead Man Check: Stored password:', `"${sentinel.password}"`);
      console.log('Dead Man Check: Expected password:', `"${sentinelPassword}"`);
      return { ok: false, message: 'System Unavailable Due To A Unfortunate Attack(Dead Man Protocol Engaged)' };
    }

    console.log('Dead Man Check: SUCCESS - Sentinel verification passed');
    return { ok: true };
  } catch (error) {
    console.error('Dead Man Check: Error occurred:', error);
    return { ok: false, message: 'System Unavailable Due To A Unfortunate Attack(Dead Man Protocol Engaged)' };
  }
}