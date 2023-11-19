import { useEffect, useState } from 'react';
import './homePage.css';
import Weather from '../components/Weather';

export default function HomePage() {

  return (
    <>
      <main className='homepage bg-light text-dark'>
        <h1>Check Current Weather</h1>
        <Weather />
      </main>
    </>
  )
}