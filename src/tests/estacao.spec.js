import request from "supertest";
import { expect } from "@jest/globals";
import { prisma } from "../configs/prismaClient.js";
import app from "../app.js";

// Apenas para teste depois irei refatorar
// ---------------------------------------
let token;
it('Login com autenticação jwt', async () => {
    const response = await request(app)
        .post("/autenticacao")
        .send({
            email: "alice@example.com",
            senha: "senha123"
        })
        .expect(201)
    token = response.body.token;
})
// ---------------------------------------

it('Atualização dos dados de uma estação', async () => {
    const updatedData = {
        nome: "Estação Atualizada 2.0",
        endereco: "Ifro - Campus Vilhena/RO"
    }
    const estacao = await prisma.estacao.findFirst({
        where: {
            usuario_id: 6
        }
    })
    const response = await request(app)
        .patch(`/estacoes/${estacao.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedData);

    expect(response.status).toBe(200)
    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.body.message).toMatch("Estação atualizada com sucesso.");
    expect(response.body.data).toHaveProperty('nome', updatedData.nome);
    expect(response.body.data).toHaveProperty('endereco', updatedData.endereco);
});

it('Atualização dos dados de uma estação - dados vazios', async () => {
    const updatedDataVoid = {
        nome: "",
    }
    const estacao = await prisma.estacao.findFirst({
        where: {
            usuario_id: 6
        }
    })
    const response = await request(app)
        .patch(`/estacoes/${estacao.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedDataVoid);

    expect(response.status).toBe(400)
    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.body.message).toMatch(`Campo nome não específicado.`);
    expect(response.body.code).toBe(400);
    expect(response.body.error).toBe(true);
});
