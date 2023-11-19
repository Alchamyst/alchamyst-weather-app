import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './views/HomePage';
import NotFoundPage from './views/NotFoundPage';


function App() {

  return (
    <>
      <Header />
      <main>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          {/* <Route path="/explorer" element={<HomePage/>} /> */}
          {/* <Route path="/register" element={<HomePage/>} /> */}
          {/* <Route path="/login" element={<HomePage/>} /> */}
          <Route path="*" exact element={<NotFoundPage />} status={404}/> 
        </Routes>
      </Router>
      </main>
      <Footer />
    </>
  )
}

export default App
