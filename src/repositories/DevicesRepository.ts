import type { ConnectedDevice, DeviceOption } from '@/types';

export interface DevicesRepository {
  getConnectedDevice(): Promise<ConnectedDevice | null>;
  listAvailableDevices(): Promise<DeviceOption[]>;
}
