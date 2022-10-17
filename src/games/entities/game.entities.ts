import { Genre } from "src/genres/entities/genre.entity";

export class Game {
	id: string;
	title: string;
	image: string;
	description: string;
	year: string;
	score: string;
	trailer: string;
	gameplay: string;
	genres?: Genre[];
	createdAt?: Date;
	updatedAt?: Date;
}
