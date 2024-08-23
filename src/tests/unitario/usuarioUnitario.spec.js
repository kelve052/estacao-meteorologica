import { describe, expect, test } from '@jest/globals';
import bcrypt from 'bcryptjs'
import usuarioService from '../../services/usuarioService.js';
import usuarioRepository from '../../repositories/usuarioRepository.js';

jest.mock('../../repositories/usuarioRepository.js', () => ({
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
}));

jest.mock('bcryptjs', () => ({
    hash: jest.fn().mockResolvedValue('$2a$10$sAYH1jr9ohI8spU0ENZFXe1NJcJg/UQRbvYzHQT1jbBUIASrg00am') // Senha mockada
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
            senha: "Senha123@"
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
            senha: "Senha123@"
        };
        const mockExistingUsuario = {
            id: 11,
            nome: "Vitor Rocha",
            email: "vitor@gmail.com",
            senha: "Senha123@"
        };
    
        const hashedSenha = await bcrypt.hash(mockUsuario.senha, 10);
    
        usuarioRepository.findMany.mockResolvedValue([mockExistingUsuario]);
        usuarioRepository.update.mockResolvedValue({
            ...mockUsuario,
            senha: hashedSenha
        });
    
        // Act
        const updatedUsuario = await usuarioService.atualizar(11, mockUsuario);
        const expectedUpdateCall = {
            nome: "Rocha",
            email: "vitor@gmail.com",
            senha: hashedSenha // Senha criptografada gerada dinamicamente
        };
    
        // Assert
        // Comparando a estrutura básica do objeto sem a senha
        expect(updatedUsuario).toMatchObject({
            id: 11,
            nome: "Rocha",
            email: "vitor@gmail.com",
            senha: expect.any(String) // Verifica que é uma string, sem comparar o valor exato
        });
    
        // Comparando a senha específica para garantir que seja a esperada
        expect(updatedUsuario.senha).toBe(hashedSenha);
    
        // Verificando chamadas no repositório
        expect(usuarioRepository.findMany).toHaveBeenCalledWith({ email: "vitor@gmail.com" });
        expect(usuarioRepository.update).toHaveBeenCalledWith(11, expectedUpdateCall);
    });
});
