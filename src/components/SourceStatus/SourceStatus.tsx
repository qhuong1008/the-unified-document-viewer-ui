import React from "react";
import "./SourceStatus.scss";

interface Props {
  fetchTime: string;
}

const SourceStatus: React.FC<Props> = ({ fetchTime }) => {
  return (
    <div className="sources-row">
      <div className="src-badge">
        <div className="dot" style={{ background: "#639922" }}></div>
        Sales system &mdash; connected
      </div>
      <div className="src-badge">
        <div className="dot" style={{ background: "#639922" }}></div>
        Service system &mdash; connected
      </div>
      <span className="fetch-time">fetched in {fetchTime}</span>
    </div>
  );
};

export default SourceStatus;
