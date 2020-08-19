import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";


function App() {


  const [repositories, setRepositories] = useState([]);


  // Carga inicial dos repositórios existentes
  useEffect(() => {
    // Buscar todos os repositórios existentes
    api.get('/repositories')
      .then(response => {
        setRepositories(response.data);
      });
  }, []);


  /** Incluir novo repositório. */
  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Título temp-${Date.now()}`,
      url: 'URL temp',
      techs: ['tech 1 temp', 'tech 2 temp'],
    })

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }


  /** Excluir um repositório existente.
   * @param id Id do repositório a ser excluído
   */
  async function handleRemoveRepository(id) {
    // Remove o item da lista de repositórios
    await api.delete(`/repositories/${id}`);
    // Atualiza a lista de repositórios para exibição
    const updatedRepositories = repositories.filter(repository => {
      repository.id !== id
    });
    setRepositories(updatedRepositories);
  }


  return (
    <>
      <div>
        <ul data-testid="repository-list">
          {repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}

              <button
                type="button"
                onClick={() => handleRemoveRepository(repository.id)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={handleAddRepository}
      >
        Adicionar
      </button>
    </>
  );
}


export default App;
