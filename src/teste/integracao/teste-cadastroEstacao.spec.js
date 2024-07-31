import request from "supertest";
import { expect } from "@jest/globals";
import app from "../../app.js";


it('Deve cadastrar uma estação com dados válidos', async () => {
  const response = await request(app)
    .post('/cadastrarEstacao')
    .send({
      nome: 'av. ',
      endereco: 'Ifro - Campus Vilhena/RO',
      latitude: 23.55052,
      longitude: -46.633309,
      ip: '192.168.0.12',
      status: 'ativo',
      usuario_id: 6
    });

  expect(response.status).toBe(201);
});

it('Deve retornar erro ao cadastrar uma estação com usuário_id inválido', async () => {
  const response = await request(app)
    .post('/cadastrarEstacao')
    .send({
      nome: 'estacao av parana',
      endereco: 'av parana n3020',
      latitude: 123.456,
      longitude: 456.789,
      ip: '192.168.0.1',
      status: 'ativo',
      usuario_id: 999
    });

  expect(response.status).toBe(404);
  expect(response.body.message).toBe('Usuário não encontrado');
});

it('Deve retornar erro ao cadastrar uma estação com nome já existente', async () => {
  const response = await request(app)
    .post('/cadastrarEstacao')
    .send({
      nome: 'Estação Atualizada 2.0', 
      endereco: 'av melvin jones',
      latitude: 23.454,
      longitude: 456.784,
      ip: '192.168.0.2',
      status: 'ativo',
      usuario_id: 6
    });

  expect(response.status).toBe(400);
  expect(response.body.message).toBe('Nome já cadastrado');
});
