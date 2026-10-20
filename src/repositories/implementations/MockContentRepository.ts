import { contentMock } from '@/mocks/content.mock';
import type { ContentRepository } from '@/repositories/ContentRepository';

export class MockContentRepository implements ContentRepository {
  async listContents() {
    return contentMock.map((item) => ({ ...item, body: item.body ? [...item.body] : undefined }));
  }

  async getContentById(id: string) {
    const item = contentMock.find((content) => content.id === id);
    return item ? { ...item, body: item.body ? [...item.body] : undefined } : null;
  }
}
