import React, { useState } from 'react';

const CreateRepo = ({ onAdd }) => {
  const [newRepo, setNewRepo] = useState('');

  return (
    <div className="new">
      <label htmlFor="new-repo">Novo Repositório:</label>
      <input
        type="url"
        name="new-repo"
        id="new-repo"
        value={newRepo}
        onChange={(e) => setNewRepo(e.target.value)}
      />
      <button onClick={() => onAdd(newRepo)}>Adicionar</button>
    </div>
  );
};

export default CreateRepo;
