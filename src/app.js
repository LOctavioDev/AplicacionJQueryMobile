import express from "express";
import morgan from "morgan";
import ejs from "ejs";
import { config } from "dotenv";
import methodOverride from 'method-override'; // Importa method-override

config();

const app = express();

// Settings
app.set("view engine", "ejs");

// Middlewares
app.use(methodOverride('_method')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Rutas
import productsRouter from "./routes/tasks.routes.js";
app.use(productsRouter);

export default app;
