import React, {useState, useContext} from "react";
import {Button, TextField} from "@mui/material";
import ValidacoesCadastro from "../../utils/ValidacoesCadastro";
import useErros from "../../utils/useErros"

function PersonalData({aoEnviar}) {
    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const validacoes = useContext(ValidacoesCadastro)
    const [erros, validarCampos, possoEnviar] = useErros(validacoes)

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault()
                if (possoEnviar()){
                    aoEnviar({nome, cpf})
                }
            }}>
            <TextField
                value={nome}
                onChange={event => {
                    setNome(event.target.value)
                }}
                onBlur={validarCampos}
                error={!erros.nome.valido}
                helperText={erros.nome.texto}
                id="nome"
                name="nome"
                label="Nome completo"
                variant="outlined"
                margin="normal"
                fullWidth
                required={true}
            />
            <TextField
                value={cpf}
                onChange={event => {
                    setCpf(event.target.value)
                }}
                onBlur={validarCampos}
                error={!erros.cpf.valido}
                helperText={erros.cpf.texto}
                id="CPF"
                name="cpf"
                label="CPF"
                type="number"
                margin="normal"
                fullWidth
                required={true}
            />
            <Button type="submit" variant="contained" color="primary">
                Próximo
            </Button>
        </form>
    )
}

export default PersonalData
