import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";

import ClienteServices from "../services/ClienteServices";

const Cliente = (props) => {
   const [clientes, setClientes] = useState([]);
   const clientesRef = useRef();
   const navigate = useNavigate();

   clientesRef.current = clientes;

   useEffect(() => {
      retrieveClientes();
   }, []);

   const retrieveClientes = () => {
      ClienteServices.getAll()
         .then((response) => {
            setClientes(response.data);
         })
         .catch((e) => {
            console.log(e);
         });
   };

   const openClient = (rowIndex) => {
      const id = clientesRef.current[rowIndex].id;
      navigate("/clientes/"+id);
   };

   const openOrden = (rowIndex) => {
      const id = clientesRef.current[rowIndex].id;
      navigate("/clientes/"+id+"/facturas");
   };

   const editClient = (rowIndex) => {
      const id = clientesRef.current[rowIndex].id;
      navigate("/editar-cliente/"+id);
   };

   const addClient = (rowIndex) => {
      navigate("/crear-cliente/");
   };

   const deleteClient = (rowIndex) => {
      const id = clientesRef.current[rowIndex].id;

      ClienteServices.remove(id)
         .then((response) => {
            navigate("/clientes");

            let newClientes = [...clientesRef.current];
            newClientes.splice(rowIndex, 1);

            setClientes(newClientes);
            console.log(response);
         })
         .catch((e) => {
            console.log(e);
         });
   };

   const columns = useMemo(
      () => [
         {
            Header: "CC",
            accessor: "cc",
         },
         {
            Header: "Nombres",
            accessor: "nombres",
         },
         {
            Header: "Apellidos",
            accessor: "apellidos",
         },
         {
            Header: "Telefono",
            accessor: "telefono",
         },
         {
            Header: "Actions",
            accessor: "actions",
            Cell: (props) => {
               const rowIdx = props.row.id;
               return (
                  <div>
                     <span className="m-2" onClick={() => openClient(rowIdx)}>
                        <i className="fa-solid fa-magnifying-glass action btn-fa"></i>
                     </span>

                     <span className="m-2" onClick={() => editClient(rowIdx)}>
                        <i className="far fa-edit action btn-fa"></i>
                     </span>

                     <span className="m-2" onClick={() => openOrden(rowIdx)}>
                        <i className="fa-solid fa-file-invoice-dollar btn-fa"></i>
                     </span>

                     <span className="m-2" onClick={() => deleteClient(rowIdx)}>
                        <i className="fas fa-trash action btn-fa"></i>
                     </span>
                  </div>
               );
            },
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
      data: clientes,
   });

   return (
      <div className="ms-2 mr-2">
         <div className="d-flex m-3 p-2 bg-light">
            <h3>Clientes</h3>
            <span className="example-spacer"></span>
            <span onClick={() => addClient()}>
               <i className="fa-solid fa-circle-plus btn-fa"></i>
            </span>
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
      </div>
   );
};

export default Cliente;