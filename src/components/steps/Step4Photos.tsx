import React from 'react';
import { Upload, X } from 'lucide-react';
import { StepProps } from '../../types';

const Step4Photos: React.FC<StepProps> = ({ formData, updateFormData, onNext, onBack, isFirst, isLast }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const currentPhotos = [...formData.photos];
    
    Array.from(files).forEach((file) => {
      if (currentPhotos.length < 8) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          updateFormData({ photos: [...currentPhotos, result] });
          currentPhotos.push(result);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    updateFormData({ photos: newPhotos });
  };

  return (
    <div className="form-step">
      <h1 className="text-xl font-bold text-white mb-2">Fotos</h1>
      <p className="text-gray-300 mb-6 text-sm">
        Anexe fotos e escolha o modo de mostrar para personalizar a página. Você pode adicionar até 8 fotos.
      </p>
      
      <div className="mb-6">
        {formData.photos.length < 8 && (
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-6 h-6 mb-2 text-gray-400" />
              <p className="text-xs text-gray-400 text-center">
                <span className="font-semibold">Clique para adicionar fotos</span>
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, JPEG, GIF (máx. 8 fotos)</p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        )}
        
        {formData.photos.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            {formData.photos.map((photo, index) => (
              <div key={index} className="relative group">
                <img
                  src={photo}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg"
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
        
        <p className="text-gray-400 text-xs mt-3">
          {formData.photos.length}/8 fotos adicionadas
        </p>
      </div>

      {/* Display Mode Options */}
      <div className="mb-6">
        <h3 className="text-white text-sm font-medium mb-3">Modo de mostrar</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-3 bg-pink-600 text-white rounded-lg text-sm font-medium">
            Coverflow
          </button>
          <button className="p-3 bg-gray-700 text-white rounded-lg text-sm">
            Cube
          </button>
          <button className="p-3 bg-gray-700 text-white rounded-lg text-sm">
            Cards
          </button>
          <button className="p-3 bg-gray-700 text-white rounded-lg text-sm">
            Flip
          </button>
        </div>
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

export default Step4Photos;