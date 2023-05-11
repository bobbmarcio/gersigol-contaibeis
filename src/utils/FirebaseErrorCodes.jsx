export const FirebaseErrorCodes = {
    EmailUsed: "auth/email-already-in-use",
    EmailInvalid: "auth/invalid-email",
    WeakPassword: "auth/weak-password",
    WrongPassword: "auth/wrong-password",
    UserDontExist: "auth/user-not-found"
}

export const switchOverFirebaseErrors = (errorCode) =>  {
    let alertMessage
    switch (errorCode) {
        case FirebaseErrorCodes.EmailInvalid:
            alertMessage = "Erro ao realizar o login. O e-mail digitado é inválido."
            break
        case FirebaseErrorCodes.EmailUsed:
            alertMessage = "Erro ao realizar o cadastro. Esse e-mail já está sendo utilizado."
            break
        case FirebaseErrorCodes.WeakPassword:
            alertMessage = "A senha utilizada é muito fraca."
            break
        case FirebaseErrorCodes.WrongPassword:
            alertMessage = "A senha está incorreta."
            break
        case FirebaseErrorCodes.UserDontExist:
            alertMessage = "Não existe cadastro para o e-mail informado."
            break
        default:
            alertMessage = errorCode
    }
    return alertMessage
}
