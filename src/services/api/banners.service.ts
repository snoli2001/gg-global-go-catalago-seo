import env from "../../config/env";

interface Banner {
  url: string;
  code: string;
  description: string;
}

class BannersService {
  private readonly apiUrl = env.apiUrl;

  private async fetchBanners(endpoint: string): Promise<Banner[]> {
    try {
      const response = await fetch(`${this.apiUrl}${endpoint}`);
      if (!response.ok) {
        throw new Error("Error fetching banners");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching banners:", error);
      return [];
    }
  }

  async getBanners(): Promise<Banner[]> {
    return this.fetchBanners("/Catalog/getBannerAd");
  }

  async getBannersByDealer(dealerId: string): Promise<Banner[]> {
    return this.fetchBanners(`/Catalog/getBannerAd?dealers_catalog_id=${dealerId}`);
  }
}

export const bannersService = new BannersService();
