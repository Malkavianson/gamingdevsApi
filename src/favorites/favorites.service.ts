import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { Favorites, Prisma } from "@prisma/client";
import { Users } from "src/users/entities/users.entities";
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
		user: Users,
	): Promise<Favorites> {
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
					"Not allow to favorite a game in this user. Please verify profile.id",
				);
			}
		}
	}

	async getProfileFavorites(
		id: string,
		user: Users,
	): Promise<Favorites[]> {
		if (user.isAdmin) {
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
					"Not allow to get favorites of this profile. Please verify profile.id",
				);
			}
		}
	}

	async dislikeGame(
		{ favoriteId }: DislikeGameDto,
		user: Users,
	): Promise<Favorites> {
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
				throw new UnauthorizedException(
					"Not allow to delete favorites on this user. Please verify profile.id",
				);
			}
		}
	}
}
