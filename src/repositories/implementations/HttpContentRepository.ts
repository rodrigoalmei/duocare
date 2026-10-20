import type { ContentRepository } from '@/repositories/ContentRepository';
import { ContentService } from '@/services/ContentService';

export class HttpContentRepository implements ContentRepository {
  constructor(private readonly service = new ContentService()) {}
  listContents() { return this.service.listContents(); }
  getContentById(id: string) { return this.service.getContentById(id); }
}
