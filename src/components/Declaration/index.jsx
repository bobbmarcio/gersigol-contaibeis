import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useState } from "react";

export default function Declaration() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Stepper activeStep={activeStep}>
      <Step>
        <StepLabel>CPF</StepLabel>
        <StepLabel>Dados 1</StepLabel>
        <StepLabel>Dados 2</StepLabel>
      </Step>
    </Stepper>
  );
}
