import { api } from './configs';

export const getRepositories = async (userId, query) => {
  let url = `/users/${userId}/repositories/`;

  if (query !== '') {
    url += `?q=${query}`;
  }

  return api.get(url);
};
