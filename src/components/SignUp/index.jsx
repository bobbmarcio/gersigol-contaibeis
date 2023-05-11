import React, {useState} from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {Button, Stack, TextField, Box, Alert, Snackbar} from "@mui/material";
import {switchOverFirebaseErrors} from "../../utils/FirebaseErrorCodes";

export default function SignUp(props) {
    const {auth} = props

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [alertSeverity, setAlertSeverity] = useState("")

    const handleSnackBar = () => {
        setShowSnackbar(!showSnackbar)
    }

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
                const alertMessage = switchOverFirebaseErrors(errorCode)
                setAlertMessage(alertMessage)
                setAlertSeverity("error")
                handleSnackBar()
            });
    }

    return(
        <>
            <form
                onSubmit={
                    (event) =>{
                        event.preventDefault()
                        createUser(auth, email, password)
                    }
                }
            >
                <Box sx={{ width: '50%', padding: 10 }} >
                    <Stack spacing={2}>
                        <TextField
                            id="email"
                            label="E-mail"
                            required={true}
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
                            required={true}
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
                        >
                            Cadastrar-se
                        </Button>
                    </Stack>
                </Box>
            </form>
            <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={handleSnackBar}>
                <Alert onClose={handleSnackBar} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    )
}
