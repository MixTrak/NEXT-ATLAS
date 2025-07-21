import React from 'react';
import NavBar from '@/components/navbar';
import './page.css';

// Change from 'export const Home = () => {' to 'const Home = () => {' and then export default
const Home = () => {
  return (
    <div className=''>
      <NavBar />
      
      <div className="hero bg-white min-h-screen flex items-center justify-center py-12">
        <div className="hero-content flex-col lg:flex-row max-w-4xl mx-auto px-4"> 
          <div>
            <h1 className="text-5xl font-bold text-black text-center lg:text-left">What Is NEXT-ATLAS?</h1>
            <p className="py-6 text-black text-lg text-center lg:text-left">
              <span className='font-extrabold'>NEXT-ATLAS</span> is a modern, full-stack website that combines the power of <span className='font-extrabold'>NEXT-JS</span> and The <span className='font-extrabold'>Modern MERN STACK</span> to create scalable, efficient, and user-friendly web application. It leverages <span className='font-extrabold'>HYPE TRAIN</span> technologies like <span className='font-extrabold'>TypeScript</span> and <span className='font-extrabold'>Tailwind</span> to provide a seamless development experience.
            </p>
            <a className="btn btn-block mt-4 lg:w-auto" href='#/'>Scroll</a>
          </div>
        </div>
      </div>

      <div id='/' className='bg-white text-black p-8 pb-16'>
        <div className='flex flex-col justify-center items-center mt-12'>
          <p className='text-gray-500 text-xl mb-6 font-black'>WEB TECHNOLOGIES USED FOR THIS APPLICATION</p> 
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'> 
            <button className="btn w-60 text-green-400 border border-green-400 hover:bg-green-400 hover:text-white transition-colors duration-300">MongoDB</button>
            <button className="btn w-60 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300">TypeScript</button>
            <button className="btn w-60 text-blue-400 border border-blue-200 hover:bg-blue-200 hover:text-gray-800 transition-colors duration-300">React</button>
            <button className="btn w-60 text-white bg-gray-800 border border-gray-800 hover:bg-white hover:text-gray-800 transition-colors duration-300">Next.js</button>
            <button className="btn w-60 text-blue-300 border border-blue-300 hover:bg-blue-300 hover:text-white transition-colors duration-300">Tailwind</button>
            <button className="btn w-60 text-yellow-200 border border-yellow-200 hover:bg-yellow-200 hover:text-gray-800 transition-colors duration-300">DaisyUI</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;