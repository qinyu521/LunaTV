// 客户端 API 封装
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '/api';

export interface SearchResult {
  keyword: string;
  page: number;
  type?: string;
  total_sources: number;
  active_sources: number;
  results: Array<{
    source: string;
    name: string;
    count: number;
    data: any[];
  }>;
  timestamp: string;
}

export interface Config {
  cache_time: number;
  api_site: Record<string, {
    api: string;
    name: string;
    detail?: string;
  }>;
  custom_category: Array<{
    name: string;
    type: string;
    query: string;
  }>;
}

export class LunaTVApi {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE) {
    this.baseUrl = baseUrl;
  }

  // 搜索电影/电视剧
  async search(keyword: string, page: number = 1, type?: string): Promise<SearchResult> {
    const params = new URLSearchParams({
      keyword,
      page: page.toString(),
    });
    
    if (type) params.append('type', type);

    const response = await fetch(`${this.baseUrl}/search?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }

    return response.json();
  }

  // 获取配置
  async getConfig(): Promise<Config> {
    const response = await fetch(`${this.baseUrl}/config`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Get config failed: ${response.statusText}`);
    }

    return response.json();
  }

  // 设置配置 (需要管理员权限)
  async setConfig(config: Config, username: string, password: string): Promise<{ success: boolean }> {
    const credentials = btoa(`${username}:${password}`);
    
    const response = await fetch(`${this.baseUrl}/config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`,
      },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      throw new Error(`Set config failed: ${response.statusText}`);
    }

    return response.json();
  }

  // 获取视频详情
  async getVideoDetail(id: string, source: string): Promise<any> {
    const params = new URLSearchParams({ id, source });
    
    const response = await fetch(`${this.baseUrl}/detail?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Get detail failed: ${response.statusText}`);
    }

    return response.json();
  }
}

// 默认实例
export const api = new LunaTVApi();
