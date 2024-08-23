import { describe, expect, test } from '@jest/globals';
import usuarioService from '../../services/usuarioService.js';
import usuarioRepository from '../../repositories/usuarioRepository.js';

jest.mock('../../repositories/usuarioRepository.js', () => ({
    findMany: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
}));

describe('Service de Usuários', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Deve listar os usuários', async () => {
        // Arrange
        const mockUsuario = [
            { id: 1, nome: 'Lucas Fernandes', email: 'lucas@example.com'},
            { id: 2, nome: 'Joao Gabriel', email: 'joao@example.com'},
        ];
        
        usuarioRepository.findMany.mockResolvedValue(mockUsuario);

        // Act
        const usuarios = await usuarioService.listar({});

        // Assert
        expect(usuarios).toEqual(mockUsuario);
        expect(usuarioRepository.findMany).toHaveBeenCalledWith({});
    });
    test('Deve listar usuário por id', async () => {
        // Arrange
        const mockUser = { id: 1, nome: 'Lucas Fernandes ', email:'lucas@example.com'};
        usuarioRepository.findById.mockResolvedValue(mockUser);
        // Act
        const usuarios = await usuarioService.listarPorID(1);
        // Assert
        expect(usuarios).toEqual(mockUser);
    });
    
    test('Deve deletar o usuario', async () => { 
      const mockUsers = { id: 1, nome: 'Lucas Fernandes ', email:'lucas@example.com'};
      usuarioRepository.delete.mockResolvedValue(mockUsers);
      const user = await usuarioService.deletar(1);
      expect(user).toEqual(mockUsers);
    });
});
