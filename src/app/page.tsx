'use client';

import Head from 'next/head';
import ChatWidget from '../components/ChatWidget';

export default function Home() {
  return (
    <div style={{ fontFamily: 'sans-serif', lineHeight: 1.6 }}>
      {/* Background/Demo Content */}
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#111' }}>
          Welcome to Antigravity
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem' }}>
          We build amazing digital products. Scroll down to see more!
        </p>

        <div style={{
          height: '300px',
          background: 'linear-gradient(to right, #f8f9fa, #e9ecef)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#888',
          marginBottom: '2rem'
        }}>
          Placeholder Content Area
        </div>

        <p>
          Need help? Click the chat icon in the bottom right corner to talk to our assistant!
        </p>
      </main>

      {/* The Chat Widget */}
      <ChatWidget />
    </div>
  );
}
