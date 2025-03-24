interface Banner {
  url: string;
  code: string;
  description: string;
}

class BannersService {
  private readonly apiUrl = import.meta.env.PUBLIC_API_URL;

  async getBanners(): Promise<Banner[]> {
    try {
      const response = await fetch(`${this.apiUrl}/getBannerAd`);
      if (!response.ok) {
        throw new Error("Error fetching banners");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching banners:", error);
      return [];
    }
  }
}

export const bannersService = new BannersService();
