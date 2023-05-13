import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import PersonalData from "../Forms/PersonalData";

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
      <>
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel>Dados pessoais</StepLabel>
            <StepLabel>Dados 1</StepLabel>
            <StepLabel>Dados 2</StepLabel>
          </Step>
        </Stepper>
        {formularios[activeStep]}
      </>
  );
}
