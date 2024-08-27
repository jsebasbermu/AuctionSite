import React from 'react';

const Header = ({ searchTerm, onSearchChange }) => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src="./src/assets/Eauction.png" alt="E-Auction Logo" />
      </div>
      <h1 className="header-title">Electronic - Auction</h1>
      <div className="header-search">
        <input
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search products..."
          className="search-input"
        />
      </div>
    </header>
  );
};

export default Header;
