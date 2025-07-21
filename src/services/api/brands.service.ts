import type { Brand } from "../../types/brand.interface";
import env from "../../config/env";

class BrandsService {
  private readonly apiUrl = env.apiUrl;

  private async fetchBrands(endpoint: string): Promise<Brand[]> {
    try {
      if (!this.apiUrl) {
        console.error("PUBLIC_API_URL is not defined");
        throw new Error("API URL is not configured");
      }

      const response = await fetch(`${this.apiUrl}${endpoint}`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to fetch brands:", {
          status: response.status,
          statusText: response.statusText,
          errorText,
        });
        throw new Error(
          `Failed to fetch brands: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in fetchBrands:", error);
      throw error; // Re-throw para manejar en el nivel superior
    }
  }

  async getBrands(): Promise<Brand[]> {
    return this.fetchBrands("/Catalog/getBrands");
  }

  async getBrandsByDealer(dealerId: string): Promise<Brand[]> {
    return this.fetchBrands(`/Catalog/getBrands?dealers_id=${dealerId}`);
  }
}

export const brandsService = new BrandsService();
