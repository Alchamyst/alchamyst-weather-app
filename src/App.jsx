import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './views/HomePage';


function App() {

  return (
    <>
      <Header />
      <div className='main-content'>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          {/* <Route path="/register" element={<HomePage/>} /> */}
          {/* <Route path="/login" element={<HomePage/>} /> */}
          {/* <Route path="/planner" element={<HomePage/>} /> */}
        </Routes>
      </Router>
      </div>
      <Footer />
    </>
  )
}

export default App
