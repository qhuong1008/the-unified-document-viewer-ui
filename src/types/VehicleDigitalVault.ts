export type SourceSystem = 'SALES' | 'SERVICE';

export interface VehicleDigitalVault {
  id: string; // uuid.UUID
  external_id: string; // gorm:"uniqueIndex"
  vin: string; // gorm:"index"
  source_system: SourceSystem;
  title: string;
  doc_category: string; // Commercial, Technical, or Legal
  
  // Domain Specific Fields - Giúp hiển thị chi tiết hơn trong Document List
  technician?: string;
  service_type?: string;
  sales_person?: string;
  
  // DateTime Types (ISO String format from Backend)
  service_completion_date?: string;
  sales_document_issue_date?: string;
  
  access_url: string; // FileURL
  synced_at: string;
}

export interface VehicleInfo {
  vin: string;
  make: string;
  model: string;
  color: string;
}