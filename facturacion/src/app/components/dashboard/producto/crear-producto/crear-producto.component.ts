import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Productos } from 'src/app/interfaces/productos';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private _productosService: ProductosService, private router: Router, private _snackBar: MatSnackBar) { 
    this.form = fb.group({
      referencia: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio: ['', Validators.required]
    });
  }

  crearProducto() {
    const producto: Productos = {
      id: 0,
      referencia: this.form.value.referencia,
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      cantidad: this.form.value.cantidad,
      precio: this.form.value.precio
    }

    this._productosService.insert(producto).subscribe(data => {
      this.router.navigate(['/dashboard/productos']);
    });

    this._snackBar.open('El producto fue creado', '', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  volver() {
    this.router.navigate(['/dashboard/productos']);
  }

  ngOnInit(): void {
  }

}
