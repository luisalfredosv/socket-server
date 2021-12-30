import express, { Application } from "express";
import { SERVER_PORT } from "../global/environment";

export default class Server {
	public app: Application;
	public port: number;

	constructor() {
		this.app = express();
		this.port = SERVER_PORT;
	}

	start(callback: Function) {
		this.app.listen(this.port, callback());
	}
}
