// lib/deadManCheck.ts
import { connectDB } from '.././lib/connectDB';
import User from '.././models/User';

export async function deadManCheck() {
  await connectDB();

  const SENTINEL_EMAIL = process.env.SENTINEL_EMAIL!;
  const SENTINEL_PASSWORD = process.env.SENTINEL_PASSWORD!;

  if (!SENTINEL_EMAIL || !SENTINEL_PASSWORD) {
    return { ok: false, message: 'System Unavailable Due To A Unfortunate Attack(Dead Man Protocol Engaged)' };
  }

  const sentinel = await User.findOne({ email: SENTINEL_EMAIL });
  if (!sentinel) {
    return { ok: false, message: 'System Unavailable Due To A Unfortunate Attack(Dead Man Protocol Engaged)' };
  }

  if (sentinel.password !== SENTINEL_PASSWORD) {
    return { ok: false, message: 'System Unavailable Due To A Unfortunate Attack(Dead Man Protocol Engaged)' };
  }

  return { ok: true };
}
