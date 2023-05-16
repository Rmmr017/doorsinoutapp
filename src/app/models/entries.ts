import { Door } from "./door";
import { Guest } from "./guest";

export class Entry {
	id: string;

	guestid: string;

	doorid: string;

	created: Date;

	door: Door;
	
	guest: Guest;

	constructor(door: Door, guest: Guest, created: Date) {
		this.id = ''
		this.guestid = ''
		this.doorid = ''
		this.created = new Date(created)
		this.door = door
		this.guest = guest
	}
}
