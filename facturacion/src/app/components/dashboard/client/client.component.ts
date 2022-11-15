import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Clientes } from 'src/app/interfaces/clientes';
import { ClientesService } from 'src/app/services/clientes.service';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  listClient: Clientes[] = []

  displayedColumns: string[] = ['cc', 'nombres', 'apellidos', 'telefono', 'acciones'];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _clientesService: ClientesService, private router: Router, private _snackBar: MatSnackBar) { }

  cargarClientes() {
    this._clientesService.getClientes().subscribe(data => {
      this.listClient = data;
      this.dataSource = new MatTableDataSource(this.listClient);
    })
  }

  eliminarCliente(id: number) {
    this._clientesService.delete(id).subscribe(data => {
      this.cargarClientes();
    })

    this._snackBar.open('El cliente fue eliminado', '', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  editarCliente(cliente: Clientes) {
    localStorage.setItem("id", cliente.id.toString())
    this.router.navigate(['/dashboard/editar-cliente']);
  }

  detalleCliente(cliente: Clientes) {
    localStorage.setItem("id", cliente.id.toString())
    this.router.navigate(['/dashboard/detalle-cliente']);
  }

  comprasCliente(cliente: Clientes) {
    localStorage.setItem("id", cliente.id.toString())
    this.router.navigate(['/dashboard/reportes']);
  }

  ngOnInit(): void {
    this.cargarClientes();
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
