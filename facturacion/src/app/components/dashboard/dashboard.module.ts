import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClientComponent } from './client/client.component';
import { ReporteComponent } from './reporte/reporte.component';
import { ProductoComponent } from './producto/producto.component';
import { CrearClienteComponent } from './client/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './client/editar-cliente/editar-cliente.component';
import { DetalleClienteComponent } from './client/detalle-cliente/detalle-cliente.component';
import { CrearProductoComponent } from './producto/crear-producto/crear-producto.component';
import { DetalleProductoComponent } from './producto/detalle-producto/detalle-producto.component';
import { EditarProductoComponent } from './producto/editar-producto/editar-producto.component';
import { DetalleFacturaComponent } from './reporte/detalle-factura/detalle-factura.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    ClientComponent,
    ReporteComponent,
    ProductoComponent,
    CrearClienteComponent,
    EditarClienteComponent,
    DetalleClienteComponent,
    CrearProductoComponent,
    DetalleProductoComponent,
    EditarProductoComponent,
    DetalleFacturaComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
