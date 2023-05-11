import React, {useState} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {Button, Stack, TextField, Box, Alert, Snackbar} from "@mui/material";
import {switchOverFirebaseErrors} from "../../utils/FirebaseErrorCodes";
import {Link} from "react-router-dom";

export default function Login(props) {
    const {auth} = props

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [alertSeverity, setAlertSeverity] = useState("")

    const handleSnackBar = () => {
        setShowSnackbar(!showSnackbar)
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
                       loginUser(auth, email, password)
                   }
               }
           >
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
                       >
                           Login
                       </Button>
                       <Link to="/signup">
                           <Button
                               type="button"
                               variant="outlined"
                               color="secondary"
                           >
                               Cadastrar-se
                           </Button>
                       </Link>
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
