import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  const steps = [
    'Título',
    'Mensagem',
    'Data',
    'Fotos',
    'Música',
    'Animação',
    'Contato',
    'Pagamento'
  ];

  return (
    <div className="mb-6">
      {/* Progress bar */}
      <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
        <div 
          className="bg-pink-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </div>
      
      {/* Step info */}
      <div className="text-center">
        <span className="text-gray-400 text-sm">
          {currentStep + 1}/{totalSteps} - {steps[currentStep]}
        </span>
      </div>
    </div>
  );
};

export default StepIndicator;