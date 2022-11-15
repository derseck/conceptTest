import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Cliente from './components/cliente/Cliente';
import Producto from './components/producto/Producto';
import Navbar from './components/navbar/Navbar';
import DetalleCliente from './components/cliente/DetalleCliente';
import Facturas from './components/factura/Factura';
import EditarCliente from './components/cliente/EditarCliente';
import AgregarCliente from "./components/cliente/AgregarCliente";
import AgregarProducto from "./components/producto/AgregarProducto";
import DetalleProducto from "./components/producto/DetalleProducto";
import EditarProducto from "./components/producto/EditarProducto";
import DetalleFactura from "./components/factura/DetalleFactura";

function App() {

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/clientes' element={<Cliente />} />
          <Route path='/clientes/:id' element={<DetalleCliente />} />
          <Route path='/editar-cliente/:id' element={<EditarCliente />} />
          <Route path='/crear-cliente' element={<AgregarCliente />} />
          <Route path='/clientes/:id/facturas' element={<Facturas />} />
          <Route path='/clientes/:id/facturas/:orden' element={<DetalleFactura />} />
          <Route path='/productos' element={<Producto />} />
          <Route path='/productos/:id' element={<DetalleProducto />} />
          <Route path='/editar-producto/:id' element={<EditarProducto />} />
          <Route path='/crear-producto' element={<AgregarProducto />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
