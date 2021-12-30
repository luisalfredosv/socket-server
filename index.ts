import Server from "./classes/server";
import { router } from "./routes/router";
import express from "express";
import cors from "cors";

const server = new Server();

server.app.use(express.json());
server.app.use(express.urlencoded({ extended: true }));

server.app.use(cors({
	origin: true,
	credentials: true
}))

server.app.use('/', router);

server.start(() => {
	console.log(`Server started on port ${server.port}`);
});
