import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
import { ValidatorService } from 'src/app/shared/validators/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.vs.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.vs.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmarPassword: ['', [Validators.required]]
  }, {
    validators: [this.vs.camposIguales('password', 'confirmarPassword')]
  })

  constructor(
    private fb: FormBuilder,
    private vs: ValidatorService,
    private emailValidator: EmailValidatorService
  ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Daniel Miranda',
      email: 'dmt.791@gmail.com',
      username: 'octodani'
    })
  }

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.['required']) {
      return 'El email es obligatorio';
    } else if(errors?.['pattern']) {
      return 'El email no es válido';
    } else if(errors?.['emailTomado']) {
      return 'El email ya fue tomado';
    }
    return '';
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }

  

  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
