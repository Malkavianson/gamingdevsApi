import { Profiles } from "src/profiles/entities/profiles.entities";

export class Users {
	id: string;
	name: string;
	email: string;
	cpf: string;
	password?: string;
	isAdmin?: boolean;
	profiles?: Profiles[];
	createdAt: Date;
	updatedAt: Date;
}
