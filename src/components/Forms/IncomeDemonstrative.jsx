import React, {useState, useContext} from "react";
import {Button, TextField} from "@mui/material";
import ValidacoesCadastro from "../../utils/ValidacoesCadastro";
import useErros from "../../utils/useErros"

function IncomeDemonstrative({aoEnviar}) {
    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const validacoes = useContext(ValidacoesCadastro)
    const [erros, validarCampos, possoEnviar] = useErros(validacoes)
    const [file, setFile] = useState()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
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
