import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Orden } from 'src/app/interfaces/orden';
import { OrdenService } from 'src/app/services/orden.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  listaCompras: Orden[] = []

  displayedColumns: string[] = ['referencia', 'fecha', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _ordenService: OrdenService ,private router: Router, private _snackBar: MatSnackBar) { }

  cargarCompras() {
    let id = localStorage.getItem("id");
    this._ordenService.getOrdenByClient(+id!).subscribe(data => {
      this.listaCompras = data;
      this.dataSource = new MatTableDataSource(this.listaCompras);
    })
  }

  detalleCompras(orden: Orden) {
    localStorage.setItem("idOrden", orden.id.toString())
    this.router.navigate(['/dashboard/detalle-factura']);
  }

  volver() {
    this.router.navigate(['/dashboard/clientes']);
  }

  ngOnInit(): void {
    this.cargarCompras();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 200);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
