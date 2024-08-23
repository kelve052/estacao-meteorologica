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

describe("Cadastrar usuario", () => {
    it('Deve cadastrar um usuario com dados válidos', async () => {
        const response = await request(app)
            .post('/usuario')
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .send({
                nome: "usuario novo2",
                email: "vitorgabriel12@gmail.com",
                senha: "Senhaa123@"
            });

        expect(response.status).toBe(201);
    expect({message:"usuario cadastrado com sucesso!"}).toHaveProperty('message',"usuario cadastrado com sucesso!");
    expect({error:false}).toHaveProperty('error',false);
    });

    it('Deve retornar erro ao cadastrar um usuario com a senha com os parametros errados', async () => {
        const response = await request(app)
            .post('/usuario')
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .send({
                nome: "usuario Atualizado 2.0",
                email: "vitorgabriel12@gmail.com",
                senha: "Senhaa123"
            });

        expect(response.status).toBe(400);
        expect({message:"A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo."}).toHaveProperty('message',"A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo.");
        expect({error:true}).toHaveProperty('error',true);
        

    });

    it('Deve retornar erro ao cadastrar um usuario com o email repetido', async () => {
        const response = await request(app)
            .post('/usuario')
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .send({
                nome: "usuario Atualizado 2.0",
                email: "vitorgabriel123@gmail.com",
                senha: "Senhaa123@"
            });

        expect(response.status).toBe(400);
        expect({message:"Email Já Cadastrado!"}).toHaveProperty('message',"Email Já Cadastrado!");
         expect({error:true}).toHaveProperty('error',true);
    });
})


// ----------- Atualizar usuario ---------

describe("Atualizar usuario", () => {
    it('Atualização dos dados de um usuario valido', async () => {
        const id= 1;
        const updatedData = {
            nome: "usuario Atualizado",
            email: "vitorgabriel123@gmail.com",
            senha: "Senhaa123@"
        }
        
        const response = await request(app)
            .patch(`/usuario/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(updatedData);
        
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toContain('json');
        expect(response.body.message).toMatch("Usuario atualizado com sucesso!!!");
        expect(response.body.data).toHaveProperty('nome', updatedData.nome);
        expect(response.body.data).toHaveProperty('email', updatedData.email);
        expect({error:false}).toHaveProperty('error',false);
        })

        it('Deve retornar erro ao atualizar um usuario com a senha com os parametros errados', async () => {
            const id= 1;    
            const response = await request(app)
                .patch(`/usuario/${id}`)
                    .set("Authorization", `Bearer ${token}`)
                    .set("Content-Type", "application/json")
                    .send({
                        nome: "usuario Atualizado 2.0",
                        email: "vitorgabriel12@gmail.com",
                        senha: "Senhaa123"
                    });
        
                expect(response.status).toBe(400);
                expect({message:"A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo."}).toHaveProperty('message',"A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo.");
                expect({error:true}).toHaveProperty('error',true);     
                 
            });
        
            it('Deve retornar erro ao atualizar um usuario com o email repetido', async () => {
                const id= 1;
                const response = await request(app)
                    .patch(`/usuario/${id}`)
                    .set("Authorization", `Bearer ${token}`)
                    .set("Content-Type", "application/json")
                    .send({
                        nome: "usuario Atualizado 2.0",
                        email: "vitorgabriel1@gmail.com",
                        senha: "Senhaa123@"
                    });
        
                expect(response.status).toBe(400);
                expect({message:"Email Já Cadastrado!"}).toHaveProperty('message',"Email Já Cadastrado!");
                 expect({error:true}).toHaveProperty('error',true);
            });

});


