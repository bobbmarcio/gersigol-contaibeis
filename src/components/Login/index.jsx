import React, {useState} from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {Button, Stack, TextField, Box, Alert, Snackbar} from "@mui/material";

const FirebaseErrorCodes = {
    EmailUsed: "auth/email-already-in-use",
    EmailInvalid: "auth/invalid-email",
    WeakPassword: "auth/weak-password",
    WrongPassword: "auth/wrong-password"
}

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [alertSeverity, setAlertSeverity] = useState("")

    const handleSnackBar = () => {
        setShowSnackbar(!showSnackbar)
    }

    const switchOverFirebaseErrors = (errorCode) => {
        switch (errorCode) {
            case FirebaseErrorCodes.EmailInvalid:
                setAlertMessage("Erro ao realizar o login. O e-mail digitado é inválido.")
                break
            case FirebaseErrorCodes.EmailUsed:
                setAlertMessage("Erro ao realizar o cadastro. Esse e-mail já está sendo utilizado.")
                break
            case FirebaseErrorCodes.WeakPassword:
                setAlertMessage("A senha utilizada é muito fraca.")
                break
            case FirebaseErrorCodes.WrongPassword:
                setAlertMessage("A senha está incorreta.")
                break
            default:
                setAlertMessage(errorCode)
        }
        setAlertSeverity("error")
    }

    const firebaseConfig = {
        apiKey: "AIzaSyBl44kIRD6WkCCVCuw31YWiMqZ3GKlHXqo",
        authDomain: "gersigol-contabeis.firebaseapp.com",
        projectId: "gersigol-contabeis",
        storageBucket: "gersigol-contabeis.appspot.com",
        messagingSenderId: "299062437165",
        appId: "1:299062437165:web:936b73bc3d5ce01cd71fa4"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const createUser = (auth, email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setAlertMessage("Cadastro realizado com sucesso. Bem-vindo, "+user.email)
                setAlertSeverity("success")
                handleSnackBar()
            })
            .catch((error) => {
                const errorCode = error.code
                switchOverFirebaseErrors(errorCode)
                handleSnackBar()
            });
    }

    const loginUser = (auth, email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setAlertMessage("Login realizado com sucesso. Bem-vindo, "+user.email)
                setAlertSeverity("success")
                handleSnackBar()
            })
            .catch((error) => {
                const errorCode = error.code
                switchOverFirebaseErrors(errorCode)
                handleSnackBar()
            });
    }

    return(
        <>
           {/*<form*/}
           {/*    onSubmit={*/}
           {/*        (event) =>{*/}
           {/*            event.preventDefault()*/}
           {/*            createUser(auth, email, password)*/}
           {/*        }*/}
           {/*    }*/}
           {/*>*/}
               <Box sx={{ width: '20%', padding: 10 }} >
                   <Stack spacing={2}>
                       <TextField
                           id="email"
                           label="E-mail"
                           type="email"
                           variant="outlined"
                           margin={"normal"}
                           onChange={(event) => {
                               setEmail(event.target.value)
                           }}
                       />
                       <TextField
                           id="password"
                           label={"Senha"}
                           type={"password"}
                           variant={"outlined"}
                           margin={"normal"}
                           onChange={(event) => {
                               setPassword(event.target.value)
                           }}
                       />
                       <Button
                           type="submit"
                           variant="contained"
                           color="primary"
                           onClick={() => {
                               createUser(auth, email, password)
                           }}
                       >
                           Cadastre-se
                       </Button>
                       <Button
                           type="button"
                           variant="contained"
                           color="primary"
                           onClick={() => {
                               loginUser(auth, email, password)
                           }}
                       >
                           Login
                       </Button>
                   </Stack>
               </Box>
           {/*</form>*/}
            <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={handleSnackBar}>
                <Alert onClose={handleSnackBar} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    )
}
