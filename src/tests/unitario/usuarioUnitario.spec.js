import { describe, expect, test } from '@jest/globals';
import usuarioService from '../../services/usuarioService.js';
import usuarioRepository from '../../repositories/usuarioRepository.js';

jest.mock('../../repositories/usuarioRepository.js', () => ({
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
}));



describe('Service de usuarios', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    
    test('Deve criar um novo usuario', async () => {
        // Arrange
        const mockUsuario = {
            nome: "Rocha",
            email: "vitor@gmail.com",
            senha: "Vv12345"
        };
        usuarioRepository.create.mockResolvedValue(mockUsuario);

        // Act
        const usuario = await usuarioService.inserir(mockUsuario);

        // Assert
        expect(usuario).toEqual(mockUsuario);
        //expect(usuarioRepository.create).toHaveBeenCalledWith(mockUsuario);
    });

    test('Deve atualizar um usuario', async () => {
        // Arrange
        const mockUsuario = {
            id: 11,
            nome: "Rocha",
            email: "vitor@gmail.com",
            senha: "Vv12345"
        };
        const mockExistingUsuario = {
            id: 11,
            nome: "Vitor Rocha",
            email: "vitor@gmail.com",
            senha: "Vv12345"
        };

        usuarioRepository.findMany.mockResolvedValue([mockExistingUsuario]);
        usuarioRepository.update.mockResolvedValue(mockUsuario);

        // Act
        const updatedUsuario = await usuarioService.atualizar(11, mockUsuario);
        const expectedUpdateCall = { ...mockUsuario };
        delete expectedUpdateCall.id;

        // Assert
        expect(updatedUsuario).toEqual(mockUsuario);
        expect(usuarioRepository.findMany).toHaveBeenCalledWith({id: 11});
        expect(usuarioRepository.update).toHaveBeenCalledWith(11, expectedUpdateCall);
    });
});
