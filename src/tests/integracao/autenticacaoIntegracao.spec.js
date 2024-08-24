import request from "supertest";
import { expect, it } from "@jest/globals";
import app from "../../app.js";

it('Criar token, deve retonar: Token gerado com sucesso!', async () => {
  const response = await request(app)
  .post('/autenticacao')
  .set("Content-Type", "application/json")
  .send({
      email: 'maria@example.com',
      senha: 'Senha123@'
  });

  expect(response.status).toBe(201)
  expect(response.body.message).toBe('Token gerado com sucesso!')
  expect(typeof(response.body.token)).toBe("string")
  expect(response.body.data).toBe(null)
  expect(response.body.error).toBe(false)
})