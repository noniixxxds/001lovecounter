import React from 'react';
import { Leaf, Flame, Sparkles } from 'lucide-react';
import { StepProps } from '../../types';

const Step6Animation: React.FC<StepProps> = ({ formData, updateFormData, onNext, onBack, isFirst, isLast }) => {
  const animations = [
    {
      id: 'hearts' as const,
      name: 'Folhas leves',
      description: 'Folhas flutuantes para um clima natural',
      icon: Leaf,
      color: 'text-emerald-400'
    },
    {
      id: 'meteors' as const,
      name: 'Energia',
      description: 'Faíscas dinâmicas para motivação',
      icon: Flame,
      color: 'text-orange-400'
    },
    {
      id: 'aurora' as const,
      name: 'Aurora Boreal',
      description: 'Luzes suaves para relaxar',
      icon: Sparkles,
      color: 'text-cyan-400'
    }
  ];

  return (
    <div className="form-step">
      <h1 className="text-xl font-bold text-white mb-2">Estilo visual</h1>
      <p className="text-gray-300 mb-6 text-sm">
        Selecione um efeito visual para deixar seu plano ainda mais inspirador.
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
                  ? 'border-emerald-500 bg-emerald-900/20'
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
          className="flex-1 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm"
        >
          Próxima etapa
        </button>
      </div>
    </div>
  );
};

export default Step6Animation;
