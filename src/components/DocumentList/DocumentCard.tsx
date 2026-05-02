import React from "react";
import type { VehicleDigitalVault } from "../../types/VehicleDigitalVault";
import { SOURCE_SYSTEM } from "../../constants/system";
import "./DocumentCard.scss";

interface Props {
  doc: VehicleDigitalVault;
}

const DocumentCard: React.FC<Props> = ({ doc }) => {
  const isSales = doc.source_system === SOURCE_SYSTEM.SALES;
  const displayDate = isSales
    ? doc.sales_document_issue_date
    : doc.service_completion_date;

  const handleDownload = () => {
    if (doc.access_url) {
      const link = document.createElement("a");
      link.href = doc.access_url;
      link.download = doc.title.replace(/\s+/g, "_") + ".pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="doc-card">
      <div className={`doc-icon ${isSales ? "icon-s" : "icon-v"}`}>
        {isSales ? "📄" : "🔧"}
      </div>
      <div className="doc-info">
        <div className="doc-name">{doc.title}</div>
        <div className="doc-meta">
          {doc.doc_category} &middot;{" "}
          {isSales ? doc.sales_person : doc.technician}
        </div>
      </div>
      <div className="doc-right">
        <span className={`pill ${isSales ? "pill-s" : "pill-v"}`}>
          {isSales ? "Sales" : "Service"}
        </span>
        <span className="doc-date">{displayDate?.split("T")[0]}</span>
        <button className="dl-btn" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
};

export default DocumentCard;
