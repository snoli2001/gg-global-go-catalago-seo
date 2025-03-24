import type { Brand } from '../../types/brand.interface';

class BrandsService {
  private readonly apiUrl = import.meta.env.PUBLIC_API_URL;

  async getBrands(): Promise<Brand[]> {
    try {
      const response = await fetch(`${this.apiUrl}/getBrands`);
      if (!response.ok) {
        throw new Error('Failed to fetch brands');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching brands:', error);
      return [];
    }
  }
}

export const brandsService = new BrandsService(); 