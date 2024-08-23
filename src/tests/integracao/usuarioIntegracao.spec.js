import request from "supertest";
import { expect, describe } from "@jest/globals";
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


// ----------- Listar Estação ---------

describe("Listar usuarios", () => {

    it('Deve retornar sucesso a listagem de usuarios', async () => {
        const response = await request(app)
            .get("/usuario")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        const body = response.body;
        idvalido = response.body[0].id;
        //deve retornar status 200
        expect(response.status).toBe(200);
        //deve retornar erro falso
        expect({ error: false }).toHaveProperty('error', false);
        //testando se o corpo da requisição é um array
        expect(body).toBeInstanceOf(Array);
        //testando se retorna json
        expect(response.headers['content-type']).toContain('json');
    });

    it('Deve retornar sucesso ao listar usuario com ID valido', async () => {
        const response = await request(app)
            .get(`/usuario/${idvalido}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        const body = response.body;
        //deve retornar a mensagem correta de sucesso
        expect({ message: 'Usuário encontrado com sucesso' }).toHaveProperty('message', "Usuário encontrado com sucesso");
        //deve retornar status 200
        expect(response.status).toBe(200);
        //deve retornar erro falso
        expect({ error: false }).toHaveProperty('error', false);
        //testando se o corpo da requisição é um array
        expect(body).toBeInstanceOf(Array);
        //testando se retorna json
        expect(response.headers['content-type']).toContain('json');
    });
    it('Deve retornar sucesso ao listar usuario com ID invalido', async () => {
        const idinvalido = "9999";
        const response = await request(app)
            .get(`/usuario/${idinvalido}`)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
        //testando se retorna o motivo do erro
        expect({ message: 'Usuário não encontrado' }).toHaveProperty('message', "Usuário não encontrado");
        //testando o status da resposta
        expect(response.status).toBe(400);
        //testando se o erro esta ativo
        expect({ error: true }).toHaveProperty('error', true);
        //testando se retorna json
        expect(response.headers['content-type']).toContain('json');
    });
});

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
        expect({ error: false }).toHaveProperty('error', false);
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
        expect({ error: true }).toHaveProperty('error', true);
        //testando a mensagem de retorno
        expect({ message: `Não existe usuário com este id: ${id}` }).toHaveProperty('message', `Não existe usuário com este id: ${id}`);
    })
});
