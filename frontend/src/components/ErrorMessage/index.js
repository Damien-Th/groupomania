export const ErrorEmail = (input) => {

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let messageError;
    let EmailIsValid;

    if (input === "") return [messageError = "Ce champ est nécessaire", EmailIsValid = false];
    if (!input.match(emailRegex)) return [messageError = "Veuillez entrer une adresse valide", EmailIsValid = false];
            
    return [messageError = "", EmailIsValid = true];
    
}


export const ErrorPwd = (input) => {

    const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let messageError;
    let PwdIsValid;

    if (input === "") return [messageError = "Ce champ est nécessaire", PwdIsValid = false];
    if(specialChars.test(input)) return [messageError = "Les caractères spéciaux ne sont pas autorisés", PwdIsValid = false];
    if (!input.match(pwdRegex)) return [messageError = "Le mot de passe doit contenir au moins 8 caractères dont une majuscule et un caractère numérique", PwdIsValid = false];
            
    return [messageError = "", PwdIsValid = true];
    
}

export const ErrorName = (input) => {

    const nameRegex = /[A-Zéçè]+-?/gi
    let messageError;
    let NameIsValid;

    if (input === "") return [messageError = "Ce champ est nécessaire", NameIsValid = false];
    if (!input.match(nameRegex)) return [messageError = "il y a une erreur", NameIsValid = false];
            
    return [messageError = "", NameIsValid = true];
    
}









