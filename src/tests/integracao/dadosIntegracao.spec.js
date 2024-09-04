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
            // Mock do repositório para simular múltiplos dados de retorno
            const mockDados = [
                { temperature: '25', humidity: 80, rainfall: 10, wind_speed_kmh: 20, data_hora: `${new Date()}` },
                { temperature: '25', humidity: 75, rainfall: 5, wind_speed_kmh: 15, data_hora: `${new Date()}` },
                { temperature: '25', humidity: 85, rainfall: 12, wind_speed_kmh: 25, data_hora: `${new Date()}` },
            ];
            DadosRepository.findMany.mockResolvedValue(mockDados);
        
            await request(app)
                .get('/dados')
                .query({ temperature: '25' })
                .expect(200)
                .then((res) => {
                    expect(res.body.error).toBe(false);
                    expect(res.body.data).toEqual(mockDados);
                    expect(res.body.message).toEqual('Dados climáticos encontrados com sucesso.');
                });
        
            expect(DadosRepository.findMany).toHaveBeenCalledWith({ temperature: '25' });
        });
        
        it('Deve retornar: "Dado climático encontrado com sucesso."', async () => {
            // mensagem no singular
            const mockDados = [
                { temperature: '25', humidity: 80, rainfall: 10, wind_speed_kmh: 20, data_hora: `${new Date()}` },
            ];
            DadosRepository.findMany.mockResolvedValue(mockDados);
        
            await request(app)
                .get('/dados')
                .query({ temperature: '25' })
                .then((res) => {
                    expect(res.body.message).toEqual('Dado climático encontrado com sucesso.');
                });
        });

        it('Deve retornar erro 500 ao listar dados climáticos', async () => {
            // Simula uma falha ao buscar os dados
            DadosRepository.findMany.mockRejectedValue(new Error('Erro ao buscar dados'));
        
            await request(app)
                .get('/dados')
                .query({ temperature: '25' })
                .expect(500)
                .then((res) => {
                    expect(res.status).toBe(500);
                });
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


        it('Deve filtrar dados climáticos usando humidity, rainfall, wind_speed_kmh e data_hora', async () => {
        const mockDados = [
            { temperature: '25', humidity: 80, rainfall: 10, wind_speed_kmh: 20, data_hora: `${new Date()}` },
        ];
        DadosRepository.findMany.mockResolvedValue(mockDados);

        await request(app)
            .get('/dados')
            .query({
                temperature: '25',
                humidity: '80',
                rainfall: '10',
                wind_speed_kmh: '20',
                data_hora: `${new Date()}`
            })
            .expect(200)
            .then((res) => {
                expect(res.body.error).toBe(false);
                expect(res.body.data).toEqual(mockDados);
            });

        expect(DadosRepository.findMany).toHaveBeenCalledWith(expect.objectContaining({
            temperature: '25',
            humidity: 80, // Deve ser convertido para int
            rainfall: 10, // Deve ser convertido para int
            wind_speed_kmh: 20, // Deve ser convertido para int
            data_hora: expect.any(Date) // Deve ser convertido para Date
        }));
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

        it('Deve retornar erro 500', async () => {
            const invalidData = {
                temperature: '25', 
                humidity: 80,
                rainfall: 10,
                wind_speed_kmh: 20 
            };
        
            // Mock para simular um erro no serviço
            DadosRepository.create.mockRejectedValue(new Error('Erro interno no servidor'));

            await request(app)
                .post('/dados')
                .send(invalidData)
                .expect(500)
                .then((res) => {
                    expect(res.status).toBe(500);
                    expect(res.error.message).toBe('cannot POST /dados (500)');
                });
        });
        
        
    });
});
