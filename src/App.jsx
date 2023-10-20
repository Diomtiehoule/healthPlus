import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBarHome from './composant/NavBarHome'
import Home from './composant/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    < NavBarHome />
    < Home />
    </>
  )
}

export default App
