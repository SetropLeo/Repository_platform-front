import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Nav from './Nav/Nav';
import RepoList from './RepoList/RepoList';
import CreateRepo from './CreateRepo/CreateRepo';
import Search from './SearchRepo/Search';

import {
  getRepositories,
  createRepository,
  destroyRepository,
} from '../../services/api';

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
    loadRepositories(query);
  };

  const handleDeleteRepo = async (repository) => {
    await destroyRepository(repository.userId, repository._id);
    await loadRepositories();
  };

  const handleAddRepo = async (url) => {
    try {
      await createRepository(userId, url);
      await loadRepositories();
    } catch (error) {
      console.error(error);
      setLoadingError(true);
    }
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
