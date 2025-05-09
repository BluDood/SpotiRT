import React, { useEffect, useState } from 'react'
import styles from './App.module.css'

import Welcome from './steps/Welcome/Welcome.tsx'
import CreateApp from './steps/CreateApp/CreateApp.tsx'
import Authorize from './steps/Authorize/Authorize.tsx'
import RetrieveToken from './steps/RetrieveToken/RetrieveToken.tsx'
import Done from './steps/Done/Done.tsx'

enum Steps {
  Welcome,
  CreateApp,
  Authorize,
  RetrieveToken,
  Done
}

const App: React.FC = () => {
  const [step, setStep] = useState<Steps>(0)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has('code') || params.has('error')) {
      setStep(Steps.RetrieveToken)
    }
  }, [])

  return (
    <div className={styles.app}>
      {step === Steps.Welcome ? (
        <Welcome onStepComplete={() => setStep(Steps.CreateApp)} />
      ) : step === Steps.CreateApp ? (
        <CreateApp onStepComplete={() => setStep(Steps.Authorize)} />
      ) : step === Steps.Authorize ? (
        <Authorize />
      ) : step === Steps.RetrieveToken ? (
        <RetrieveToken
          onStepComplete={success =>
            setStep(success ? Steps.Done : Steps.CreateApp)
          }
        />
      ) : step === Steps.Done ? (
        <Done onStepComplete={() => setStep(Steps.Welcome)} />
      ) : null}
    </div>
  )
}

export default App
