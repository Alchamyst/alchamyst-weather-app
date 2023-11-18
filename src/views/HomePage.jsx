import { useEffect, useState } from 'react';
import Weather from '../components/Weather';

export default function HomePage() {

  return (
    <>
      <h1>Check Current Weather</h1>
      <Weather />
    </>
  )
}