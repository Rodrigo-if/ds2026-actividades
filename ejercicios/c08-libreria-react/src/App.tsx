/*import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'*/
import 'bootstrap/dist/css/bootstrap.min.css'
//import { useState } from 'react'
import { Catalogo } from './components/componentes'
import './App.css'

function App() {
  return (
    <main className="container my-5">
      <Catalogo query="bestseller" n={6} />
    </main>
  );
}

export default App
