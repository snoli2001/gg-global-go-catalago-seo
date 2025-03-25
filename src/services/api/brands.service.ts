import type { Brand } from "../../types/brand.interface";

class BrandsService {
  private readonly apiUrl = import.meta.env.PUBLIC_API_URL;

  async getBrands(): Promise<Brand[]> {
    try {
      if (!this.apiUrl) {
        console.error("PUBLIC_API_URL is not defined");
        throw new Error("API URL is not configured");
      }

      const response = await fetch(`${this.apiUrl}/getBrands`);
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
      console.error("Error in getBrands:", error);
      throw error; // Re-throw para manejar en el nivel superior
    }
  }
}

export const brandsService = new BrandsService();
