import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FormData } from './types';
import Preview from './components/Preview';
import StepIndicator from './components/StepIndicator';
import Step1Title from './components/steps/Step1Title';
import Step2Message from './components/steps/Step2Message';
import Step3Date from './components/steps/Step3Date';
import Step4Photos from './components/steps/Step4Photos';
import Step5Music from './components/steps/Step5Music';
import Step6Animation from './components/steps/Step6Animation';
import Step7Contact from './components/steps/Step7Contact';
import Step8Payment from './components/steps/Step8Payment';
import ControleGeral from './pages/ControleGeral';
import MiniSite from './pages/MiniSite';

function CreateSite() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    pageTitle: '',
    message: '',
    startDate: '',
    photos: [],
    youtubeUrl: '',
    animation: '',
    contact: {
      name: '',
      email: '',
      phone: ''
    },
    plan: ''
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    Step1Title,
    Step2Message,
    Step3Date,
    Step4Photos,
    Step5Music,
    Step6Animation,
    Step7Contact,
    Step8Payment
  ];

  const CurrentStepComponent = steps[currentStep];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Form Section - Top */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-2">Planner de Dieta</h1>
            <p className="text-gray-300 text-sm">Monte seu plano alimentar com foco, constância e energia</p>
          </div>
          
          <StepIndicator currentStep={currentStep} totalSteps={steps.length} />
          
          <CurrentStepComponent
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
            isFirst={currentStep === 0}
            isLast={currentStep === steps.length - 1}
          />
        </div>
      </div>
      
      {/* Preview Section - Bottom */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="p-4">
          <h3 className="text-white text-center text-sm font-medium mb-3">Visualização em tempo real</h3>
          <Preview formData={formData} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateSite />} />
        <Route path="/controlegeral" element={<ControleGeral />} />
        <Route path="/site/:siteUrl" element={<MiniSite />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
