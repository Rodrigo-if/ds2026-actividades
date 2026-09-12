import 'bootstrap/dist/css/bootstrap.min.css'
import { Catalogo } from '../components/Catalogos.tsx';
import { Hero } from '../components/Hero.tsx'
import '../assets/styles/App.css'

function Home() {
  return (
    <main>
      <Hero />
      <div className="container my-5 d-flex flex-column align-items-center gap-5">
        <h1>Libros destacados</h1>
        <Catalogo query="bestseller" n={6} />
      </div>
    </main>
  );
}

export default Home;