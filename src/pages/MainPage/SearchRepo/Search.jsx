import React from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = React.useState('');

  const handleClear = () => {
    onSearch('');
  };

  return (
    <div className="search">
      <label htmlFor="query">Procurar</label>
      <input
        type="text"
        name="query"
        id="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleClear}>Limpar</button>
      <button onClick={() => onSearch(query)}>Procurar</button>
    </div>
  );
};

export default Search;
