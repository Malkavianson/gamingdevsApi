import { Gender } from "src/genders/entities/gender.entity";

export class Game {
	id: string;
	title: string;
	image: string;
	description: string;
	year: string;
	score: string;
	trailer: string;
	gameplay: string;
	gender?: Gender[];
	createdAt?: Date;
	updatedAt?: Date;
}
