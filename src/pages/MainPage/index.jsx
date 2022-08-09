import React from 'react';
import CreateRepo from './CreateRepo/CreateRepo';
import Nav from './Nav/Nav';
import RepoList from './RepoList/RepoList';
import Search from './SearchRepo/Search';
import './styles.css';

export const MainPage = () => {
  const handleLogout = () => {
    console.log('logout');
  };

  const handleSearch = (query) => {
    console.log('query', query);
  };

  const handleDeleteRepo = (repository) => {
    console.log('delete repo', repository);
  };

  const handleAddRepo = (url) => {
    console.log('url', url);
  };

  return (
    <div id="main">
      <Nav onLogout={handleLogout} />
      <Search onSearch={handleSearch} />
      <div className="repositories">
        <h2 className="title">Repositórios</h2>
        <RepoList repositories={[]} onDelete={handleDeleteRepo} />
        <CreateRepo onAdd={handleAddRepo} />
      </div>
    </div>
  );
};

export default MainPage;
