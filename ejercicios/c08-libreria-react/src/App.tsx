/*import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'*/
import 'bootstrap/dist/css/bootstrap.min.css'
//import { useState } from 'react'
import {Card, Button} from 'react-bootstrap'
import './App.css'

//LibroCard
type LibroCardProps = {
  title: string;
  author_name?: string[];
  cover_i?: string;
}

function LibroCard({ title, author_name, cover_i }: LibroCardProps) {
  return (
    <Card className="card" style={{ width: "18rem" }}>
      <Card.Body className="d-flex flex-column gap-3">
        <img src={cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg` : 'placeholder.jpg'} className="card-img-top" alt="Portada del libro" />
        <Card.Title className="card-title">{title}</Card.Title>
        <Card.Text className="card-text">
          {author_name ? author_name.join(", ") : "Autor desconocido"}
        </Card.Text>
        <div className="mt-auto d-flex justify-content-end">
          <Button className="btn">Ver más</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

function App() {
  return (
    <main>
      <LibroCard title="El Quijote" author_name={["Miguel de Cervantes"]} cover_i="12345" />
    </main>
  );
}

export default App
