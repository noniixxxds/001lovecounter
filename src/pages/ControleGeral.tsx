import React, { useState, useEffect } from 'react';
import { Search, Eye, Calendar, Mail, Phone, ExternalLink, ArrowLeft } from 'lucide-react';
import { searchMiniSites, getAllMiniSites, MiniSite } from '../services/miniSiteService';

const ControleGeral: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sites, setSites] = useState<MiniSite[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSite, setSelectedSite] = useState<MiniSite | null>(null);

  useEffect(() => {
    loadAllSites();
  }, []);

  const loadAllSites = async () => {
    setLoading(true);
    const result = await getAllMiniSites();
    if (result.success && result.data) {
      setSites(result.data);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadAllSites();
      return;
    }

    setLoading(true);
    const result = await searchMiniSites(searchTerm);
    if (result.success && result.data) {
      setSites(result.data);
    }
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-400 bg-green-900/20';
      case 'pending':
        return 'text-yellow-400 bg-yellow-900/20';
      case 'failed':
        return 'text-red-400 bg-red-900/20';
      default:
        return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pago';
      case 'pending':
        return 'Pendente';
      case 'failed':
        return 'Falhou';
      default:
        return 'Desconhecido';
    }
  };

  if (selectedSite) {
    return (
      <div className="min-h-screen bg-gray-900 p-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedSite(null)}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Voltar para lista
          </button>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-white">{selectedSite.page_title}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(selectedSite.payment_status)}`}>
                {getPaymentStatusText(selectedSite.payment_status)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-semibold mb-2">Informações de Contato</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Mail size={16} />
                      <span>{selectedSite.contact_email}</span>
                    </div>
                    {selectedSite.contact_phone && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <Phone size={16} />
                        <span>{selectedSite.contact_phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">Detalhes do Site</h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p><strong>URL:</strong> {selectedSite.site_url}</p>
                    <p><strong>Criado em:</strong> {formatDate(selectedSite.created_at)}</p>
                    {selectedSite.start_date && (
                      <p><strong>Data de início:</strong> {formatDate(selectedSite.start_date)}</p>
                    )}
                    {selectedSite.animation && (
                      <p><strong>Animação:</strong> {selectedSite.animation}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {selectedSite.message && (
                  <div>
                    <h3 className="text-white font-semibold mb-2">Mensagem</h3>
                    <p className="text-gray-300 text-sm bg-gray-700 p-3 rounded-lg">
                      {selectedSite.message}
                    </p>
                  </div>
                )}

                {selectedSite.photos.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-2">Fotos ({selectedSite.photos.length})</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedSite.photos.slice(0, 6).map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-16 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {selectedSite.youtube_url && (
                  <div>
                    <h3 className="text-white font-semibold mb-2">Música</h3>
                    <a
                      href={selectedSite.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                    >
                      Ver no YouTube <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <a
                href={`https://heartzu.com/${selectedSite.site_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
              >
                <ExternalLink size={16} />
                Visualizar Site
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Controle Geral</h1>
          <p className="text-gray-400">Gerencie todos os mini sites criados</p>
        </div>

        {/* Search */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Pesquisar por email ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              Pesquisar
            </button>
            <button
              onClick={loadAllSites}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Todos
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">
              Mini Sites ({sites.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="text-gray-400">Carregando...</div>
            </div>
          ) : sites.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400">Nenhum mini site encontrado</div>
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {sites.map((site) => (
                <div key={site.id} className="p-4 hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-semibold">{site.page_title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(site.payment_status)}`}>
                          {getPaymentStatusText(site.payment_status)}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Mail size={14} />
                          <span>{site.contact_email}</span>
                        </div>
                        {site.contact_phone && (
                          <div className="flex items-center gap-1">
                            <Phone size={14} />
                            <span>{site.contact_phone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{formatDate(site.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedSite(site)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                        title="Ver detalhes"
                      >
                        <Eye size={18} />
                      </button>
                      <a
                        href={`https://heartzu.com/${site.site_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                        title="Abrir site"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControleGeral;