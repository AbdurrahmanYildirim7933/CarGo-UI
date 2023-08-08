import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const matchpassword : ValidatorFn = (control : AbstractControl):ValidationErrors|null =>{
  let password = control.get('Password')
  let confirmPassword = control.get('ConfirmPassword')
  if(password && confirmPassword && password?.value != confirmPassword?.value){
    return {passwordmatcherror: true}
  }
  return null;
}
a:String;

