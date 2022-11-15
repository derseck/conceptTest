import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Clientes } from 'src/app/interfaces/clientes';
import { Item } from 'src/app/interfaces/item';
import { Orden } from 'src/app/interfaces/orden';
import { ClientesService } from 'src/app/services/clientes.service';
import { OrdenItemService } from 'src/app/services/orden-item.service';
import { OrdenService } from 'src/app/services/orden.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.css']
})
export class DetalleFacturaComponent implements OnInit {

  flag: boolean = false;
  total: number = 0;
  item!: Item;
  listItems: Item[] = [];
  orden!: Orden;
  cliente!: Clientes;

  displayedColumns: string[] = ['referencia', 'nombre', 'cantidad', 'subtotal'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer, private _ordenService: OrdenService, private _clienteService: ClientesService, private _ordenItemService: OrdenItemService, private _productoService: ProductosService, private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar) {}

  cargarFactura() {
    let id = localStorage.getItem("idOrden");
    this.cliente = {} as Clientes;
    this.orden = {} as Orden;

    this._ordenService.getOrdenById(+id!).subscribe(data => {
      this.orden = data;

      this._clienteService.getCliente(this.orden.cliente).subscribe(dataCliente => {
        this.cliente = dataCliente;
      })

      this._ordenItemService.getOrdenItemByOrden(this.orden.id).subscribe(dataItems => {
        for(let i=0; i<dataItems.length; i++){
          this._productoService.getProducto(dataItems[i]['producto']).subscribe(dataProduct => {
            this.item = {} as Item;
            this.item.referencia = dataProduct.referencia;
            this.item.nombre = dataProduct.nombre;
            this.item.cantidad = dataItems[i]['cantidad'];
            this.item.subtotal = dataItems[i]['cantidad'] * dataProduct.precio;
            this.total = this.total + this.item.subtotal;
            this.listItems.push(this.item);
            this.dataSource = new MatTableDataSource(this.listItems);
          })
        }
      })
    })
  }

  volver() {
    this.router.navigate(['/dashboard/reportes']);
  }

  ngOnInit(): void {
    this.cargarFactura();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 300);
  }

  ngOnChanges() {
    if(this.listItems.length>0) {
      this.flag=true;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
