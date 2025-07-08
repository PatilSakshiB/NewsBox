import './App.css'
import React, { Component, useState } from 'react';
import Navbar from './Components/Navbar'
import News from './Components/News'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";

function App() {
  const size = 8;
    const [progress, setProgress] = useState(0);
  return (
    <>
    <Router>
     <Navbar/>
      <LoadingBar
        height={3}
        color="#f11946"
        progress={progress}
      />
     <Routes>
      <Route exact path="/" element={<News setProgress={setProgress}  size={size} country="in" key="world" category="world"/>} />
      <Route exact path="/entertainment" element={<News setProgress={setProgress}  size={size} country="in" key="entertainment" category="entertainment"/>} />
      <Route exact path="/environment" element={<News setProgress={setProgress}  size={size} country="in" key="environment" category="environment"/>} />
      <Route exact path="/food" element={<News setProgress={setProgress}  size={size} country="in" key="food" category="food"/>} />
      <Route exact path="/health" element={<News setProgress={setProgress}  size={size} country="in" key="health" category="health"/>} />
      <Route exact path="/politics" element={<News setProgress={setProgress}  size={size} country="in" key="politics" category="politics"/>} />
      <Route exact path="/science" element={<News setProgress={setProgress}  size={size} country="in" key="science" category="science"/>} />
      <Route exact path="/sports" element={<News setProgress={setProgress}  size={size} country="in" key="sports" category="sports"/>} />
      <Route exact path="/technology" element={<News setProgress={setProgress}  size={size} country="in" key="technology" category="technology"/>} />
      <Route exact path="/business" element={<News setProgress={setProgress}  size={size} country="in" key="business" category="business"/>} />
     </Routes>
    </Router>
    </>
  )
}

export default App
