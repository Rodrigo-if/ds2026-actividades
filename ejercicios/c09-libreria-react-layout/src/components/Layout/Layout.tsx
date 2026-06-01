import type { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import { Navbar, Guirnaldas } from '../componentes';
import '../../assets/styles/App.css'

interface LayoutProps { children: ReactNode};

function Layout({ children }: LayoutProps) {
    return (
        <div>
            <Navbar />
            <Guirnaldas />
            <Container fluid className='p-0 m-0'>{children}</Container>
        </div>
    );
}

export default Layout;