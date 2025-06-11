import React from 'react';
import { Heart, Star, Sparkles } from 'lucide-react';
import { StepProps } from '../../types';

const Step6Animation: React.FC<StepProps> = ({ formData, updateFormData, onNext, onBack, isFirst, isLast }) => {
  const animations = [
    {
      id: 'hearts' as const,
      name: 'Chuva de Corações',
      description: 'Corações flutuantes e românticos',
      icon: Heart,
      color: 'text-pink-500'
    },
    {
      id: 'meteors' as const,
      name: 'Meteoros',
      description: 'Estrelas cadentes brilhantes',
      icon: Star,
      color: 'text-yellow-500'
    },
    {
      id: 'aurora' as const,
      name: 'Aurora Boreal',
      description: 'Luzes mágicas e coloridas',
      icon: Sparkles,
      color: 'text-blue-500'
    }
  ];

  return (
    <div className="form-step">
      <h1 className="text-xl font-bold text-white mb-2">Animação especial</h1>
      <p className="text-gray-300 mb-6 text-sm">
        Escolha uma animação que tornará sua página ainda mais especial.
      </p>
      
      <div className="space-y-3 mb-6">
        {animations.map((animation) => {
          const Icon = animation.icon;
          const isSelected = formData.animation === animation.id;
          
          return (
            <button
              key={animation.id}
              onClick={() => updateFormData({ animation: animation.id })}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                isSelected
                  ? 'border-pink-500 bg-pink-900/20'
                  : 'border-gray-600 bg-gray-800 hover:border-gray-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`${animation.color} ${isSelected ? 'animate-pulse' : ''}`} size={24} />
                <div>
                  <h3 className="text-white text-sm font-semibold">{animation.name}</h3>
                  <p className="text-gray-400 text-xs">{animation.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
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

export default Step6Animation;