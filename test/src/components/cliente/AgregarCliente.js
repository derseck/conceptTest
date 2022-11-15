import React, { useState } from "react";
import ClienteServices from "../services/ClienteServices";

const AgregarCliente = () => {
    const initialClient = {
        id: null,
        cc: "",
        nombres: "",
        apellidos: "",
        telefono: ""
    };
    const [cliente, setCliente] = useState(initialClient);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCliente({ ...cliente, [name]: value });
    };

    const saveCliente = () => {
        var data = {
            cc: cliente.cc,
            nombres: cliente.nombres,
            apellidos: cliente.apellidos,
            telefono: cliente.telefono
        };

        ClienteServices.create(data)
            .then(response => {
                setCliente({
                    id: response.data.id,
                    cc: response.data.cc,
                    nombres: response.data.nombres,
                    apellidos: response.data.apellidos,
                    telefono: response.data.telefono
                });
                setSubmitted(true);
                console.log(response.data);
                newCliente();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newCliente = () => {
        setCliente(initialClient);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Se creo el usuario!</h4>
                    <a className="btn btn-success" href="/clientes"> Volver </a>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="cc">CC</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cc"
                            required
                            value={cliente.cc}
                            onChange={handleInputChange}
                            name="cc"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nombres">Nombres</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombres"
                            required
                            value={cliente.nombres}
                            onChange={handleInputChange}
                            name="nombres"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="apellidos">Apellidos</label>
                        <input
                            type="text"
                            className="form-control"
                            id="apellidos"
                            required
                            value={cliente.apellidos}
                            onChange={handleInputChange}
                            name="apellidos"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefono">Telefono</label>
                        <input
                            type="text"
                            className="form-control"
                            id="telefono"
                            required
                            value={cliente.telefono}
                            onChange={handleInputChange}
                            name="telefono"
                        />
                    </div>

                    <button onClick={saveCliente} className="btn btn-success"> Submit </button>
                </div>
            )}
        </div>
    );
};

export default AgregarCliente;