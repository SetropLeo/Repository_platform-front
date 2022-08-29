import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Nav from './Nav/Nav';
import RepoList from './RepoList/RepoList';
import CreateRepo from './CreateRepo/CreateRepo';
import Search from './SearchRepo/Search';

import { getRepositories } from '../../services/api';

import './styles.css';

export const MainPage = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const userId = '62c22ca11d5eb96549c92df5';

  const loadRepositories = async (query = '') => {
    try {
      setLoading(true);
      const response = await getRepositories(userId, query);
      setRepositories(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoadingError(true);
    }
  };

  useEffect(() => {
    (async () => await loadRepositories())();
  }, []);

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

  if (loadingError) {
    return (
      <div className="loading">
        Erro ao carregar os dados de repositório.
        <Link to="/login">Voltar</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading">
        Carregando...
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div id="main">
      <Nav onLogout={handleLogout} />
      <Search onSearch={handleSearch} />
      <div className="repositories">
        <h2 className="title">Repositórios</h2>
        <RepoList repositories={repositories} onDelete={handleDeleteRepo} />
        <CreateRepo onAdd={handleAddRepo} />
      </div>
    </div>
  );
};

export default MainPage;
