import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";

import ProductoServices from "../services/ProductoServices";

const Producto = (props) => {

   const [productos, setProductos] = useState([]);
   const productosRef = useRef();
   const navigate = useNavigate();

   productosRef.current = productos;

   useEffect(() => {
      retrieveProductos();
   }, []);

   const retrieveProductos = () => {
      ProductoServices.getAll()
         .then((response) => {
            setProductos(response.data);
         })
         .catch((e) => {
            console.log(e);
         });
   };

   const openProduct = (rowIndex) => {
      const id = productosRef.current[rowIndex].id;
      navigate("/productos/"+id);
   };

   const editProduct = (rowIndex) => {
      const id = productosRef.current[rowIndex].id;
      navigate("/editar-producto/"+id);
   };

   const addProduct = (rowIndex) => {
      navigate("/crear-producto/");
   };

   const deleteProduct = (rowIndex) => {
      const id = productosRef.current[rowIndex].id;

      ProductoServices.remove(id)
         .then((response) => {
            navigate("/productos");

            let newProductos = [...productosRef.current];
            newProductos.splice(rowIndex, 1);

            setProductos(newProductos);
            console.log(response);
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
            Header: "Descripcion",
            accessor: "descripcion",
         },
         {
            Header: "Cantidad",
            accessor: "cantidad",
         },
         {
            Header: "Precio",
            accessor: "precio",
         },
         {
            Header: "Actions",
            accessor: "actions",
            Cell: (props) => {
               const rowIdx = props.row.id;
               return (
                  <div>
                     <span className="m-2" onClick={() => openProduct(rowIdx)}>
                        <i className="fa-solid fa-magnifying-glass action btn-fa"></i>
                     </span>

                     <span className="m-2" onClick={() => editProduct(rowIdx)}>
                        <i className="far fa-edit action btn-fa"></i>
                     </span>

                     <span onClick={() => deleteProduct(rowIdx)}>
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
      data: productos,
   });

   return (
      <div className="m-2 p-3">
         <div className="d-flex m-3 p-2 bg-light">
            <h3>Productos</h3>
            <span className="example-spacer"></span>
            <span onClick={() => addProduct()}>
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
}

export default Producto;