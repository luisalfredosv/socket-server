import { Router, Request, Response } from "express";
import { usersListConnected } from "../sockets/socket";

import Server from "../classes/server";


export const router = Router();

router.get("/mensajes", (req: Request, res: Response) => {
	res.json({
		ok: true,
		mensaje: "Todo esta bien",
	});
});

router.post("/mensajes", ({ body }: Request, res: Response) => {
	const payload = {
		from: "Lsa",
		message: "Hola wawa que pasa po",
	};

	const server = Server.instance;
	server.io.emit("NEW_MESSAGE", payload);

	res.json({
		ok: true,
		mensaje: body.text,
	});
});

router.get("/mensajes/:id", ({ body, params }: Request, res: Response) => {
	const payload = {
		from: "Juan",
		message: "Hola wawa que pasa po",
	};

	const server = Server.instance;
	server.io.in(params?.id).emit("DIRECT_MESSAGES", payload);

	res.json({
		ok: true,
		id: params?.id,
	});
});

router.get("/usuarios", async (req: Request, res: Response) => {
	const server = Server.instance;
	let ok = true;
	let socketIds: string[] = [];

	const socks = await server.io
		.fetchSockets()

    for await (const client of socks) {
        socketIds.push(client.id.toString());
    }

	return res.json({
		ok,
		clients: socketIds,
	});
});

router.get("/usuarios/details", async (req: Request, res: Response) => {

    const listUser = usersListConnected.getUsersList()

	return res.json({
        ok: true,
        listUser
	});
});

