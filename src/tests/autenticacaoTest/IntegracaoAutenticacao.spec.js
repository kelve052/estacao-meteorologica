import request from "supertest";
import { expect } from "@jest/globals";
import app from "../../app.js";


it('Testando a criação do Token', async () => {
  const response = await request(app)
    .post("/autenticacao")
    .send({
      email: "frank@example.com",
      senha: "senha131"
    })
    console.log(response)
  expect(response.status).toBe(201)
  expect(response.body.message).toBe("Token gerado com sucesso!");
  expect(response.body.error).toBe(false);
  expect(response.body.data).toMatchObject({
    id: 10,
    nome: 'Frank',
    idade: 27,
    email: 'frank@example.com',
    senha: 'senha131'
  })
})