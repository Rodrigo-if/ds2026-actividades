/*import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'*/
import 'bootstrap/dist/css/bootstrap.min.css'
//import { useState } from 'react'
import { Catalogo, Hero, Navbar, Guirnaldas } from './components/componentes'
import './App.css'

function App() {
  return (
    <main>
      <Navbar />
      <Guirnaldas />
      <Hero />
      <div className="container my-5 d-flex flex-column align-items-center gap-5">
        <h1>Libros destacados</h1>
        <Catalogo query="bestseller" n={6} />
      </div>
    </main>
  );
}

export default App
