import { expect, describe } from "@jest/globals";
import AutenticacaoServices from "../../services/autenticacaoSevices";


describe('teste na camada de  autenticacaoServices metodo: validarCampos()', ()=>{
  it('Deve retonar um obejeto com email e senha', async ()=>{
    const data = {
      email: "marcos@gmail.com",
      senha: "12345678Aa@"
    }
    const response = await AutenticacaoServices.validarCampos(data)
    expect(response).toEqual(data)
  })

  it('deve lançar erro "Email é obrigatório!" para email ausente', async ()=>{
    const data = {
      senha: "12345678Aa@"
    }
    expect(AutenticacaoServices.validarCampos(data)).rejects.toThrowError('Campo email é obrigatório!')
  })

  it('deve lançar erro "Senha é obrigatório!" para email ausente', async ()=>{
    const data = {
      email: "marcos@gmail.com",
    }
    expect(AutenticacaoServices.validarCampos(data)).rejects.toThrowError('Campo senha é obrigatório!')
  })

  it('deve retornar error: "Formato invalido, deve ser string!" para campo email', async ()=>{
    const data = {
      email: 4545,
    }
    expect(AutenticacaoServices.validarCampos(data)).rejects.toThrowError('Formato invalido, deve ser string!')
  })
  it('deve retornar error: "Formato invalido, deve ser string!" para campo senha', async ()=>{
    const data = {
      senha: 554554
    }
    expect(AutenticacaoServices.validarCampos(data)).rejects.toThrowError('Formato invalido, deve ser string!')
  })

  it('deve lançar erro "Email invalido!" para formato do email incorreto', async()=>{
    const data = {
      email: "marcoshhhh",
      senha: "12345678Aa@"
    }

    expect(AutenticacaoServices.validarCampos(data)).rejects.toThrowError('Email invalido!')

    
  })

  it('deve lançar erro "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo." para formato do email incorreto', async()=>{
    const data = {
      email: "marcos@gmail.com",
      senha: "1234567"
    }

    expect(AutenticacaoServices.validarCampos(data)).rejects.toThrowError('A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo.')
  })

  it('deve retornar error: "Email ou senha invalido"', async ()=>{
    const data = {
      email: "mariaRosaAlencarDeAlmeidaMariquinha@gmail.com", //campos que não corresponde a nenhum usuario
      senha: "12345678Aa@1215165165165fs1da1f651edf165e1f56"
    }
    const response = async ()=> await AutenticacaoServices.VerificarUsuario(data)
    expect(response).rejects.toThrow('Email ou senha invalido')
  })
})