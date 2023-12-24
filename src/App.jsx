import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './views/HomePage';
import PlannerPage from './views/PlannerPage';
import AboutPage from './views/AboutPage';
import NotFoundPage from './views/NotFoundPage';


function App() {

  return (
    <>
      <Header />
      <main>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          {/* <Route path="/planner" element={<PlannerPage/>} /> */}
          <Route path="/about" element={<AboutPage/>} />
          {/* <Route path="/register" element={<RegisterPage/>} /> */}
          {/* <Route path="/login" element={<LoginPage/>} /> */}
          <Route path="*" exact element={<NotFoundPage />} status={404}/> 
        </Routes>
      </Router>
      </main>
      <Footer />
    </>
  )
}

export default App
