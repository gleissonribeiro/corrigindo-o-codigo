const express = require('express');

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());

const repositories = [];

// ----Obtém os repositórios----
app.get('/repositories', (request, response) => {
  return response.json(repositories);
});
// -----------------------------

// ----Adiciona/cria um repositório----
app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});
// -----------------------------------

// ----Altera/edita repositório----
app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const updatedRepository = request.body;

  repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: 'Repository not found' });
  }

  updatedRepository.likes = repositories[repositoryIndex].likes;
  const repository = { ...repositories[repositoryIndex], ...updatedRepository };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});
// --------------------------------

// ----Exclui um repositório----
app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: 'Repository not found' });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});
// -----------------------------

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: 'Repository not found' });
  }

  const likes = ++repositories[repositoryIndex].likes;

  return response.json({ likes });
});

module.exports = app;
