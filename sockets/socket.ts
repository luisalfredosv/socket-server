import { Socket, Server } from "socket.io";

export const disconnect = (cliente: Socket) => {
	cliente.on("disconnect", () => {
		console.log("Cliente desconectado");
	});
};


export const message = (cliente: Socket, io: Server) => {
    cliente.on('MESSAGE', (payload: {
        from:string, body:string
    })=> {
        console.log('Received message', payload);
        io.emit('NEW_MESSAGE', payload)
    })
}
