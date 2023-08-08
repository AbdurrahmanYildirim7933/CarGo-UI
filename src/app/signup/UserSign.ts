export class UserSign {
  name:string;
  lastName:string;
  email:string;
  password:string;
  cpassword:string;
  phone:string;
  identityNumber:string;


  constructor(name:string,lastName:string,email:string,password:string,phone:string,identityNumber:string) {
    this.name=name;
    this.lastName =lastName;
    this.email=email;
    this.password=password;
    this.phone=phone;
    this.identityNumber=identityNumber;
  }
}

