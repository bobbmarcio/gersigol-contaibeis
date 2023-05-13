import React, {useState, useEffect} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {Button, Stack, TextField, Box, Alert, Snackbar} from "@mui/material";
import {switchOverFirebaseErrors} from "../../utils/FirebaseErrorCodes";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
    const {auth} = props
    let navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [alertSeverity, setAlertSeverity] = useState("")
    const [user, setUser] = useState()

    const handleSnackBar = () => {
        setShowSnackbar(!showSnackbar)
    }

    function handleClick(path) {
        navigate(path);
    }
    
    //TODO: useEfect when user exist, enviar para a rota de declaracao
    useEffect(() => {
        if(user){
            handleClick("createDeclaration")
        }
    })

    const loginUser = (auth, email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
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
                           Login
                       </Button>
                       <Button
                           type="button"
                           variant="contained"
                           color="info"
                           onClick={() => handleClick("signup")}
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
