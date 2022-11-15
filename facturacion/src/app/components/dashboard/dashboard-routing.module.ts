import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { CrearClienteComponent } from './client/crear-cliente/crear-cliente.component';
import { DetalleClienteComponent } from './client/detalle-cliente/detalle-cliente.component';
import { EditarClienteComponent } from './client/editar-cliente/editar-cliente.component';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { CrearProductoComponent } from './producto/crear-producto/crear-producto.component';
import { DetalleProductoComponent } from './producto/detalle-producto/detalle-producto.component';
import { EditarProductoComponent } from './producto/editar-producto/editar-producto.component';
import { ProductoComponent } from './producto/producto.component';
import { DetalleFacturaComponent } from './reporte/detalle-factura/detalle-factura.component';
import { ReporteComponent } from './reporte/reporte.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', component: InicioComponent },
    { path: 'clientes', component: ClientComponent },
    { path: 'reportes', component: ReporteComponent },
    { path: 'productos', component: ProductoComponent },
    { path: 'crear-cliente', component: CrearClienteComponent },
    { path: 'editar-cliente', component: EditarClienteComponent },
    { path: 'detalle-cliente', component: DetalleClienteComponent },
    { path: 'crear-producto', component: CrearProductoComponent },
    { path: 'editar-producto', component: EditarProductoComponent },
    { path: 'detalle-producto', component: DetalleProductoComponent },
    { path: 'detalle-factura', component: DetalleFacturaComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
