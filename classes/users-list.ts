import { User } from "./user";

export class UserList {
	private list: User[] = [];

	constructor() {}

	public add(user: User) {
		this.list.push(user);
		console.log("[list] ", JSON.stringify(this.list, null, 2));

		return user;
	}

	public updateUser(id: string, name: string) {
		for (let user of this.list) {
			if (user.id === id) {
				user.name = name;
				break;
			}
		}

        console.log('[updated] ', this.list);

	}

	public getUsersList() {
		return this.list;
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

		console.log("[delete] ", this.list);

		return tempUser;
	}
}
