import React from 'react';

const RepoList = ({ repositories, onDelete }) => {

  const filterName = (name) => {
    return name.substring(0, name.indexOf('/'));
  }

  const filterOwner = (name) => {
    return name.substring(name.indexOf('/') + 1);
  }

  return (
    <ul className="list">
      {repositories && repositories.map((repository) => (
        <li className="item" key={repository._id}>
          <div className="info">
            <div className="owner">{filterName(repository.name)}</div>
            <div className="name">{filterOwner(repository.name)}</div>
          </div>
          <button onClick={() => onDelete(null)}>Apagar</button>
        </li>
      ))}
    </ul>
  );
};

export default RepoList;
