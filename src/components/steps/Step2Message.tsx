import React from 'react';
import { StepProps } from '../../types';

const Step2Message: React.FC<StepProps> = ({ formData, updateFormData, onNext, onBack, isFirst, isLast }) => {
  return (
    <div className="form-step">
      <h1 className="text-xl font-bold text-white mb-2">Mensagem</h1>
      <p className="text-gray-300 mb-6 text-sm">
        Escreva uma mensagem especial que será exibida na sua página personalizada.
      </p>
      
      <textarea
        placeholder="Digite sua mensagem especial aqui..."
        value={formData.message}
        onChange={(e) => updateFormData({ message: e.target.value })}
        rows={4}
        className="w-full p-3 mb-6 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors resize-none"
      />
      
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
        >
          Voltar etapa
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm"
        >
          Próxima etapa
        </button>
      </div>
    </div>
  );
};

export default Step2Message;