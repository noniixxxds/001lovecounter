import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Leaf, Flame, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { getMiniSiteByUrl, MiniSite as MiniSiteType } from '../services/miniSiteService';

const MiniSite: React.FC = () => {
  const { siteUrl } = useParams<{ siteUrl: string }>();
  const [site, setSite] = useState<MiniSiteType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    if (siteUrl) {
      loadSite(siteUrl);
    }
  }, [siteUrl]);

  // Auto-advance photos every 3 seconds
  useEffect(() => {
    if (site && site.photos.length > 1) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex((prev) => (prev + 1) % site.photos.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [site?.photos.length]);

  const loadSite = async (url: string) => {
    setLoading(true);
    const result = await getMiniSiteByUrl(url);
    
    if (result.success && result.data) {
      setSite(result.data);
    } else {
      setError('Plano não encontrado');
    }
    setLoading(false);
  };

  const nextPhoto = () => {
    if (site) {
      setCurrentPhotoIndex((prev) => (prev + 1) % site.photos.length);
    }
  };

  const prevPhoto = () => {
    if (site) {
      setCurrentPhotoIndex((prev) => (prev - 1 + site.photos.length) % site.photos.length);
    }
  };

  const goToPhoto = (index: number) => {
    setCurrentPhotoIndex(index);
  };

  const getAnimationComponent = () => {
    if (!site?.animation) return null;

    switch (site.animation) {
      case 'hearts':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <Leaf
                key={i}
                className="absolute text-emerald-400 animate-bounce"
                style={{
                  left: `${Math.random() * 90}%`,
                  top: `${Math.random() * 90}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
                size={12}
              />
            ))}
          </div>
        );
      case 'meteors':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <Flame
                key={i}
                className="absolute text-orange-400 animate-ping"
                style={{
                  left: `${Math.random() * 90}%`,
                  top: `${Math.random() * 90}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
                size={10}
              />
            ))}
          </div>
        );
      case 'aurora':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-green-500/20 animate-pulse" />
            {[...Array(4)].map((_, i) => (
              <Sparkles
                key={i}
                className="absolute text-blue-300 animate-pulse"
                style={{
                  left: `${Math.random() * 90}%`,
                  top: `${Math.random() * 90}%`,
                  animationDelay: `${i * 0.4}s`,
                }}
                size={10}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const calculateTimeDifference = (startDate: string) => {
    if (!startDate) return null;
    
    const start = new Date(startDate);
    const now = new Date();
    const diff = now.getTime() - start.getTime();
    
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { years, months, days, hours, minutes, seconds };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  if (error || !site) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Plano não encontrado</h1>
          <p className="text-gray-400">O plano que você está procurando não existe.</p>
        </div>
      </div>
    );
  }

  const timeDiff = calculateTimeDifference(site.start_date || '');

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto bg-gray-900 rounded-xl overflow-hidden relative shadow-2xl">
        {getAnimationComponent()}
        
        <div className="relative z-10 h-full flex flex-col">
          {/* Photo Carousel */}
          {site.photos.length > 0 && (
            <div className="relative h-96 bg-gray-700 overflow-hidden">
              <img
                src={site.photos[currentPhotoIndex]}
                alt={`Foto ${currentPhotoIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation arrows */}
              {site.photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              
              {/* Dots indicator */}
              {site.photos.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {site.photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToPhoto(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
              
              {/* Overlay */}
              <div className="absolute bottom-6 left-6">
                <Leaf className="text-emerald-400" size={24} />
              </div>
              <div className="absolute top-6 right-6">
                <Leaf className="text-emerald-300" size={20} />
              </div>
            </div>
          )}
          
          {/* Content */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-emerald-300 mb-2 font-serif italic">
                {site.page_title}
              </h1>
              <p className="text-gray-300 text-sm">
                {site.page_title.toLowerCase()}
              </p>
            </div>

            {site.message && (
              <div className="text-center">
                <p className="text-white text-sm leading-relaxed">
                  {site.message}
                </p>
              </div>
            )}

            {timeDiff && (
              <div className="text-center">
                <p className="text-white text-sm mb-4">Seguindo o plano há</p>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="text-white text-lg font-bold">{timeDiff.years.toString().padStart(2, '0')}</div>
                    <div className="text-gray-400 text-xs">anos</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="text-white text-lg font-bold">{timeDiff.months.toString().padStart(2, '0')}</div>
                    <div className="text-gray-400 text-xs">meses</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="text-white text-lg font-bold">{timeDiff.days.toString().padStart(2, '0')}</div>
                    <div className="text-gray-400 text-xs">dias</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center mt-2">
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="text-white text-lg font-bold">{timeDiff.hours.toString().padStart(2, '0')}</div>
                    <div className="text-gray-400 text-xs">horas</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="text-white text-lg font-bold">{timeDiff.minutes.toString().padStart(2, '0')}</div>
                    <div className="text-gray-400 text-xs">minutos</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="text-white text-lg font-bold">{timeDiff.seconds.toString().padStart(2, '0')}</div>
                    <div className="text-gray-400 text-xs">segundos</div>
                  </div>
                </div>
              </div>
            )}

            {site.youtube_url && (
              <div className="bg-emerald-600/20 rounded-lg p-3 text-center">
                <p className="text-emerald-300 text-sm">🎧 Playlist: YouTube</p>
              </div>
            )}

            {site.animation && (
              <div className="text-center">
                <p className="text-cyan-200 text-sm">
                  ✨ Estilo: {
                    site.animation === 'hearts' ? 'Folhas leves' :
                    site.animation === 'meteors' ? 'Energia' :
                    'Aurora Boreal'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniSite;
