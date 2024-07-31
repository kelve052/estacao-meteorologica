import { prisma } from '../src/configs/prismaClient.js'

async function seed() {
    const users = [
        { nome: 'Alice', idade: 25, email: 'alice@example.com', senha: 'senha123' },
        { nome: 'Bob', idade: 30, email: 'bob@example.com', senha: 'senha456' },
        { nome: 'Carol', idade: 22, email: 'carol@example.com', senha: 'senha789' },
        { nome: 'Dave', idade: 28, email: 'dave@example.com', senha: 'senha101' },
        { nome: 'Eve', idade: 35, email: 'eve@example.com', senha: 'senha112' },
        { nome: 'Frank', idade: 27, email: 'frank@example.com', senha: 'senha131' },
        { nome: 'Grace', idade: 26, email: 'grace@example.com', senha: 'senha145' },
        { nome: 'Hank', idade: 32, email: 'hank@example.com', senha: 'senha156' },
        { nome: 'Ivy', idade: 29, email: 'ivy@example.com', senha: 'senha167' },
        { nome: 'Jack', idade: 31, email: 'jack@example.com', senha: 'senha178' },
        { nome: 'Kate', idade: 33, email: 'kate@example.com', senha: 'senha189' },
        { nome: 'Leo', idade: 34, email: 'leo@example.com', senha: 'senha190' }
    ];

    await prisma.usuario.createMany({
        data: users,
        skipDuplicates: true, // This will skip the records if they already exist
    });

    const estacoes = [
        { nome: 'Estacao 1', endereco: 'Endereço 1', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.1', status: 'ativo', usuario_id: 1 },
        { nome: 'Estacao 2', endereco: 'Endereço 2', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.2', status: 'ativo', usuario_id: 1 },
        { nome: 'Estacao 3', endereco: 'Endereço 3', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.3', status: 'ativo', usuario_id: 2 },
        { nome: 'Estacao 4', endereco: 'Endereço 4', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.4', status: 'ativo', usuario_id: 2 },
        { nome: 'Estacao 5', endereco: 'Endereço 5', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.5', status: 'ativo', usuario_id: 3 },
        { nome: 'Estacao 6', endereco: 'Endereço 6', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.6', status: 'ativo', usuario_id: 3 },
        { nome: 'Estacao 7', endereco: 'Endereço 7', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.7', status: 'ativo', usuario_id: 4 },
        { nome: 'Estacao 8', endereco: 'Endereço 8', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.8', status: 'ativo', usuario_id: 4 },
        { nome: 'Estacao 9', endereco: 'Endereço 9', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.9', status: 'ativo', usuario_id: 5 },
        { nome: 'Estacao 10', endereco: 'Endereço 10', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.10', status: 'ativo', usuario_id: 5 },
        { nome: 'Estacao 11', endereco: 'Endereço 11', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.11', status: 'ativo', usuario_id: 6 },
        { nome: 'Estacao 12', endereco: 'Endereço 12', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.12', status: 'ativo', usuario_id: 6 },
        { nome: 'Estacao 13', endereco: 'Endereço 13', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.13', status: 'ativo', usuario_id: 7 },
        { nome: 'Estacao 14', endereco: 'Endereço 14', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.14', status: 'ativo', usuario_id: 7 },
        { nome: 'Estacao 15', endereco: 'Endereço 15', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.15', status: 'ativo', usuario_id: 8 },
        { nome: 'Estacao 16', endereco: 'Endereço 16', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.16', status: 'ativo', usuario_id: 8 },
        { nome: 'Estacao 17', endereco: 'Endereço 17', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.17', status: 'ativo', usuario_id: 9 },
        { nome: 'Estacao 18', endereco: 'Endereço 18', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.18', status: 'ativo', usuario_id: 9 },
        { nome: 'Estacao 19', endereco: 'Endereço 19', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.19', status: 'ativo', usuario_id: 10 },
        { nome: 'Estacao 20', endereco: 'Endereço 20', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.20', status: 'ativo', usuario_id: 10 },
        { nome: 'Estacao 21', endereco: 'Endereço 21', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.21', status: 'ativo', usuario_id: 11 },
        { nome: 'Estacao 22', endereco: 'Endereço 22', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.22', status: 'ativo', usuario_id: 11 },
        { nome: 'Estacao 23', endereco: 'Endereço 23', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.23', status: 'ativo', usuario_id: 12 },
        { nome: 'Estacao 24', endereco: 'Endereço 24', latitude: -23.55052, longitude: -46.633309, ip: '192.168.0.24', status: 'ativo', usuario_id: 12 },
    ];

    await prisma.estacao.createMany({
        data: estacoes,
        skipDuplicates: true, // This will skip the records if they already exist
    });

    console.log('Seed data created successfully.');
}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });