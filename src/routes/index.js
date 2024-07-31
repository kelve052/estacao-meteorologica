import express from "express";
//import exemplo from "./exemploRouter.js";
import estacoes from "./estacaoRouter.js"
import autenticacao from "./autenticacaoRouter.js";
import usuarios from "./usuarioRouter.js";



const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).json({ Message: "Bem vindo ao projeto estação meteorológica!" })
    })

    app.use(
        express.json(),
        estacoes,
        autenticacao,
        usuarios
        // rota apenas para teste
        //demais rotas a serem criadas
    )
}

export default routes;