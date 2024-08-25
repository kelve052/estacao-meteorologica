import request from "supertest";
import { expect, describe } from "@jest/globals";
import { prisma } from "../../configs/prismaClient.js";
import app from "../../app.js";
import DadosRepository from '../../repositories/dadosRepository.js';

jest.mock('../../repositories/dadosRepository.js');

describe('Testes de integração para as rotas /dados', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /dados', () => {
        it('Deve retornar dados climáticos filtrados', async () => {
            // Mock do repositório para simular dados de retorno
            const mockDados = [
                { temperature: '25', humidity: 80, rainfall: 10, wind_speed_kmh: 20, data_hora: `${new Date()}` },
            ];
            DadosRepository.findMany.mockResolvedValue(mockDados);

            await request(app)
                .get('/dados')
                .query({ temperature: '25' })
                .expect(200)
                .then((res) => {
                    expect(res.body.error).toBe(false);
                    expect(res.body.data).toEqual(mockDados);
                });

            expect(DadosRepository.findMany).toHaveBeenCalledWith({ temperature: '25' });
        });

        it('Deve retornar erro 400 quando não encontrar dados climáticos', async () => {
            DadosRepository.findMany.mockResolvedValue([]);

            await request(app)
                .get('/dados')
                .query({ temperature: '25' })
                .expect(400)
                .then((res) => {
                    expect(res.body.error).toBe(true);
                    expect(res.body.message).toBe("Nenhum dado climático encontrado");
                });
        });
    });

    describe('POST /dados', () => {
        it('Deve inserir dados climáticos e retornar sucesso', async () => {
            const mockData = { 
                temperature: '25', 
                humidity: 80, 
                rainfall: 10, 
                wind_speed_kmh: 20, 
                data_hora: `${new Date()}`
            };
            DadosRepository.create.mockResolvedValue(mockData);

            await request(app)
                .post('/dados')
                .send({
                    temperature: '25',
                    humidity: 80,
                    rainfall: 10,
                    wind_speed_kmh: 20
                })
                .expect(201)
                .then((res) => {
                    expect(res.body.error).toBe(false);
                    expect(res.body.data).toEqual(mockData);
                });

            expect(DadosRepository.create).toHaveBeenCalledWith(expect.objectContaining({
                temperature: '25',
                humidity: 80,
                rainfall: 10,
                wind_speed_kmh: 20
            }));
        });

        it('Deve retornar erro 400 ao tentar inserir dados inválidos', async () => {
            const invalidData = {
                temperature: 25, // Deveria ser string
                humidity: '80',  // Deveria ser número
                rainfall: 10,
                wind_speed_kmh: '20' // Deveria ser número
            };

            await request(app)
                .post('/dados')
                .send(invalidData)
                .expect(400)
                .then((res) => {
                    expect(res.body.error).toBe(true);
                    expect(res.body.message).toEqual(expect.arrayContaining([
                        { path: 'temperature', message: "Temperatura informada não é do tipo string." },
                        { path: 'humidity', message: "Umidade informada não é do tipo int." },
                        { path: 'wind_speed_kmh', message: "Velocidade do vento informada não é do tipo int." },
                    ]));
                });
        });
    });
});
