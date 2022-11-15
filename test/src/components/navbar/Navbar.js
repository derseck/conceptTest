import {Link} from 'react-router-dom';

function ClienteMenu(props) {
    return (
        <Link className="nav-link fw-bold" to="/clientes">
            Clientes
        </Link>
    );
}

function ProductoMenu(props) {
    return (
        <Link className="nav-link fw-bold" to="/productos">
            Productos
        </Link>
    );
}

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-navbar">
            <div className="container-fluid">
                <span className="fw-bold"> 
                    <a href="/" className="navbar-brand"> My Application </a>
                </span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <span className="example-spacer"></span>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <ClienteMenu />
                        </li>
                        <li className="nav-item">
                            <ProductoMenu />
                        </li>
                    </ul>
                </div>
                <span className="example-spacer"></span>
                <i className="fa-solid fa-user"></i>
            </div>
        </nav>
    );
}

export default Navbar;