'use client';
import Image from 'next/image';
import GoogleImg from '@/public/Google.png';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from '@/firebase';

export default function Signup() {
  const router = useRouter();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success' | ''>('');

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const login = () => {
    router.push('/login');
  };

  const handleGoogleSignup = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        localStorage.setItem('loginMethod', 'google');
        setMessage('Signed up with Google.');
        setMessageType('success');
        setTimeout(() => router.push('/dashboard'), 1000);
      })
      .catch(() => {
        setMessage('Google signup failed.');
        setMessageType('error');
      });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setMessage('All fields required');
      setMessageType('error');
      return;
    }

    if (!/^[\w.-]+@([\w-]+\.)+(com|net|org|edu)$/.test(email)) {
      setMessage('Enter a valid email address');
      setMessageType('error');
      return;
    }

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('Account created.');
      setMessageType('success');
      router.push('/login');
    } else if (res.status === 423) {
      setMessage(data.message || 'System Unavailable Due To A Unfortunate Attack(Dead Man Protocol Engaged)');
      setMessageType('error');
    } else {
      setMessage(data.error || 'Signup failed');
      setMessageType('error');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <form onSubmit={handleSignup} className='w-full max-w-sm bg-white p-6 rounded shadow-md'>
        <h2 className='text-2xl font-bold mb-4 text-center text-black'>Signup</h2>

        {message && (
          <div
            role='alert'
            className={`alert mb-4 ${
              messageType === 'error' ? 'alert-error' : 'alert-success'
            }`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 shrink-0 stroke-current'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d={
                  messageType === 'error'
                    ? 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                    : 'M5 13l4 4L19 7'
                }
              />
            </svg>
            <span className='ml-2'>{message}</span>
          </div>
        )}
        <input
          type='text'
          placeholder='Name'
          className='input bg-white border-black text-black hover:border-blue-200'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <input
          type='email'
          placeholder='Email'
          className='input bg-white border-black text-black hover:border-blue-200'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <input
          type='password'
          placeholder='Password'
          className='input bg-white border-black text-black hover:border-blue-200'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button type='submit' className='btn btn-block cursor-pointer bg-white border-black text-black hover:border-blue-200'>
          Signup
        </button>
        <br />
        <br />
        <button
          type='button'
          onClick={handleGoogleSignup}
          className='btn btn-block cursor-pointer bg-white border-black text-black hover:border-blue-200 flex items-center justify-center gap-2'
        >
          <Image src={GoogleImg} alt="Google logo" width={20} height={20} />
          Signup with Google
        </button>
        <br />
        <br />
        <p className='text-black'>
          Already have an account?{' '}
          <span onClick={login} className='link cursor-pointer hover:text-blue-200 text-black'>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}