import { env } from '@/constants/env';

import { HttpAlertsRepository } from './implementations/HttpAlertsRepository';
import { HttpAuthRepository } from './implementations/HttpAuthRepository';
import { HttpBabyRepository } from './implementations/HttpBabyRepository';
import { HttpContentRepository } from './implementations/HttpContentRepository';
import { HttpDevelopmentRepository } from './implementations/HttpDevelopmentRepository';
import { HttpDevicesRepository } from './implementations/HttpDevicesRepository';
import { HttpExerciseRepository } from './implementations/HttpExerciseRepository';
import { HttpFeedbackRepository } from './implementations/HttpFeedbackRepository';
import { HttpGrowthRepository } from './implementations/HttpGrowthRepository';
import { HttpHealthDetailsRepository } from './implementations/HttpHealthDetailsRepository';
import { HttpMotherRepository } from './implementations/HttpMotherRepository';
import { HttpPostpartumRepository } from './implementations/HttpPostpartumRepository';
import { HttpPreferencesRepository } from './implementations/HttpPreferencesRepository';
import { HttpSupportRepository } from './implementations/HttpSupportRepository';
import { HttpWellbeingRepository } from './implementations/HttpWellbeingRepository';
import { MockAlertsRepository } from './implementations/MockAlertsRepository';
import { MockAuthRepository } from './implementations/MockAuthRepository';
import { MockBabyRepository } from './implementations/MockBabyRepository';
import { MockContentRepository } from './implementations/MockContentRepository';
import { MockDevelopmentRepository } from './implementations/MockDevelopmentRepository';
import { MockDevicesRepository } from './implementations/MockDevicesRepository';
import { MockExerciseRepository } from './implementations/MockExerciseRepository';
import { MockFeedbackRepository } from './implementations/MockFeedbackRepository';
import { MockGrowthRepository } from './implementations/MockGrowthRepository';
import { MockHealthDetailsRepository } from './implementations/MockHealthDetailsRepository';
import { MockMotherRepository } from './implementations/MockMotherRepository';
import { MockPostpartumRepository } from './implementations/MockPostpartumRepository';
import { MockPreferencesRepository } from './implementations/MockPreferencesRepository';
import { MockSupportRepository } from './implementations/MockSupportRepository';
import { MockWellbeingRepository } from './implementations/MockWellbeingRepository';

export const repositories = env.enableMocks
  ? {
      auth: new MockAuthRepository(),
      mother: new MockMotherRepository(),
      baby: new MockBabyRepository(),
      content: new MockContentRepository(),
      alerts: new MockAlertsRepository(),
      development: new MockDevelopmentRepository(),
      growth: new MockGrowthRepository(),
      postpartum: new MockPostpartumRepository(),
      exercises: new MockExerciseRepository(),
      wellbeing: new MockWellbeingRepository(),
      preferences: new MockPreferencesRepository(),
      devices: new MockDevicesRepository(),
      healthDetails: new MockHealthDetailsRepository(),
      feedback: new MockFeedbackRepository(),
      support: new MockSupportRepository(),
    }
  : {
      auth: new HttpAuthRepository(),
      mother: new HttpMotherRepository(),
      baby: new HttpBabyRepository(),
      content: new HttpContentRepository(),
      alerts: new HttpAlertsRepository(),
      development: new HttpDevelopmentRepository(),
      growth: new HttpGrowthRepository(),
      postpartum: new HttpPostpartumRepository(),
      exercises: new HttpExerciseRepository(),
      wellbeing: new HttpWellbeingRepository(),
      preferences: new HttpPreferencesRepository(),
      devices: new HttpDevicesRepository(),
      healthDetails: new HttpHealthDetailsRepository(),
      feedback: new HttpFeedbackRepository(),
      support: new HttpSupportRepository(),
    };

export type Repositories = typeof repositories;
