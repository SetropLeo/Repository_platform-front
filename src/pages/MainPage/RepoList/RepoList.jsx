import React from 'react';

const RepoList = ({ repositories, onDelete }) => {
  
  return (
    <ul className="list">
      <li className="item">
        <div className="info">
          <div className="owner">Facebook</div>
          <div className="name">React</div>
        </div>
        <button onClick={() => onDelete(null)}>Apagar</button>
      </li>
    </ul>
  );
};

export default RepoList;
