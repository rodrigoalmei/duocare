export type MediaSource = number | { uri: string };

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'mother' | 'professional' | 'admin';
};

export type Session = {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
  user: User;
};

export type MotherProfile = {
  id: string;
  userId?: string;
  name: string;
  email: string;
  phone?: string;
  postpartumDays: number;
  postpartumPhase: string;
  avatar: MediaSource;
};

export type Mother = MotherProfile;

export type BabyProfile = {
  id: string;
  motherId?: string;
  name: string;
  birthDate?: string;
  ageLabel: string;
  weightLabel: string;
  lengthLabel: string;
  avatar: MediaSource;
};

export type Baby = BabyProfile;

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
  image: MediaSource;
  summary?: string;
  body?: string[];
};

export type DevelopmentMilestone = {
  id: string;
  index: string;
  title: string;
  description: string;
};

export type DevelopmentItem = {
  baby: BabyProfile;
  milestones: DevelopmentMilestone[];
  featuredContent: ContentItem | null;
};

export type GrowthRecord = {
  id: string;
  label: string;
  value: number;
};

export type GrowthSnapshot = {
  baby: BabyProfile;
  records: GrowthRecord[];
};

export type PostpartumSummary = {
  days: number;
  phase: string;
  avatar: MediaSource;
};

export type BreastfeedingContent = ContentItem;

export type ExerciseItem = {
  id: string;
  title: string;
  status: 'todo' | 'completed';
  statusLabel: string;
  description: string;
};

export type WellbeingEntry = {
  id: string;
  rating: number;
  period: string;
  comment?: string;
  createdAt: string;
};

export type WellbeingOptions = {
  ratings: number[];
  periods: string[];
};

export type AlertItem = {
  id: string;
  title: string;
  description: string;
  source: string;
  createdAt: string;
  read: boolean;
};

export type ConnectedDevice = {
  id: string;
  name: string;
  status: 'connected' | 'syncing' | 'disconnected';
  lastSync: string;
  dataSources?: string[];
};

export type WearableDevice = ConnectedDevice;

export type DeviceOption = {
  id: string;
  name: string;
  status: string;
  canConnect: boolean;
};

export type SleepDetail = {
  value: string;
  description: string;
  chartValues: number[];
};

export type StepsDetail = {
  value: string;
  description: string;
  chartValues: number[];
};

export type HealthOverview = {
  metrics: HealthMetric[];
  weeklyActivity: number[];
};

export type HealthHistoryEntry = {
  id: string;
  label: string;
  value: string;
  date: string;
  source: string;
};

export type HealthHistoryItem = HealthHistoryEntry;

export type UserPreference = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
};

export type UserPreferences = UserPreference[];
export type ProfilePreference = UserPreference;

export type FeedbackPayload = {
  rating: number;
  category: string;
  comment?: string;
};

export type FeedbackOptions = {
  ratings: number[];
  categories: string[];
};

export type SupportTopic = {
  id: string;
  title: string;
  answer: string;
};
