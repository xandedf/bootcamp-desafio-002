import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
        setProjects(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: `https://github.com/xandedf/bootcamp-${Date.now()}`,
      techs: ['React', 'ReactJS', 'Node.JS']
    });

    const project = response.data;

    setProjects([...projects, project]);

  }

  async function handleRemoveRepository(id) {
    
    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204) {
      const repositoryIndex = projects.findIndex(project => project.id === id);
      projects.splice(repositoryIndex, 1);
      setProjects([...projects]);
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => {
          return (
              <li key={project.id}>
                {project.title}
                <button onClick={() => handleRemoveRepository(project.id)}>Remover</button>
              </li>
          )}
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>

    </div>
  );
}

export default App;
