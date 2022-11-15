import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Productos } from 'src/app/interfaces/productos';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  listProduct: Productos[] = []

  displayedColumns: string[] = ['referencia', 'nombre', 'descripcion', 'cantidad', 'precio', 'acciones'];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _productosService: ProductosService, private router: Router, private _snackBar: MatSnackBar) { }

  cargarProductos() {
    this._productosService.getProductos().subscribe(data => {
      this.listProduct = data;
      this.dataSource = new MatTableDataSource(this.listProduct);
    })
  }

  eliminarProducto(id: number) {
    this._productosService.delete(id).subscribe(data => {
      this.cargarProductos();
    })
    
    this._snackBar.open('El producto fue eliminado', '', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  editarProducto(producto: Productos) {
    localStorage.setItem("id", producto.id.toString())
    this.router.navigate(['/dashboard/editar-producto']);
  }

  detalleProducto(producto: Productos) {
    localStorage.setItem("id", producto.id.toString())
    this.router.navigate(['/dashboard/detalle-producto']);
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 100);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
