import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './views/HomePage';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          {/* <Route path="/register" element={<HomePage/>} /> */}
          {/* <Route path="/login" element={<HomePage/>} /> */}
          {/* <Route path="/planner" element={<HomePage/>} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
