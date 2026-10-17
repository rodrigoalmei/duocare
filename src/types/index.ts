export type Mother = {
  id: string;
  name: string;
  email: string;
  postpartumDays: number;
  postpartumPhase: string;
  avatar: number;
};

export type Baby = {
  id: string;
  name: string;
  ageLabel: string;
  weightLabel: string;
  lengthLabel: string;
  avatar: number;
};

export type HealthMetric = {
  id: string;
  label: string;
  value: string;
  period: string;
  tone: 'mother' | 'baby' | 'info' | 'neutral';
  icon: string;
};

export type ContentItem = {
  id: string;
  category: string;
  title: string;
  duration: string;
  image: number;
};

export type AlertItem = {
  id: string;
  title: string;
  description: string;
  source: string;
  createdAt: string;
  read: boolean;
};

export type WearableDevice = {
  id: string;
  name: string;
  status: 'connected' | 'syncing' | 'disconnected';
  lastSync: string;
};
