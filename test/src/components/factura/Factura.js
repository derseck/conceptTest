import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTable } from "react-table";

import OrdenServices from "../services/OrdenServices";

const Factura = (props) => {
   const [facturas, setFacturas] = useState([]);
   const facturasRef = useRef();
   const navigate = useNavigate();

   facturasRef.current = facturas;
   let {id} = useParams();

   useEffect(() => {
      retrieveFacturas();
   }, []);

   const retrieveFacturas = () => {
      OrdenServices.getByClient(id)
         .then((response) => {
            setFacturas(response.data);
         })
         .catch((e) => {
            console.log(e);
         });
   };

   const abrirFactura = (rowIndex) => {
      const orden = facturasRef.current[rowIndex].id;
      navigate("/clientes/"+id+"/facturas/"+orden);
   };

   const columns = useMemo(
      () => [
         {
            Header: "Referencia",
            accessor: "referencia",
         },
         {
            Header: "Fecha",
            accessor: "fecha",
         },
         {
            Header: "Actions",
            accessor: "actions",
            Cell: (props) => {
               const rowIdx = props.row.id;
               return (
                  <div>
                     <span className="m-2" onClick={() => abrirFactura(rowIdx)}>
                        <i className="fa-solid fa-magnifying-glass action btn-fa"></i>
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
      data: facturas,
   });

   return (
      <div className="ms-2 mr-2">
         <div className="d-flex m-3 p-2 bg-light">
            <h3>facturas</h3>
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

export default Factura;