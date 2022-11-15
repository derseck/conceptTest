import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import ClienteServices from "../services/ClienteServices";

function EditarCliente() {

    const initialClient = {
        id: null,
        cc: "",
        nombres: "",
        apellidos: "",
        telefono: ""
    };

    const [cliente, setCliente] = useState(initialClient);
    let { id } = useParams();

    useEffect(() => {
        ClienteServices.get(id)
            .then((response) => {
                setCliente(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [setCliente]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCliente({ ...cliente, [name]: value });
    };

    const updateCliente = () => {
        ClienteServices.update(cliente.id, cliente)
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
                                id="cc"
                                name="cc"
                                placeholder="1.121.923.123"
                                value={cliente.cc}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="cc">CC</label>
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
                                id="nombres"
                                name="nombres"
                                placeholder="Sara"
                                value={cliente.nombres}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="nombres">Nombres</label>
                        </div>
                    </div>
                </div>
                <div className="row m-1 p-1">
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="text" className="form-control"
                                id="apellidos"
                                name="apellidos"
                                placeholder="Garcia"
                                value={cliente.apellidos}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="apellidos">Apellidos</label>
                        </div>
                    </div>
                </div>
                <div className="row m-1 p-1">
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="text" className="form-control"
                                id="telefono"
                                name="telefono"
                                placeholder="3112348392"
                                value={cliente.telefono}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="telefono">Telefono</label>
                        </div>
                    </div>
                </div>
                <div className="row m-1 p-1">
                    <div className="d-grid col-3 mx-auto">
                        <button type="submit" className="btn btn-primary text-center" onClick={updateCliente}>Guardar</button>
                    </div>
                    <div className="d-grid col-3 mx-auto">
                        <Link className="btn btn-primary text-center" to="/clientes">Volver</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditarCliente;