import React from "react";
import {validarCpf, validarNome, validarSenha} from "./cadastro";

const ValidacoesCadastro = React.createContext(
    {cpf: validarCpf, senha: validarSenha, nome: validarNome}
)

export default ValidacoesCadastro
