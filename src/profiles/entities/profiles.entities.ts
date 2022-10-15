import { Favorite } from "src/favorites/entities/favorites.entities";

export class Profiles {
	id: string;
	title: string;
	imageUrl: string;
	userId: string;
	favorites?: Favorite[];
	createdAt: Date;
	updatedAt: Date;
}
