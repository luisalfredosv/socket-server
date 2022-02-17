import { User } from "./user";

export class UserList {
	private list: User[] = [];

	constructor() {}

	public add(user: User) {
		this.list.push(user);
		return user;
	}

	public updateUser(id: string, name: string) {
		for (let user of this.list) {
			if (user.id === id) {
				user.name = name;
				break;
			}
		}
	}

	public getUsersList() {
		return this.list.filter((user) => user.name !== "not-name");
	}

	public getUser(id: string) {
		return this.list.find((user) => user.id === id);
	}

	public getUserBySale(sala: string) {
		return this.list.filter((user) => user.sala === sala);
	}

	public deleteUser(id: string) {
		const tempUser = this.getUser(id);
		this.list = this.list.filter((user) => user.id !== tempUser?.id);
		return tempUser;
	}
}
