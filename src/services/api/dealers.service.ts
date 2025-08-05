import type { Dealer } from "../../types/dealer.interface";
import env from "../../config/env";

class DealersService {
  private readonly apiUrl = env.apiUrl;

  async getDealers(): Promise<Dealer[]> {
    try {
      const response = await fetch(`${this.apiUrl}/Dealers/sel_catalog`);
      if (!response.ok) {
        throw new Error("Failed to fetch dealer");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching dealer:", error);
      return [];
    }
  }
}

export const dealersService = new DealersService();
