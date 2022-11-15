import { Component, Input, OnInit, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Clientes } from 'src/app/interfaces/clientes';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private _clientesService: ClientesService, private router: Router, private _snackBar: MatSnackBar) { 
    this.form = fb.group({
      id: ['', Validators.required],
      cc: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  editarCliente() {
    const cliente: Clientes = {
      id: this.form.value.id,
      cc: this.form.value.cc,
      nombres: this.form.value.nombres,
      apellidos: this.form.value.apellidos,
      telefono: this.form.value.telefono
    }

    this._clientesService.update(cliente.id, cliente).subscribe(data => {
      this.router.navigate(['/dashboard/clientes']);
    });

    this._snackBar.open('El cliente fue actualizado', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  volver() {
    this.router.navigate(['/dashboard/clientes']);
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

  ngOnInit(): void {
    this.cargarCliente();
  }
  
}
