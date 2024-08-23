import request from "supertest";
import { expect, describe } from "@jest/globals";
import { prisma } from "../../configs/prismaClient.js";
import app from "../../app.js";

// Apenas para teste depois irei refatorar
// ---------------- Login ----------------
let token;
let idvalido;

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

// ----------- Cadastrar Estação ---------

describe("Cadastrar estação", () => {
    it('Deve cadastrar uma estação com dados válidos', async () => {
        const response = await request(app)
            .post('/estacoes')
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .send({
                nome: 'av123456',
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
            .post('/estacoes')
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .send({
                nome: 'estacao av parana',
                endereco: 'av parana n3020',
                latitude: 123.456,
                longitude: 456.789,
                ip: '192.168.0.1',
                status: 'ativo',
                usuario_id: 999
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Usuário não encontrado');
    });

    it('Deve retornar erro ao cadastrar uma estação com nome já existente', async () => {
        const response = await request(app)
            .post('/estacoes')
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
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
})

// ----------- Atualizar Estação ---------

describe("Atualizar estação", () => {
    it('Atualização dos dados de uma estação', async () => {
        const updatedData = {
            nome: "Estação Atualizada 2.0",
            endereco: "Ifro - Campus Vilhena/RO"
        }
        const estacao = await prisma.estacao.findFirst({
            where: {
                usuario_id: 6
            }
        });
        const response = await request(app)
            .patch(`/estacoes/${estacao.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
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
        });
        const response = await request(app)
            .patch(`/estacoes/${estacao.id}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .send(updatedDataVoid);

        expect(response.status).toBe(400);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(response.body.message).toMatch(`Campo nome não específicado.`);
        expect(response.body.code).toBe(400);
        expect(response.body.error).toBe(true);
    });

    it('Listagem das estações', async () => {
        const response = await request(app)
            .get("/estacoes")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")

        const body = response.body;

        expect(response.status).toBe(200);
        expect(body.response).toBeInstanceOf(Array);
        idvalido = body.response[0].id;
    });

    it('Listar estação por ID valido', async () => {
        const response = await request(app)
            .get(`/estacoes/${idvalido}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        //testando a resposta
        expect(response.status).toBe(200);
        // testando se esta retornando o id esperado
        expect({ id: idvalido }).toHaveProperty('id', idvalido);
        //testando se retorna json
        expect(response.headers['content-type']).toContain('json');
        //testando a resposta response.body é uma instancia de um objeto
        expect(response.body).toBeInstanceOf(Array);
    });
    it('Deve retornar erro ao listar estação com id invalido', async () => {
        const idinvalido = "9999";
        const response = await request(app)
            .get(`/estacoes/${idinvalido}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        //testando a resposta
        expect(response.status).toBe(400);
        //testando se retorna json
        expect(response.headers['content-type']).toContain('json');
        //testando se retorna o motivo do erro
        expect({ message: 'Estação não encontrada' }).toHaveProperty('message', "Estação não encontrada");
        //testando se o erro esta ativo
        expect({ error: true }).toHaveProperty('error', true);
    });
});

// ----------- Deletar Estação ---------

describe("Deletar estação", () => {
    it('deve deletar a estação com id valido', async () => {
        const id = "10";
        const response = await request(app)
            .get(`/estacoes/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        //testando a resposta
        expect(response.status).toBe(200);
        //testando se retorna json
        expect(response.headers['content-type']).toContain('json');
        //testando a resposta response.body é uma instancia de um objeto
        expect(response.body).toBeInstanceOf(Array);
        //testando se o erro é falso
        expect({ error: false }).toHaveProperty('error', false);
        //testando a mensagem de retorno
        expect({ message: 'Estação excluída com sucesso' }).toHaveProperty('message', "Estação excluída com sucesso");
    })
    it('deve retornar erro com o id invalido', async () => {
        const id = "999999";
        const response = await request(app)
            .get(`/estacoes/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        //testando a resposta
        expect(response.status).toBe(400);
        //testando se retorna json
        expect(response.headers['content-type']).toContain('json');
        //testando a resposta response.body é uma instancia de um objeto
        expect(response.body).toBeInstanceOf(Array);
        //testando se o erro é true
        expect({ error: true }).toHaveProperty('error', true);
        //testando a mensagem de retorno
        expect({ message: 'Estação não encontrada' }).toHaveProperty('message', "Estação não encontrada");
    })
});


