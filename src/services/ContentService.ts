import { apiClient } from '@/services/api/ApiClient';
import type { ContentItem } from '@/types';

export class ContentService {
  listContents() {
    return apiClient.request<ContentItem[]>('/contents');
  }

  getContentById(id: string) {
    return apiClient.request<ContentItem>(`/contents/${encodeURIComponent(id)}`);
  }
}
