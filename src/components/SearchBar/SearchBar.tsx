import React from "react";
import "./SearchBar.scss";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange, onSearch }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
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
      <button type="button" className="search-btn" onClick={onSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
