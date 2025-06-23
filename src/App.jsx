import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import News from './Components/News'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)
 
  return (
    <>
    <Router>
     <Navbar/>
     <Routes>
      <Route exact path="/" element={<News size={5} country="in" key="top" category="top"/>} />
      <Route exact path="/entertainment" element={<News size={5} country="in" key="entertainment" category="entertainment"/>} />
      <Route exact path="/environment" element={<News size={5} country="in" key="environment" category="environment"/>} />
      <Route exact path="/food" element={<News size={5} country="in" key="food" category="food"/>} />
      <Route exact path="/health" element={<News size={5} country="in" key="health" category="health"/>} />
      <Route exact path="/politics" element={<News size={5} country="in" key="politics" category="politics"/>} />
      <Route exact path="/science" element={<News size={5} country="in" key="science" category="science"/>} />
      <Route exact path="/sports" element={<News size={5} country="in" key="sports" category="sports"/>} />
      <Route exact path="/technology" element={<News size={5} country="in" key="technology" category="technology"/>} />
      <Route exact path="/business" element={<News size={5} country="in" key="business" category="business"/>} />
     </Routes>
    </Router>
    </>
  )
}

export default App
