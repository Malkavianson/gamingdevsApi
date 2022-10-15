import { Favorite } from "src/favorites/entity/favorites.entity";

export class Profiles {
	id: string;
	title: string;
	imageUrl: string;
	userId: string;
	favorites?: Favorite[];
	createdAt: Date;
	updatedAt: Date;
}
