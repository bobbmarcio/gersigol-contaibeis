import React, {useState, useContext} from "react";
import {Button, TextField} from "@mui/material";
import ValidacoesCadastro from "../../utils/ValidacoesCadastro";
import useErros from "../../utils/useErros"
import { getStorage, ref, uploadBytes } from "firebase/storage";

function IncomeDemonstrative({aoEnviar}) {
  const [nome, setNome] = useState("")
  const [cpf, setCpf] = useState("")
  const validacoes = useContext(ValidacoesCadastro)
  const [erros, validarCampos, possoEnviar] = useErros(validacoes)  
  const storage = getStorage();
  const incomeRef = ref(storage, 'income.jpg');
  const [fileArq, setFile] = useState() 

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      uploadBytes(incomeRef, fileArq).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    }
  }

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault()
                if (possoEnviar()){
                    aoEnviar({nome, cpf})
                }
            }}>
            <input type="file" onChange={handleFileChange} />
            <Button type="submit" variant="contained" color="primary">
                Próximo
            </Button>
        </form>
    )
}

export default IncomeDemonstrative
