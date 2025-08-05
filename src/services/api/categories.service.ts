import type { Category } from '../../types/category.interface';
import env from '../../config/env';

class CategoriesService {
  private readonly apiUrl = env.apiUrl;

  async getCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${this.apiUrl}/Catalog/GetCategories`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }
}

export const categoriesService = new CategoriesService(); 