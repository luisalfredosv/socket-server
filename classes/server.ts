import express, { Application } from "express";

import { SERVER_PORT } from "../global/environment";

import { Server as SocketServer } from "socket.io";
import { createServer, Server as HttpServer } from "http";

import * as socket from "../sockets/socket";
import cors, { CorsOptions } from "cors";
import { router } from "../routes/router";

export default class Server {
	private static _instance: Server;

	public app: Application;
	public port: number;

	public io: SocketServer;
	private httpServer: HttpServer;

	private constructor() {
		this.app = express();
		this.port = SERVER_PORT;

		this.setMiddleware();
		this.httpServer = createServer(this.app);
		this.io = new SocketServer(this.httpServer, {
			cors: {
				origin: "*",
			},
		});
		this.setRoutes();
		this.listenSockets();
	}

	private setMiddleware() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		const restCors: CorsOptions = {
			origin: "*",
		};
		this.app.use(cors(restCors));
	}

	private setRoutes() {
		this.app.use("/", router);
	}

	public static get instance() {
		return this._instance || (this._instance = new this());
	}

	private listenSockets() {

		this.io.on("connection", (client) => {

			// Connected Client
			socket.connectedClient(client);

			// Config User
			socket.configUser(client, this.io);

			// Get Users Active
			socket.getUsersActive(client, this.io);

			// Disconnect
			socket.disconnect(client, this.io);

			// Message
			socket.message(client, this.io);


		});
	}

	start(callback: Function) {
		this.httpServer.listen(this.port, callback());
	}
}
