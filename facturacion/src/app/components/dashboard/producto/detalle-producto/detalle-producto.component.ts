import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private _productosService: ProductosService, private router: Router, private _snackBar: MatSnackBar) {
    this.form = fb.group({
      id: [''],
      referencia: {value: ''},
      nombre: {value: ''},
      descripcion: {value: ''},
      cantidad: {value: ''},
      precio: {value: ''}
    });
   }

   cargarProducto() {
    let id = localStorage.getItem("id");
    this._productosService.getProducto(+id!).subscribe(data => {
      this.form.setValue({
        id: data.id,
        referencia: data.referencia,
        nombre: data.nombre,
        descripcion: data.descripcion,
        cantidad: data.cantidad,
        precio: data.precio
      })
    })
  }

  volver() {
    this.router.navigate(['/dashboard/productos']);
  }

  ngOnInit(): void {
    this.cargarProducto();
  }

}
