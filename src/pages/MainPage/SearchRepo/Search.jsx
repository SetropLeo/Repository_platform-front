import React from 'react';
import { useEffect } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = React.useState('');

  useEffect(() => {
    setQuery(localStorage.getItem('queryValue'));
  }, []);

  const onInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    localStorage.setItem('queryValue', '');
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
        onChange={(e) => onInputChange(e)}
      />
      <button onClick={handleClear}>Limpar</button>
      <button onClick={() => onSearch(query)}>Procurar</button>
    </div>
  );
};

export default Search;
