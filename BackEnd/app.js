import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger.js";


import authRoute from "./src/routes/authRoute.js";
import usuarioRoute from "./src/routes/usuarioRoute.js";
import professorRoute from "./src/routes/professorRoute.js";
import disciplinaRoute from "./src/routes/disciplinaRoute.js";
import turmaRoute from "./src/routes/turmaRoute.js";
import alunoRoute from "./src/routes/alunoRoute.js";
import notaRoute from "./src/routes/notaRoute.js";

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://sistema-de-escola.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "ngrok-skip-browser-warning"
  ]
}));

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Api funcionando" });
});

app.get("/teste", (req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/auth", authRoute);
app.use("/usuarios", usuarioRoute);
app.use("/professores", professorRoute);
app.use("/disciplinas", disciplinaRoute);
app.use("/turmas", turmaRoute);
app.use("/alunos", alunoRoute);
app.use("/notas", notaRoute);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;