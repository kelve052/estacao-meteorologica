import {describe, expect, test} from '@jest/globals';
import estacaoService from '../../services/estacaoService.js';
import estacaoRepository from '../../repositories/estacaoRepository.js';

jest.mock('../../repositories/estacaoRepository.js', () => ({
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
}));



describe('Service de estações', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.skip('Deve listar as estações', async () => {
        // Arrange
        const mockEstacoes = [
            { id: 1, nome: 'Estação Central', endereco: 'Rua 1, Centro', longitude: -23.5505, latitude: -46.6333, ip: '192.168.0.1', status: 'ativo', usuario_id: 1 },
            { id: 2, nome: 'Estação Norte', endereco: 'Rua 2, Norte', longitude: -23.5510, latitude: -46.6340, ip: '192.168.0.2', status: 'ativo', usuario_id: 2 },
        ];

        estacaoRepository.findMany.mockResolvedValue(mockEstacoes);

      // Act
        const estacoes = await estacaoService.listar({});

        // Assert

        expect(estacoes).toEqual(mockEstacoes);
        expect(estacaoRepository.findMany).toHaveBeenCalledWith({});
    });

    test('Deve criar uma nova estação', async () => {
        // Arrange
        const mockEstacao = {
            "nome": "Estação Onze",
            "endereco": "Rua 11",
            "latitude": -45.535,
            "longitude": -25.658,
            "ip": "192.168.0.11",
            "status": "ativo",
            "usuario_id": 3
        };
        estacaoRepository.create.mockResolvedValue({data: mockEstacao});

        // Act
        const estacao = await estacaoService.inserir(mockEstacao);

        // Assert
        expect(estacao).toEqual(mockEstacao);
        expect(estacaoRepository.create).toHaveBeenCalledWith(mockEstacao);
    });

    test.skip('Deve atualizar uma estação', async () => {
        // Arrange
        const mockEstacao = {
            id: 11,
            nome: "Estação Onze",
            endereco: "Rua 11",
            latitude: -45.535,
            longitude: -25.658,
            ip: "192.168.0.11",
            status: "ativo",
            usuario_id: 3
        };
        const mockExistingEstacao = {
            id: 11,
            nome: "Estação Doze",
            endereco: "Rua 12",
            latitude: -45.125,
            longitude: -25.612,
            ip: "192.168.0.12",
            status: "ativo",
            usuario_id: 3
        };
        estacaoRepository.findMany.mockResolvedValue(mockExistingEstacao);
        estacaoRepository.update.mockResolvedValue(mockEstacao);

        // Act
        const updatedEstacao = await estacaoService.atualizar({ id:1, data: mockEstacao});

        console.log(updatedEstacao)

        // Assert
        expect(updatedEstacao).toEqual(mockEstacao);
        expect(estacaoRepository.findMany).toHaveBeenCalledWith(1);
        expect(estacaoRepository.update).toHaveBeenCalledWith(1, mockEstacao);
    });
});
