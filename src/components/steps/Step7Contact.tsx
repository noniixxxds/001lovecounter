import React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import { StepProps } from '../../types';
import { saveMiniSite } from '../../services/miniSiteService';

const Step7Contact: React.FC<StepProps> = ({ formData, updateFormData, onNext, onBack, isFirst, isLast }) => {
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveError, setSaveError] = React.useState<string | null>(null);

  const handleContactChange = (field: 'name' | 'email' | 'phone', value: string) => {
    updateFormData({
      contact: {
        ...formData.contact,
        [field]: value
      }
    });
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const canProceed = formData.contact.name.trim() && 
                    formData.contact.email.trim() && 
                    isValidEmail(formData.contact.email);

  const handleNext = async () => {
    if (!canProceed) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      const result = await saveMiniSite(formData);
      
      if (result.success) {
        // Store the site URL for later use
        updateFormData({ siteUrl: result.siteUrl });
        onNext();
      } else {
        setSaveError(result.error || 'Erro ao salvar o plano');
      }
    } catch (error) {
      setSaveError('Erro interno. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="form-step">
      <h1 className="text-xl font-bold text-white mb-2">Informações de contato</h1>
      <p className="text-gray-300 mb-6 text-sm">
        Precisamos dos seus dados para salvar e compartilhar seu plano alimentar.
      </p>
      
      <div className="space-y-4 mb-6">
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Seu nome completo"
            value={formData.contact.name}
            onChange={(e) => handleContactChange('name', e.target.value)}
            className="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="email"
            placeholder="seu@email.com"
            value={formData.contact.email}
            onChange={(e) => handleContactChange('email', e.target.value)}
            className="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
          />
          {formData.contact.email && !isValidEmail(formData.contact.email) && (
            <p className="text-red-400 text-xs mt-1">Por favor, insira um email válido</p>
          )}
        </div>
        
        <div className="relative">
          <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="tel"
            placeholder="(11) 99999-9999 (opcional)"
            value={formData.contact.phone}
            onChange={(e) => handleContactChange('phone', e.target.value)}
            className="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      {saveError && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-700 rounded-lg">
          <p className="text-red-300 text-xs">{saveError}</p>
        </div>
      )}
      
      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={isSaving}
          className="flex-1 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 transition-colors text-sm"
        >
          Voltar etapa
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed || isSaving}
          className="flex-1 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm"
        >
          {isSaving ? 'Salvando...' : 'Próxima etapa'}
        </button>
      </div>
    </div>
  );
};

export default Step7Contact;
