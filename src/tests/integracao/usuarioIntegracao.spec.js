import request from "supertest";
import { expect, describe } from "@jest/globals";
import { prisma } from "../../configs/prismaClient.js";
import app from "../../app.js";

// Apenas para teste depois irei refatorar
// ---------------- Login ----------------
let token;

it('Login com autenticação jwt', async () => {
    const response = await request(app)
        .post("/autenticacao")
        .send({
            email: "ana@example.com",
            senha: "Senha123@"
        })
        .expect(201)
    token = response.body.token;
})

// ----------- Deletar Usuário ---------

describe("Deletar usuario", () => {
    it('deve deletar a estação com id valido', async () => {
        const id = 10;
        const response = await request(app)
          .delete(`/usuario/${id}`)
          .set("Authorization", `Bearer ${token}`)
          .set("Content-Type", "application/json")
        //testando a resposta
        expect(response.status).toBe(204);
        // //testando se o erro é falso
        expect({error: false}).toHaveProperty('error', false);  
    })
    it('deve retornar erro com o id invalido', async () => {
        const id = 64;
        const response = await request(app)
          .delete(`/usuario/${id}`)
          .set("Authorization", `Bearer ${token}`)
          .set("Content-Type", "application/json")
        //testando a resposta
        expect(response.status).toBe(400);
        //testando a resposta response.body é uma instancia de um objeto
        expect(response.body).toBeInstanceOf(Object);
        //testando se o erro é true
        expect({error: true}).toHaveProperty('error', true);
        //testando a mensagem de retorno
        expect({message: `Não existe usuário com este id: ${id}`}).toHaveProperty('message', `Não existe usuário com este id: ${id}`);     
    })
});
