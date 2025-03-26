import {FormGroup, ValidationErrors} from '@angular/forms';

async function sleep(){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    },2500)
  })
}

export class FormUtils{

  static getTextErrors(errors: ValidationErrors){
    for (const key of Object.keys(errors)){
      switch (key){
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres`
        case 'min':
          return `Valor mínimo de ${errors['min'].min}`
        case 'email':
          return 'El valor ingresado no es un correo electrónico'
        case 'emailTaken':
          return 'Ese correo ya está en uso'
        case 'notStrider':
          return 'No puedes usar el nombre strider'
        default:
          return `Error de validación no controlado ${key}`
      }
    }
    return null
  }

  static isValidField(fieldName: string, myForm:FormGroup) : boolean | null{
    return !!myForm.controls[fieldName].errors && myForm.controls[fieldName].touched
  }

  static getFieldError(fieldName: string, myForm:FormGroup): string | null {
    if(!myForm.controls[fieldName]) return null

    const errors = myForm.controls[fieldName].errors ?? {}

    return this.getTextErrors(errors)
  }
}
