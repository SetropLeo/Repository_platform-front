import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';

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
  const { user, logout } = useContext(AuthContext);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const loadRepositories = async (query = '') => {
    try {
      setLoading(true);
      const response = await getRepositories(user?.id, query);
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
    logout();
  };

  const handleSearch = (query) => {
    localStorage.setItem('queryValue', query);
    loadRepositories(query);
  };

  const handleDeleteRepo = async (repository) => {
    await destroyRepository(user?.id, repository._id);
    await loadRepositories();
  };

  const handleAddRepo = async (url) => {
    try {
      await createRepository(user?.id, url);
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
