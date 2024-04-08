import express, { json } from "express";
import routes from "./routes/index.js";
import { prisma } from "./configs/prismaClient.js";
import cors from "cors"; // permite o fornt-end usar essa api (resumindo)

const app = express();

app.use(cors());
// app.use(cors([
//   { origin: ['http://edurondon.tplinkdns.com:3030', 'http://edurondon.tplinkdns.com:3031', 'http://localhost:3030', 'http://localhost:3031'] },
//   { methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'] }
// ])); //  Mude apenas isso: origin: ['http://www.section.io', 'http://www.google.com/']

app.use(express.json());
routes(app);

export default app;