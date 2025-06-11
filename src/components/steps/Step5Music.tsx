import React from 'react';
import { Music } from 'lucide-react';
import { StepProps } from '../../types';

const Step5Music: React.FC<StepProps> = ({ formData, updateFormData, onNext, onBack, isFirst, isLast }) => {
  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const isValidYouTubeUrl = (url: string) => {
    return extractVideoId(url) !== null;
  };

  return (
    <div className="form-step">
      <h1 className="text-xl font-bold text-white mb-2">Música especial</h1>
      <p className="text-gray-300 mb-6 text-sm">
        Cole o link de uma música do YouTube que represente esta história especial.
      </p>
      
      <div className="relative mb-6">
        <Music className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          value={formData.youtubeUrl}
          onChange={(e) => updateFormData({ youtubeUrl: e.target.value })}
          className="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors"
        />
      </div>

      {formData.youtubeUrl && isValidYouTubeUrl(formData.youtubeUrl) && (
        <div className="mb-6 p-3 bg-green-900/20 border border-green-700 rounded-lg">
          <p className="text-green-300 text-xs">✓ Link do YouTube válido detectado!</p>
        </div>
      )}

      {formData.youtubeUrl && !isValidYouTubeUrl(formData.youtubeUrl) && (
        <div className="mb-6 p-3 bg-red-900/20 border border-red-700 rounded-lg">
          <p className="text-red-300 text-xs">⚠ Por favor, insira um link válido do YouTube</p>
        </div>
      )}
      
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

export default Step5Music;