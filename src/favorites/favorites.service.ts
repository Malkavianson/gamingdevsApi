import {
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { Favorites, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { DislikeGameDto } from "./dto/dislike.game.dto";
import { FavoriteGameDto } from "./dto/favorite.game.dto";

@Injectable()
export class FavoritesService {
	constructor(private readonly prisma: PrismaService) {}

	async verifyIdAndReturnGameFav(
		favoriteId: string,
	): Promise<Favorites> {
		const favorite: Favorites | null =
			await this.prisma.favorites.findUnique({
				where: { id: favoriteId },
			});

		if (!favorite) {
			throw new NotFoundException(
				`Favorite Id: '${favoriteId}' not found`,
			);
		}

		return favorite;
	}

	async favoriteGame(
		dto: FavoriteGameDto,
	): Promise<Favorites> {
		const data: Prisma.FavoritesCreateInput = {
			profile: {
				connect: {
					id: dto.profileId,
				},
			},
			games: {
				connect: {
					id: dto.games,
				},
			},
		};

		return await this.prisma.favorites.create({ data });
	}

	async getProfileFavorites(
		id: string,
	): Promise<Favorites[]> {
		return await this.prisma.favorites.findMany({
			where: { profileId: id },
			include: { games: true },
		});
	}

	async dislikeGame({
		favoriteId,
	}: DislikeGameDto): Promise<Favorites> {
		this.verifyIdAndReturnGameFav(favoriteId);

		return this.prisma.favorites.delete({
			where: {
				id: favoriteId,
			},
		});
	}
}
