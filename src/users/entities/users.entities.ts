import { Profiles } from "src/profiles/entities/profiles.entities";

export class Users {
	id: string;
	name: string;
	email: string;
	cpf?: string;
	password?: string;
	isAdmin?: boolean;
	profile?: Profiles[];
	createdAt: Date;
	updatedAt: Date;
}
