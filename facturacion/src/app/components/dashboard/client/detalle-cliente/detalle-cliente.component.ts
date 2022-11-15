import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css']
})
export class DetalleClienteComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private _clientesService: ClientesService, private router: Router, private _snackBar: MatSnackBar) { 
    this.form = fb.group({
      id: [''],
      cc: {value: ''},
      nombres: {value: ''},
      apellidos: {value: ''},
      telefono: {value: ''}
    });
  }

  cargarCliente() {
    let id = localStorage.getItem("id");
    this._clientesService.getCliente(+id!).subscribe(data => {
      this.form.setValue({
        id: data.id,
        cc: data.cc,
        nombres: data.nombres,
        apellidos: data.apellidos,
        telefono: data.telefono
      })
    })
  }

  volver() {
    this.router.navigate(['/dashboard/clientes']);
  }

  ngOnInit(): void {
    this.cargarCliente();
  }
}
