import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Users } from "src/users/entities/users.entities";
import { PrismaService } from "../prisma/prisma.service";
import { DislikeGameDto } from "./dto/dislike.game.dto";
import { FavoriteGameDto } from "./dto/favorite.game.dto";
import { Favorite } from "./entities/favorites.entities";

@Injectable()
export class FavoritesService {
	constructor(private readonly prisma: PrismaService) {}

	async verifyIdAndReturnGameFav(
		favoriteId: string,
	): Promise<Favorite> {
		const favorite: Favorite | null =
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
		user: Users,
	): Promise<Favorite> {
		if (user.isAdmin) {
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
			return await this.prisma.favorites.create({
				data,
			});
		} else {
			const isOwner =
				await this.prisma.profiles.findUnique({
					where: { id: dto.profileId },
					select: { userId: true },
				});
			if (isOwner.userId === user.id) {
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
				return await this.prisma.favorites.create({
					data,
				});
			} else {
				throw new UnauthorizedException(
					"User is not allowed to favorite a game of this profile. Please verify profile.id",
				);
			}
		}
	}

	async getProfileFavorites(
		id: string,
		user: Users,
	): Promise<Favorite[]> {
		if (user.isAdmin) {
			return await this.prisma.favorites.findMany({
				where: { profileId: id },
				include: { games: true },
			});
		} else {
			const isOwner =
				await this.prisma.profiles.findUnique({
					where: { id },
					select: { userId: true },
				});
			if (isOwner.userId === user.id) {
				return await this.prisma.favorites.findMany(
					{
						where: { profileId: id },
						include: { games: true },
					},
				);
			} else {
				throw new UnauthorizedException(
					"User is not allowed to get favorites of this profile. Please verify profile.id",
				);
			}
		}
	}

	async dislikeGame(
		{ favoriteId }: DislikeGameDto,
		user: Users,
	): Promise<Favorite | UnauthorizedException> {
		this.verifyIdAndReturnGameFav(favoriteId);
		if (user.isAdmin) {
			return this.prisma.favorites.delete({
				where: { id: favoriteId },
			});
		} else {
			const isOwner =
				await this.prisma.favorites.findUnique({
					where: { id: favoriteId },
					select: {
						profile: {
							select: { userId: true },
						},
					},
				});
			if (isOwner.profile.userId === user.id) {
				return this.prisma.favorites.delete({
					where: {
						id: favoriteId,
					},
				});
			} else {
				return new UnauthorizedException(
					"User is not allowed to delete favorites of this profile. Please verify profile.id",
				);
			}
		}
	}

	// async allFavorites(): Promise<void> {
	// 	const favs = await this.prisma.favorites.findMany({
	// 		include: {
	// 			games: true,
	// 		},
	// 	});
	// 	console.log(
	// 		favs.map(e => {
	// 			return [
	// 				e,
	// 				e.games.map(g => {
	// 					return g;
	// 				}),
	// 			];
	// 		}),
	// 	);
	// }
}
