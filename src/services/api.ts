import type { VehicleDigitalVault } from "./../types/VehicleDigitalVault";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const getUnifiedDocuments = async (
  vin: string,
  token: string,
): Promise<VehicleDigitalVault[]> => {
  const response = await axios.get(`${API_BASE_URL}/vault/${vin}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.documents;
};
