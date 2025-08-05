import type { Moto } from "../../types/moto.interface";
import env from "../../config/env";

class MotoService {
  private readonly apiUrl = env.apiUrl;

  private async fetchMotos(endpoint: string): Promise<Moto[]> {
    try {
      const response = await fetch(`${this.apiUrl}${endpoint}`);
      if (!response.ok) {
        throw new Error("Failed to fetch motorcycles");
      }
      const data = await response.json();
      return data.map((moto: Moto) => ({
        ...moto,
        isPreOwned: moto.isPreOwned || false,
      }));
    } catch (error) {
      console.error("Error fetching motorcycles:", error);
      throw error;
    }
  }

  async getMotos(): Promise<Moto[]> {
    return this.fetchMotos("/Catalog/getMotorcycles?dealers_catalog_id=1");
  }

  async getMotosByDealer(dealerId: string): Promise<Moto[]> {
    return this.fetchMotos(`/Catalog/getMotorcycles?dealers_catalog_id=${dealerId}`);
  }

  async getMotoByCode(code: string): Promise<Moto | undefined> {
    try {
      const response = await fetch(
        `${this.apiUrl}/Catalog/getMotorcycleByCode/${code}`
      );
      if (!response.ok) {
        if (response.status === 404) {
          return undefined;
        }
        throw new Error("Failed to fetch motorcycle");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching motorcycle:", error);
      throw error;
    }
  }
}

// Export a singleton instance
export const motoService = new MotoService();
