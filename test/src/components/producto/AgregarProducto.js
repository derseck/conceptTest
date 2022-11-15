import React, { useState } from "react";
import ProductoServices from "../services/ProductoServices";

const AgregarProducto = () => {
    const initialProduct = {
        id: null,
        referencia: "",
        nombre: "",
        descripcion: "",
        cantidad: 0,
        precio: 0
    };
    const [producto, setProducto] = useState(initialProduct);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setProducto({ ...producto, [name]: value });
    };

    const saveProducto = () => {
        var data = {
            referencia: producto.referencia,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            cantidad: producto.cantidad,
            precio: producto.precio
        };

        ProductoServices.create(data)
            .then(response => {
                setProducto({
                    id: response.data.id,
                    referencia: response.data.referencia,
                    nombre: response.data.nombre,
                    descripcion: response.data.descripcion,
                    cantidad: response.data.cantidad,
                    precio: response.data.precio
                });
                setSubmitted(true);
                console.log(response.data);
                newProducto();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newProducto = () => {
        setProducto(initialProduct);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Se creo el producto!</h4>
                    <a className="btn btn-success" href="/productos"> Volver </a>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="referencia">Referencia</label>
                        <input
                            type="text"
                            className="form-control"
                            id="referencia"
                            required
                            value={producto.referencia}
                            onChange={handleInputChange}
                            name="referencia"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            required
                            value={producto.nombre}
                            onChange={handleInputChange}
                            name="nombre"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="descripcion">Descripcion</label>
                        <input
                            type="text"
                            className="form-control"
                            id="descripcion"
                            required
                            value={producto.descripcion}
                            onChange={handleInputChange}
                            name="descripcion"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cantidad">Cantidad</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cantidad"
                            required
                            value={producto.cantidad}
                            onChange={handleInputChange}
                            name="cantidad"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="precio">Precio</label>
                        <input
                            type="text"
                            className="form-control"
                            id="precio"
                            required
                            value={producto.precio}
                            onChange={handleInputChange}
                            name="precio"
                        />
                    </div>

                    <button onClick={saveProducto} className="btn btn-success"> Submit </button>
                </div>
            )}
        </div>
    );
};

export default AgregarProducto;