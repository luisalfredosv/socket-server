import { Socket, Server } from "socket.io";
import { User } from "../classes/user";
import { UserList } from "../classes/users-list";

export const usersListConnected = new UserList();

export const connectedClient = ({ id }: Socket) => {
	const user = new User(id);
	usersListConnected.add(user);
};

export const disconnect = (client: Socket) => {
	client.on("disconnect", () => {
		usersListConnected.deleteUser(client.id);
	});
};

export const message = (client: Socket, io: Server) => {
	client.on("MESSAGE", (payload: { from: string; body: string }) => {
		io.emit("NEW_MESSAGE", payload);
	});
};

export const configUser = (client: Socket, io: Server) => {
	client.on(
		"CONFIG_USER",
		(
			{
				name,
			}: {
				name: string;
			},
			callback: Function
		) => {
			usersListConnected.updateUser(client.id, name);

			callback({
				ok: true,
				message: `User ${name}, configured`,
			});
		}
	);
};
