'use client';
import Link from 'next/link';
import React from 'react';

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-black text-white shadow-md">
      <h1 className="text-xl font-bold cursor-pointer">ATLAS</h1>
      <div className="flex gap-4">
        <Link href="/signup" className="btn btn-outline border-black text-white hover:bg-white hover:text-black">
          Signup
        </Link>
        <Link href="/login" className="btn btn-outline border-black text-white hover:bg-white hover:text-black">
          Login
        </Link>
      </div>
    </nav>
  );
}
