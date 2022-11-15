import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

form: FormGroup;
loading = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) { 
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  ingresar() {
    const user = this.form.value.usuario;
    const pass = this.form.value.contraseña;
    
    if(user == 'admin' && pass == 'admin'){
      this.delay_login();
    }else{
      this.msg_error();
    }
  }

  msg_error() {
    this._snackBar.open('Usuario o Contraseña invalido', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  delay_login() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard'])
    }, 1000);
  }

}
