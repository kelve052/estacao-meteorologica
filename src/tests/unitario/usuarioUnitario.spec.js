import usuarioService from '../../services/usuarioService.js';
    import usuarioRepository from '../../repositories/usuarioRepository.js';
    import {criarHashSenha} from '../../util/hashSenha.js';
    
    // Mock do módulo hashSenha
    jest.mock('../../util/hashSenha.js', () => ({
        criarHashSenha: jest.fn().mockResolvedValue('$2a$10$TOMaCwAkwlj1VajxHNGHR.UBCCqne4cgMWem6rL4W/XDE66xQCikW')
    }));
    
    jest.mock('../../repositories/usuarioRepository.js', () => ({
        findMany: jest.fn(),
        update: jest.fn()
    }));
    
    describe('Service de usuarios', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });


    // test('Deve criar um novo usuario', async () => {
    //     // Arrangeimport Hashsenha from '../../utils/hashSenha.js';
    //     const mockUsuario = {
    //         nome: "Vitor Rocha",
    //         email: "vitorgabrievgh649@gmail.com",
    //         senha: "Vv@123321"
    //     };
    
    //     // Mock da função findMany retornando um array vazio
    //     usuarioRepository.findMany.mockResolvedValue([]);
    
    //     // Mock da função create retornando o usuário mockado, mas com a senha hashada
    //     usuarioRepository.create.mockResolvedValue({
    //         ...mockUsuario,
    //         senha: '$2a$10$TOMaCwAkwlj1VajxHNGHR.UBCCqne4cgMWem6rL4W/XDE66xQCikW' // Simulando a senha hashada
    //     });
    
    //     // Act
    //     const resultado = await usuarioService.inserir(mockUsuario);
    
    //     // Assert
    //     expect(resultado).toEqual({
    //         nome: "Vitor Rocha",
    //         email: "vitorgabrievgh649@gmail.com",
    //         senha: expect.any(String)  // A senha deve ser uma string hashada
    //     });
    
    //     expect(usuarioRepository.create).toHaveBeenCalledWith({
    //         nome: "Vitor Rocha",
    //         email: "vitorgabrievgh649@gmail.com",
    //         senha: expect.any(String)  // A senha será qualquer string hashada
    //     });
    
    //     expect(usuarioRepository.findMany).toHaveBeenCalledWith({ email: mockUsuario.email });
    // });
    
    
    
    
        // test('Deve atualizar um usuario existente', async () => {
        //     // Arrange
        //     const mockUsuario = {
        //         id: 1,
        //         nome: "Vitor Rocha",
        //         email: "vitorgabrievgh65559@gmail.com",
        //         senha: "Vv@123321"
        //     };
    
        //     // Mock da função findMany retornando o usuário existente
        //     usuarioRepository.findMany.mockResolvedValue([mockUsuario]);
    
        //     // Mock da função update retornando o usuário atualizado, com senha hashada
        //     usuarioRepository.update.mockResolvedValue({
        //         ...mockUsuario,
        //         nome: "Vitor Gabriel Rocha",
        //         senha: '$2a$10$TOMaCwAkwlj1VajxHNGHR.UBCCqne4cgMWem6rL4W/XDE66xQCikW' // Simulando a senha hashada
        //     });
    
        //     // Act
        //     const resultado = await usuarioService.atualizar(mockUsuario.id, {
        //         nome: "Vitor Gabriel Rocha",
        //         senha: "NovaSenha@123"
        //     });
    
        //     // Assert
        //     expect(resultado).toEqual({
        //         id: mockUsuario.id,
        //         nome: "Vitor Gabriel Rocha",
        //         email: "vitorgabrievgh649@gmail.com",
        //         senha: expect.any(String)  // A senha deve ser uma string hashada
        //     });
    
        //     expect(usuarioRepository.update).toHaveBeenCalledWith(mockUsuario.id, {
        //         nome: "Vitor Gabriel Rocha",
        //         senha: expect.any(String)  // A senha será qualquer string hashada
        //     });
    
        //     expect(usuarioRepository.findMany).toHaveBeenCalledWith({ id: mockUsuario.id });
        // });
    });