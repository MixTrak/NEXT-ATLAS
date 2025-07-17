'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from '@/firebase';
import GoogleImg from '@/public/Google.png';

export default function Login() {
  const router = useRouter();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

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

  const signup = () => {
    router.push('/signup')
  }

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(() => { // Corrected: removed 'result' parameter as it's not used
        localStorage.setItem('loginMethod', 'google');
        setMessage('Logged in with Google.');
        setMessageType('success');
        setTimeout(() => router.push('/dashboard'), 1000);
      })
      .catch(() => setMessage('Google login failed.'));
      setMessageType('error');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password){
      setMessage('All fields required');
      setMessageType('error');
      return;
    }

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('loginMethod', 'normal');
      localStorage.setItem('user', JSON.stringify(data.user));
      setMessage('Login successful');
      setMessageType('success'); 
      router.push('/dashboard');
    } else {
      setMessage(data.error || 'Login failed');
      setMessageType('error');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <form onSubmit={handleLogin} className='w-full max-w-sm bg-white p-6 rounded shadow-md'>
        <h2 className='text-2xl font-bold mb-4 text-center text-black'>Login</h2>

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
          Login
        </button>
        <br />
        <br />
        <button
          type='button'
          onClick={handleGoogleLogin}
          className='btn btn-block cursor-pointer bg-white border-black text-black hover:border-blue-200 flex items-center justify-center gap-2'
        >
          <Image src={GoogleImg} alt="Google logo" width={20} height={20} />
          Login with Google
        </button>
        <br />
        <br />
        <p className='text-black'>
          Don&apos;t have an account?{' '} {/* Corrected: Escaped apostrophe */}
          <span onClick={signup} className='link cursor-pointer hover:text-blue-200 text-black'>
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}