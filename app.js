import express from "express";
import cors from "cors";
import route from "./routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(route);

app.listen(process.env.PORT, () =>
	console.log("Server running and listening on port " + process.env.PORT + "!")
);
