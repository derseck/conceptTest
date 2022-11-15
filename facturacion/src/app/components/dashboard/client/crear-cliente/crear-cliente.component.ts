import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Clientes } from 'src/app/interfaces/clientes';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private _clientesService: ClientesService, private router: Router, private _snackBar: MatSnackBar) { 
    this.form = fb.group({
      cc: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  crearCliente() {
    const cliente: Clientes = {
      id: 0,
      cc: this.form.value.cc,
      nombres: this.form.value.nombres,
      apellidos: this.form.value.apellidos,
      telefono: this.form.value.telefono
    }

    this._clientesService.insert(cliente).subscribe(data => {
      this.router.navigate(['/dashboard/clientes']);
    });
    
    this._snackBar.open('El cliente fue creado', '', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  volver() {
    this.router.navigate(['/dashboard/clientes']);
  }

  ngOnInit(): void {
  }
}
