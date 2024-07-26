const request = require('supertest');
const urlBase = 'http://localhost:7001'; 


it('Deve cadastrar uma estação com dados válidos', async () => {
  const response = await request(urlBase)
    .post('/cadastrarEstacao')
    .send({
      nome: 'estacao av melvin jones',
      endereco: 'av melvin jones',
      latitude: '123.454',
      longitude: '456.784',
      ip: '192.168.0.2',
      status: 'ativo',
      usuario_id: 2
    });

  expect(response.status).toBe(400);
});

it('Deve retornar erro ao cadastrar uma estação com usuário_id inválido', async () => {
  const response = await request(urlBase)
    .post('/cadastrarEstacao')
    .send({
      nome: 'estacao av parana',
      endereco: 'av parana n3020',
      latitude: '123.456',
      longitude: '456.789',
      ip: '192.168.0.1',
      status: 'ativo',
      usuario_id: 999
    });

  expect(response.status).toBe(404);
  expect(response.body.message).toBe('Usuário não encontrado');
});

it('Deve retornar erro ao cadastrar uma estação com nome já existente', async () => {
  const response = await request(urlBase)
    .post('/cadastrarEstacao')
    .send({
      nome: 'estacao kamila', 
      endereco: 'av melvin jones',
      latitude: '123.454',
      longitude: '456.784',
      ip: '192.168.0.2',
      status: 'ativo',
      usuario_id: 2
    });

  expect(response.status).toBe(400);
  expect(response.body.message).toBe('Nome já cadastrado');
});
