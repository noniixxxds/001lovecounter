export interface FormData {
  pageTitle: string;
  message: string;
  startDate: string;
  photos: string[];
  youtubeUrl: string;
  animation: 'hearts' | 'meteors' | 'aurora' | '';
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  plan: '1year' | '2year' | '';
  siteUrl?: string;
}

export interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
  isLast: boolean;
}