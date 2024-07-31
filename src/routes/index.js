import express from "express";
//import exemplo from "./exemploRouter.js";
import estacoes from "./estacaoRouter.js"
import usuarioRouter from "./usuarioRouter.js";
import autenticacao from "./autenticacaoRouter.js";


const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).json({Message: "Bem vindo ao projeto estação meteorológica!"})
    })

    app.use(    
        express.json(),
        estacoes,
        autenticacao,
        usuarioRouter
        // rota apenas para teste
        //demais rotas a serem criadas
    )
}

export default routes;