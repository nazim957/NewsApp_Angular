export class ForgotPassword {

    constructor(
        public securityQuestion: string,
        public securityQuestionAnswer: string,
        public newPassword: string
      ) {}

}
