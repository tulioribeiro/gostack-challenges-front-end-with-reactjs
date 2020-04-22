import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then(({ data }) => setRepositories(data));
  }, []);

  async function handleAddRepository() {
    const newRepo = {
      title: `Título do repositório ${Date.now()}`,
      url: "https://github.com/tulioribeiro/gostack-challenges-front-end-with-reactjs",
      techs: [
          "Javascript",
          "NodeJS",
          "CSS"
      ],
    }
    
    const response = await api.post("repositories", newRepo);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
