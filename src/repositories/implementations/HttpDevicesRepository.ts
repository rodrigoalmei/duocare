import { contractPending } from '@/repositories/contractPending';
import type { DevicesRepository } from '@/repositories/DevicesRepository';

export class HttpDevicesRepository implements DevicesRepository {
  async getConnectedDevice() {
    // TODO(backend-contract): conectar quando o contrato de dispositivos for definido.
    return contractPending('dispositivos');
  }

  async listAvailableDevices() {
    return contractPending('dispositivos');
  }
}
