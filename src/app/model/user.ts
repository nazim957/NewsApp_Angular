export class User {

    constructor(
      public email: string,
      public userName: string,
      public  password: string,
      public  phoneNumber: string,
      public  securityQuestion: string,
      public  securityAnswer: string,
      public  role: string
      ) 
      {}
}
