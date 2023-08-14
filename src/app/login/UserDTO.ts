export class UserDTO{
  id:bigint;
  name:string;
  email:string;
  password:string;
  lastName:string;
  phone:string;
  identityNumber:string;
  verifyCode : string;

  mapper(user:any){
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.lastName=user.lastName;
    this.phone = user.phone;
  }



  validate():string{

    console.log(this)
    if(!this.name || this.name == ''){
      return "name cannot be empty";
    }
    if(!this.lastName || this.name == ''){
      return "lastName cannot be empty";
    }
    if (!this.password || this.password == ''){
      return "password cannot be empty";
    }else {
      let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&\.])[A-Za-z\d$@$!%*#?&\.ÜĞŞİÖÇğüşiöç]{8,}/;
      if (!passwordRegex.test(this.password)) {
        return "Password must contain at least 8 characters, including uppercase, lowercase, digit, and special character.";
      }
      if(this.identityNumber.length != 11){
        return "Identitiy number must be 11 numbers"
      }

    }
    return "";
  }

  getUserId(){
    return this.id;
  }

}
