import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import ProductoServices from "../services/ProductoServices";

function EditarProducto() {

    const initialProduct = {
        id: null,
        referencia: "",
        nombre: "",
        descripcion: "",
        cantidad: 0,
        precio: 0
    };

    const [producto, setProducto] = useState(initialProduct);
    let { id } = useParams();

    useEffect(() => {
        ProductoServices.get(id)
            .then((response) => {
                setProducto(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [setProducto]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setProducto({ ...producto, [name]: value });
    };

    const updateProducto = () => {
        ProductoServices.update(producto.id, producto)
          .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };

    return (
        <div className="m-1 p-1">
            <form>
                <div className="row m-1 p-1">
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="text" className="form-control"
                                id="referencia"
                                name="referencia"
                                placeholder=""
                                value={producto.referencia}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="referencia">Referencia</label>
                        </div>
                    </div>
                    <div className="row-5 col-md-6">
                        <img src="/img/user.png" className="img-fluid w-25" alt="User" />
                    </div>

                </div>
                <div className="row m-1 p-1">
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="text" className="form-control"
                                id="nombre"
                                name="nombre"
                                placeholder=""
                                value={producto.nombre}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="nombre">Nombre</label>
                        </div>
                    </div>
                </div>
                <div className="row m-1 p-1">
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="text" className="form-control"
                                id="descripcion"
                                name="descripcion"
                                placeholder=""
                                value={producto.descripcion}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="descripcion">Descripcion</label>
                        </div>
                    </div>
                </div>
                <div className="row m-1 p-1">
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="text" className="form-control"
                                id="cantidad"
                                name="cantidad"
                                placeholder=""
                                value={producto.cantidad}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="cantidad">Cantidad</label>
                        </div>
                    </div>
                </div>
                <div className="row m-1 p-1">
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="text" className="form-control"
                                id="precio"
                                name="precio"
                                placeholder=""
                                value={producto.precio}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="precio">Precio</label>
                        </div>
                    </div>
                </div>
                <div className="row m-1 p-1">
                    <div className="d-grid col-3 mx-auto">
                        <button type="submit" className="btn btn-primary text-center" onClick={updateProducto}>Guardar</button>
                    </div>
                    <div className="d-grid col-3 mx-auto">
                        <Link className="btn btn-primary text-center" to="/productos">Volver</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditarProducto;