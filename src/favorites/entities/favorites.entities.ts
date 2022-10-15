import { Game } from "src/games/entities/game.entities";
import { Profiles } from "src/profiles/entities/profiles.entities";

export class Favorite {
	id: string;
	createdAt: Date;
	game?: Game;
	profile?: Profiles;
}
