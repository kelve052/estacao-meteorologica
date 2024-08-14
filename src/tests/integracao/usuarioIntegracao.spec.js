import request from "supertest";
import { expect, describe } from "@jest/globals";
import { prisma } from "../../configs/prismaClient.js";
import app from "../../app.js";
import { object } from "zod";

// Apenas para teste depois irei refatorar
// ---------------- Login ----------------
let token;
let idvalido;

it('Login com autenticação jwt', async () => {
    const response = await request(app)
        .post("/autenticacao")
        .send({
            email: "lucas@example.com",
            senha: "Lucas#123"
        })
        .expect(201)
    token = response.body.token;
})


// ----------- Listar Estação ---------

describe("Listar usuarios", () => {
    
    it('Listagem de usuarios', async () => {
        const response = await request(app)
            .get("/usuario")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")

        const body = response.body;
        console.log(body)
        expect(body).toBeInstanceOf(object);
        //idvalido=body.response[0].id;
        //testando se retorna json
        expect(response.headers['content-type']).toContain('json');
        expect(response.status).toBe(200);
      });
    
    // it('Listar usuario por ID valido', async () => {
    //   const response = await request(app)
    //       .get(`/usuario/${idvalido}`)
    //       .set("Authorization", `Bearer ${token}`)
    //       .set("Content-Type", "application/json")
    //     //testando a resposta
    //   expect(response.status).toBe(200);
    //   // testando se esta retornando o id esperado
    //   expect({id: idvalido}).toHaveProperty('id', idvalido);
    //   //testando se retorna json
    //   expect(response.headers['content-type']).toContain('json');
    //   //testando a resposta response.body é uma instancia de um objeto
    //   expect(response.body).toBeInstanceOf(Array);
    // }); 
  //   it('Deve retornar erro ao listar usuario com id invalido', async () => {
  //     const idinvalido = "9999";
  //     const response = await request(app)
  //         .get(`/usuario/${idinvalido}`)
  //         .set("Authorization", `Bearer ${token}`)
  //         .set("Content-Type", "application/json")
  //       //testando a resposta
  //       expect(response.status).toBe(400);
  //       //testando se retorna json
  //       expect(response.headers['content-type']).toContain('json');
  //       //testando se retorna o motivo do erro
  //       expect({message: 'Estação não encontrada'}).toHaveProperty('message', "Estação não encontrada");
  //       //testando se o erro esta ativo
  //       expect({error: true}).toHaveProperty('error', true);
  // });
});

