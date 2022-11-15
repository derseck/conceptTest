import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useTable } from "react-table";

import OrdenServices from "../services/OrdenServices";
import ClienteServices from "../services/ClienteServices";
import OrdenItemService from "../services/OrdenItemServices";
import ProductoServices from "../services/ProductoServices";

const DetalleFactura = (props) => {

    const initialClient = {
        id: null,
        cc: "",
        nombres: "",
        apellidos: "",
        telefono: ""
    };

    const initialOrden = {
        id: null,
        referencia: "",
        cliente: 0,
        fecha: ""
    };

    const [factura, setFactura] = useState(initialOrden);
    const [cliente, setCliente] = useState(initialClient);
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState();

    let { id } = useParams();
    let { orden } = useParams();
    let back = "/clientes/" + id + "/facturas";
    let item;
    const aux = [];

    const itemsRef = useRef();

    itemsRef.current = items;

    useEffect(() => {
        queryOrden();
        queryClient();
        queryProducts();
    }, []);

    const queryOrden = () => {
        OrdenServices.get(orden)
            .then((response) => {
                setFactura(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const queryClient = () => {
        ClienteServices.get(id)
            .then((response) => {
                setCliente(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const queryProducts = () => {
        OrdenItemService.getByOrden(orden)
        .then((response) => {
            let sum = 0;
            //console.log("entro ln77------------- #res= "+response.data.length);
            for (let i = 0; i < response.data.length; i++) {
                //console.log("entro for------------- #res= " + response.data.length);
                ProductoServices.get(response.data[i]['producto'])
                .then((res) => {
                    item = {
                        referencia: "",
                        nombre: "",
                        cantidad: 0,
                        subtotal: 0
                    };
                    item.referencia = res.data.referencia;
                    item.nombre = res.data.nombre;
                    item.cantidad = response.data[i]['cantidad'];
                    item.subtotal = response.data[i]['cantidad'] * res.data.precio;
                    sum = sum + item.subtotal;
                    if (aux.length < response.data.length) {
                        aux.push(item);
                    }
                    if (i === response.data.length - 1) {
                        setTotal(sum);
                        setItems(aux);
                    }
                })
                .catch((ex) => {
                    console.log(ex);
                });
            }
        })
        .catch((e) => {
            console.log(e);
        });
    };

    const columns = useMemo(
        () => [
            {
                Header: "Referencia",
                accessor: "referencia",
            },
            {
                Header: "Nombre",
                accessor: "nombre",
            },
            {
                Header: "Cantidad",
                accessor: "cantidad",
            },
            {
                Header: "Subtotal",
                accessor: "subtotal",
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: items,
    });

    return (
        <div className="ms-2 mr-2">
            <div className="m-3 p-2 bg-light">
                <h5>Informacion Cliente</h5>
                <div className="d-flex">
                    <h6>Nombre: {cliente.nombres} {cliente.apellidos}</h6>
                    <span className="example-spacer"></span>
                    <h6>Documento: CC</h6>
                    <span className="example-spacer"></span>
                    <h6>Numero Documento: {cliente.cc}</h6>
                    <span className="example-spacer"></span>
                </div>
                <h5>Informacion Factura</h5>
                <div className="d-flex">
                    <h6>Fecha: {factura.fecha}</h6>
                    <span className="example-spacer"></span>
                    <h6>Referencia: {factura.referencia}</h6>
                    <span className="example-spacer"></span>
                    <span className="example-spacer"></span>
                </div>
            </div>

            <div className="col-11 list m-3 p-1">
                <table
                    className="table table-striped table-bordered"
                    {...getTableProps()}
                >
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="m-3 p-2 bg-light">
                <div className="d-flex">
                    <h5>Total:</h5>
                    <span className="example-spacer"></span>
                    <h5>{total}</h5>
                </div>
            </div>
            <div className="d-grid col-3 mx-auto">
                <Link className="btn btn-primary text-center" to={back}>Volver</Link>
            </div>
        </div>
    );
};

export default DetalleFactura;