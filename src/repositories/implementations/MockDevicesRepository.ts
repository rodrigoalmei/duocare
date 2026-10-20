import type { DevicesRepository } from '@/repositories/DevicesRepository';
import type { ConnectedDevice, DeviceOption } from '@/types';

const connectedDevice: ConnectedDevice = {
  id: 'wearable-demo-01',
  name: 'Relógio conectado',
  status: 'connected',
  lastSync: 'Última sincronização · demonstrativa',
  dataSources: ['Sono', 'Passos'],
};

const options: DeviceOption[] = [
  { id: 'apple-health', name: 'Apple Health', status: 'Não conectado', canConnect: true },
  { id: 'garmin', name: 'Garmin', status: 'Não conectado', canConnect: true },
  { id: 'other', name: 'Outro dispositivo', status: 'Disponibilidade a confirmar', canConnect: false },
];

export class MockDevicesRepository implements DevicesRepository {
  async getConnectedDevice() {
    return { ...connectedDevice, dataSources: [...(connectedDevice.dataSources ?? [])] };
  }

  async listAvailableDevices() {
    return options.map((item) => ({ ...item }));
  }
}
