import React, { useState } from "react";
import type { VehicleDigitalVault } from "../../types/VehicleDigitalVault";
import { SOURCE_SYSTEM } from "../../constants/system";
import "./DocumentCard.scss";

interface Props {
  doc: VehicleDigitalVault;
}

const DocumentCard: React.FC<Props> = ({ doc }) => {
  const [showViewer, setShowViewer] = useState(false);
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  const isSales = doc.source_system === SOURCE_SYSTEM.SALES;
  const displayDate = isSales
    ? doc.sales_document_issue_date
    : doc.service_completion_date;

  const handleViewDocument = async () => {
    if (!doc.access_url) return;

    // First try to fetch through proxy for CORS-enabled viewing
    try {
      const token = localStorage.getItem("accessToken") || "";

      // Try proxy fetch first (for same-origin or CORS-enabled URLs)
      const response = await fetch(doc.access_url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch document");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setViewerUrl(url);
      setShowViewer(true);
    } catch (error) {
      // If fetch fails (likely CORS), open in new tab as fallback
      console.warn("CORS blocked, opening in new tab:", error);
      window.open(doc.access_url, "_blank");
    }
  };

  const handleCloseViewer = () => {
    setShowViewer(false);
    if (viewerUrl) {
      window.URL.revokeObjectURL(viewerUrl);
      setViewerUrl(null);
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
        <button className="dl-btn" onClick={handleViewDocument}>
          View
        </button>
      </div>
      {showViewer && viewerUrl && (
        <div className="doc-viewer-overlay" onClick={handleCloseViewer}>
          <div
            className="doc-viewer-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="doc-viewer-header">
              <span className="doc-viewer-title">{doc.title}</span>
              <button className="doc-viewer-close" onClick={handleCloseViewer}>
                ✕
              </button>
            </div>
            <div className="doc-viewer-content">
              <iframe
                src={viewerUrl}
                title={doc.title}
                className="doc-viewer-frame"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentCard;
