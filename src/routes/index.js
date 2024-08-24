import express from "express";
import estacoes from "./estacaoRouter.js";
import autenticacao from "./autenticacaoRouter.js";
import usuarios from "./usuarioRouter.js";
import dados from "./dadosRouter.js";



const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).json({ Message: "Bem vindo ao projeto estação meteorológica!" })
    });
    app.use(
        express.json(),
        express.text(),
        estacoes,
        autenticacao,
        usuarios,
        dados
    );

    // Uso apenas quando a estação manda text plain;

    // app.use((req, res) => {
    //     const textPlainBody = req.body;
    //     const timestamp = new Date().toISOString();
    //     let ip = req.headers["x-forwarded-for"] ||
    //     req.socket.remoteAddress ||
    //     null;
    //     console.log(timestamp+" "+ip+" "+req.method+" "+req.protocol + "://" + req.get("host") + req.originalUrl);
    //     console.log("-----------------------------")
    //     console.log(textPlainBody);
    //     console.log("-----------------------------")
    //     console.log("")
    //     res.send("OK");
    // });
};

export default routes;