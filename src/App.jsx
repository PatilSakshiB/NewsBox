import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import News from './Components/News'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <News size={5} country="in" category="sports"/>
    </>
  )
}

export default App
