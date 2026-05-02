import React, { useState } from "react";
import "./App.scss";
import type { VehicleDigitalVault } from "./types/VehicleDigitalVault";
import { SOURCE_SYSTEM } from "./constants/system";
import SearchBar from "./components/SearchBar/SearchBar";
import MetricCards from "./components/MetricCards/MetricCards";
import SourceStatus from "./components/SourceStatus/SourceStatus";
import DocumentCard from "./components/DocumentList/DocumentCard";
import { getUnifiedDocuments } from "./services/api";

const App: React.FC = () => {
  const [vin, setVin] = useState("");
  const [documents, setDocuments] = useState<VehicleDigitalVault[]>([]);

  const salesDocs = documents.filter(
    (d) => d.source_system === SOURCE_SYSTEM.SALES,
  ).length;
  const serviceDocs = documents.filter(
    (d) => d.source_system === SOURCE_SYSTEM.SERVICE,
  ).length;

  const handleVinChange = (value: string) => {
    setVin(value);
  };

  const handleSearch = () => {
    console.log("Searching for VIN:", vin);
    getUnifiedDocuments(vin)
      .then((docs) => {
        console.log("res:", docs);
        setDocuments(docs);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  };

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="brand">Keyloop &middot; Operate</p>
          <h1 className="page-title">Document viewer</h1>
        </div>
        <div className="header-meta">
          Scenario D<br />
          Unified Document Viewer
        </div>
      </header>

      <SearchBar
        value={vin}
        onChange={handleVinChange}
        onSearch={handleSearch}
      />

      {/* VIN Resolved Tag */}
      <div className="vin-tag">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M8 5v4M8 11v.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        {vin} <span className="vin-sep">&middot;</span> 2018 Honda Civic{" "}
        <span className="vin-sep">&middot;</span> Silver
      </div>

      <MetricCards
        total={documents.length}
        salesCount={salesDocs}
        serviceCount={serviceDocs}
      />

      <SourceStatus fetchTime="1.2s" />

      <hr className="divider" />

      <div className="results-bar">
        <span className="results-count">{documents.length} documents</span>
      </div>

      <div className="doc-list">
        {documents.map((doc, index) => (
          <DocumentCard key={doc.id} doc={doc} />
        ))}
      </div>
    </div>
  );
};

export default App;
