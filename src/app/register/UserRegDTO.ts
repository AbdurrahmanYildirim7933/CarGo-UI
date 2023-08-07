export class UserDTO{
  name:string;
  lastName:string;
  email:string;
  password:string;
  cpassword:string;
  phone:string;
  identityNumber:string;


  constructor(name:string,lastName:string,email:string,password:string,cpassword:string,phone:string,identityNumber:string) {
    this.lastName =lastName;
    this.name=name;
    this.email=email;
    this.password=password;
    this.cpassword=cpassword;
    this.phone=phone;
    this.identityNumber=identityNumber;
  }
}

export class UserRegDTO {
}
