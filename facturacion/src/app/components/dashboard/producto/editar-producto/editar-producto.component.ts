import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Productos } from 'src/app/interfaces/productos';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private _productosService: ProductosService, private router: Router, private _snackBar: MatSnackBar) { 
    this.form = fb.group({
      id: ['', Validators.required],
      referencia: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio: ['', Validators.required]
    });
  }

  editarProducto() {
    const producto: Productos = {
      id: this.form.value.id,
      referencia: this.form.value.referencia,
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      cantidad: this.form.value.cantidad,
      precio: this.form.value.precio
    }

    this._productosService.update(producto.id, producto).subscribe(data => {
      this.router.navigate(['/dashboard/productos']);
    });

    this._snackBar.open('El producto fue actualizado', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  volver() {
    this.router.navigate(['/dashboard/productos']);
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

  ngOnInit(): void {
    this.cargarProducto();
  }

}
