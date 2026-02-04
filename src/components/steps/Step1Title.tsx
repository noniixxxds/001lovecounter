import React from 'react';
import { StepProps } from '../../types';

const Step1Title: React.FC<StepProps> = ({ formData, updateFormData, onNext, onBack, isFirst, isLast }) => {
  return (
    <div className="form-step">
      <h1 className="text-xl font-bold text-white mb-2">Nome do plano</h1>
      <p className="text-gray-300 mb-6 text-sm">
        Dê um nome para sua dieta. Ex: Reeducação alimentar, 21 dias low carb, Equilíbrio diário.
      </p>
      
      <input
        type="text"
        placeholder="Ex: Reeducação alimentar ou 21 dias low carb"
        value={formData.pageTitle}
        onChange={(e) => updateFormData({ pageTitle: e.target.value })}
        className="w-full p-3 mb-6 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
      />
      
      <div className="flex gap-3">
        {!isFirst && (
          <button
            onClick={onBack}
            className="flex-1 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
          >
            Voltar etapa
          </button>
        )}
        <button
          onClick={onNext}
          disabled={!formData.pageTitle.trim()}
          className="flex-1 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm"
        >
          Próxima etapa
        </button>
      </div>
    </div>
  );
};

export default Step1Title;
