import type { VehicleDigitalVault } from "./../types/VehicleDigitalVault";
import axios from "axios";

// Note: Trace context propagation is automatically handled by FetchInstrumentation
// registered in src/telemetry.js - it automatically adds W3C TraceContext headers
// (traceparent, tracestate) to all outgoing HTTP requests

const API_BASE_URL = "http://localhost:8080";

export const getUnifiedDocuments = async (
  vin: string,
  token: string,
): Promise<VehicleDigitalVault[]> => {
  const response = await axios.post(
    `${API_BASE_URL}/vault/search`,
    { vin },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.documents;
};
