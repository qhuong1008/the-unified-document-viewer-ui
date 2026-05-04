import React from "react";
import "./SearchBar.scss";
import { trace, SpanStatusCode } from "@opentelemetry/api";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange, onSearch }) => {
  const tracer = trace.getTracer("unified-document-viewer-ui");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSearchClick = async () => {
    // Create custom span for VIN search operation
    const span = tracer.startSpan("VIN Search", {
      kind: 1, // SpanKind.CLIENT
    });

    try {
      // Add attributes for the search
      span.setAttribute("operation.name", "VIN Search");
      span.setAttribute("vin.value", value);

      // Set status
      span.setStatus({ code: SpanStatusCode.OK });

      // Call the original search handler
      onSearch();
    } catch (error) {
      // Record error and set status
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error instanceof Error ? error.message : "Unknown error",
      });
      throw error;
    } finally {
      // End the span
      span.end();
    }
  };

  return (
    <div className="search-wrap">
      <input
        className="search-input"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Enter VIN"
      />
      <button type="button" className="search-btn" onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
