import Server from "./classes/server";
const server = Server.instance;

server.start(() => {
	console.log(`Server started on port ${server.port}`);
});
