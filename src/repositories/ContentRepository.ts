import type { ContentItem } from '@/types';

export interface ContentRepository {
  listContents(): Promise<ContentItem[]>;
  getContentById(id: string): Promise<ContentItem | null>;
}
