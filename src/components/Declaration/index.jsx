import { Step, StepLabel, Stepper, Typography, Container } from "@mui/material";
import { useState, useEffect } from "react";
import PersonalData from "../Forms/PersonalData";
import IncomeDemonstrative from "../Forms/IncomeDemonstrative";

export default function Declaration({whenSubmit}) {
  const [activeStep, setActiveStep] = useState(0);
    const [collectedData, setCollectedData] = useState({})
    useEffect(() =>{
        if (activeStep === formularios.length) {
            whenSubmit(collectedData)
        }
    })

    const formularios = [
        <PersonalData aoEnviar={collectData}/>,
        <IncomeDemonstrative aoEnviar={collectData} />,
        <Typography variant="h5">Envie os gastos com saúde</Typography>,
        <Typography variant="h5">Declaração cadastrada com sucesso!</Typography>
    ]

    function collectData(data){
        setCollectedData({...collectedData, ...data})
        nextStep()
    }

    function nextStep(){
        setActiveStep(activeStep + 1)
    }

  return (
      <Container>
        <Stepper activeStep={activeStep}>
            <Step><StepLabel>Dados pessoais</StepLabel></Step>
            <Step><StepLabel>Demonstrativo de rendimento</StepLabel></Step>
            <Step><StepLabel>Gastos com saúde</StepLabel></Step>
        </Stepper>
        {formularios[activeStep]}
      </Container>
  );
}
