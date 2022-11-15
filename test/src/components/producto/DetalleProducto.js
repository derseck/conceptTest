import React, { useState, useEffect } from "react";
import { Link, useParams} from 'react-router-dom';
import ProductoServices from "../services/ProductoServices";

const DetalleProducto = props => {

    const initialProduct = {
        id: null,
        referencia: "",
        nombre: "",
        descripcion: "",
        cantidad: 0,
        precio: 0
    };

    const [producto, setProducto] = useState(initialProduct);
    let {id} = useParams();

    useEffect(() => {
        ProductoServices.get(id)
            .then((response) => {
                setProducto(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [setProducto]);

    return (
        <div className="m-1 p-1">
            <form>
                <div className="row m-1 p-1">
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="text" className="form-control"
                                id="referencia"
                                placeholder=""
                                value={producto.referencia}
                                readOnly
                            />
                            <label htmlFor="referencia">Referencia</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        {/* <img src="/img/user.png" className="img-fluid w-25" alt="User" /> */}
                    </div>

                </div>
                <div className="row m-1 p-1">
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="text" className="form-control"
                                id="nombre"
                                placeholder=""
                                value={producto.nombre}
                                readOnly
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
                                placeholder=""
                                value={producto.descripcion}
                                readOnly
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
                                placeholder=""
                                value={producto.cantidad}
                                readOnly
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
                                placeholder=""
                                value={producto.precio}
                                readOnly
                            />
                            <label htmlFor="precio">Precio</label>
                        </div>
                    </div>
                </div>
                <div className="row m-1 p-1">
                    <div className="d-grid col-3 mx-auto">
                        <Link className="btn btn-primary text-center" to="/productos">Volver</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default DetalleProducto;