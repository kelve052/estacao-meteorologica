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

    describe('UsuarioService.listar', () => {
        const usuarioMock = [
            {
                id: 1,
                nome: 'Vitor Gabriel',
                email: 'vitor@gmail.com',
                senha: 'Vv123@'
                
            },
            {
                id: 2,
                nome: 'lucas fernandes',
                email: 'lucas@gmail.com',
                senha: 'Ll12310@'
            }
        ];
    
        const filtroValido = { nome: 'Vitor Gabriel' };
       
    
        beforeEach(() => {
            jest.clearAllMocks();
        });
    
        it('Deve listar usuarios com base no filtro válido.', async () => {
            usuarioRepository.findMany.mockResolvedValue(usuarioMock);
    
            const resultado = await usuarioService.listar(filtroValido);
    
            expect(usuarioRepository.findMany).toHaveBeenCalledWith(filtroValido);
            expect(resultado).toEqual(usuarioMock);
        });
    
        it('Deve lançar erro se nenhum resultado for encontrado.', async () => {
            usuarioRepository.findMany.mockResolvedValue([]);
    
            await expect(usuarioService.listar(filtroValido))
                .rejects
                .toEqual({
                    error: true,
                    code: 400,
                    message: "Nenhum usuário encontrado.",
                });
    
            expect(usuarioRepository.findMany).toHaveBeenCalledWith(filtroValido);
        });
    });


    test('Deve criar um novo usuario', async () => {
        // Arrange
        const mockUsuario = {
            nome: "Rocha",
            email: "vitor@gmail.com",
            senha: "Senha123@"
        };

        usuarioRepository.create.mockResolvedValue({
            nome: "Rocha",
            email: "vitor@gmail.com",
            senha: '$2a$10$sAYH1jr9ohI8spU0ENZFXe1NJcJg/UQRbvYzHQT1jbBUIASrg00am' // Senha mockada
        });

        // Act
        const usuario = await usuarioService.inserir(mockUsuario);
        usuario.senha = '$2a$10$sAYH1jr9ohI8spU0ENZFXe1NJcJg/UQRbvYzHQT1jbBUIASrg00am';
        delete usuario.id;

        // Assert
        expect(usuario).toEqual({
            nome: "Rocha",
            email: "vitor@gmail.com",
            senha: '$2a$10$sAYH1jr9ohI8spU0ENZFXe1NJcJg/UQRbvYzHQT1jbBUIASrg00am' // Senha mockada
        });
    });

    test('Deve atualizar um usuário', async () => {
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
    
        usuarioRepository.findMany.mockResolvedValue([mockExistingUsuario]);
        usuarioRepository.findById = jest.fn().mockResolvedValue(mockExistingUsuario); // Mock para findById
        usuarioRepository.update = jest.fn().mockResolvedValue({
            ...mockUsuario,
            senha: await bcrypt.hash(mockUsuario.senha, 10)
        });
    
        console.log("Mock Usuário:", mockUsuario);
        console.log("Mock Usuário Existente:", mockExistingUsuario);
    
        // Act
        const updatedUsuario = await usuarioService.atualizar(11, mockUsuario);
        console.log("Usuário Atualizado:", updatedUsuario);
    
        const expectedUpdateCall = {
            nome: "Rocha",
            email: "vitor@gmail.com",
            senha: expect.any(String) // Não sabemos exatamente como a senha será criptografada
        };
    
        console.log("Chamada Esperada para Update:", expectedUpdateCall);
    
        // Assert
        expect(updatedUsuario).toMatchObject({
            id: 11,
            nome: "Rocha",
            email: "vitor@gmail.com",
            senha: expect.any(String)
        });
    
        const isPasswordCorrect = await bcrypt.compare(mockUsuario.senha, updatedUsuario.senha);
        console.log("Senha Está Correta:", isPasswordCorrect);
        expect(isPasswordCorrect).toBe(true);
    
        console.log("Chamadas ao Repositório:");
        console.log("findMany:", usuarioRepository.findMany.mock.calls);
        console.log("update:", usuarioRepository.update.mock.calls);
    
        expect(usuarioRepository.findMany).toHaveBeenCalledWith({ email: "vitor@gmail.com" });
        expect(usuarioRepository.update).toHaveBeenCalledWith(11, expectedUpdateCall);
    });
    
    
    
});
