import React from "react";
import "./MetricCards.scss";

interface Props {
  total: number;
  salesCount: number;
  serviceCount: number;
}

const MetricCards: React.FC<Props> = ({ total, salesCount, serviceCount }) => {
  const salesWidth = total > 0 ? (salesCount / total) * 100 : 0;
  const serviceWidth = total > 0 ? (serviceCount / total) * 100 : 0;

  return (
    <div className="summary-grid">
      <div className="metric">
        <div className="metric-label">Total documents</div>
        <div className="metric-value">{total}</div>
        <div className="metric-bar">
          <div
            className="bar-fill"
            style={{ width: "100%", background: "#9a9a94" }}
          ></div>
        </div>
      </div>
      <div className="metric">
        <div className="metric-label">Sales system</div>
        <div className="metric-value blue">{salesCount}</div>
        <div className="metric-bar">
          <div
            className="bar-fill"
            style={{ width: `${salesWidth}%`, background: "#378ADD" }}
          ></div>
        </div>
      </div>
      <div className="metric">
        <div className="metric-label">Service system</div>
        <div className="metric-value green">{serviceCount}</div>
        <div className="metric-bar">
          <div
            className="bar-fill"
            style={{ width: `${serviceWidth}%`, background: "#1D9E75" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MetricCards;
