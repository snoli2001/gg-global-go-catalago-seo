import type { Category } from '../../types/category.interface';

class CategoriesService {
  private readonly apiUrl = import.meta.env.PUBLIC_API_URL;

  async getCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${this.apiUrl}/GetCategories`);
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