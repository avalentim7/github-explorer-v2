import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom'
import errorImg from '../../assets/error-notfound.png';

import api from '../../services/api';

import './Dashboard.css';

function Dashboard() {
  const [repositories, setRepositories] = useState([]);
  const [repositoryName, setRepositoryName] = useState('');

  const handleAddRepository = async (event) => {
    event.preventDefault();

    if (!repositoryName) return;

    try {
      const response = await api.get(`repos/${repositoryName}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setRepositoryName('');
    } catch (err) {
      setRepositories([{ name: 'Repositório não encontrado', owner: { avatar_url: errorImg }, html_url: '-', description: 'Tente novamente' }])
    }
  }

  return (
    <div className="Dashboard">
      <div className="header">
        <header>
          <h1>GitHub<span>Explorer</span></h1>
        </header>
      </div>
      <div className="container">
        <form onSubmit={handleAddRepository}>
          <input
            type="text"
            placeholder="Digite o nome do usuário"
            value={repositoryName}
            onChange={(e) => setRepositoryName(e.target.value)}
          />
          <button type="submit">Pesquisar</button>
        </form>

        <main>
          {repositories && repositories.map(repository => {
            return (
              // <a href={repository.html_url} target="_blank" rel="noreferrer" className="card-container">
              <Link key={repository.full_name} to={`/repository/${repository.full_name}`} className="card-container">
                <img src={repository.owner.avatar_url} alt=""></img>
                <div className="card-content" >
                  <h1>{repository.name}</h1>
                  <p>{repository.description}</p>
                </div>
              </Link>
            )
          })}
        </main>
      </div>
    </div>
  )
}

export default Dashboard;