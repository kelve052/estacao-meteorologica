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

it('Listagem das estac', async () => {
    const estacao = await prisma.estacao.findMany()
    const response = await request(app)
        .get("/estacoes")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")

    const lista = response.body.response

    expect(response.status).toBe(200)
    expect(response.body.response).toBeInstanceOf(Array)
});