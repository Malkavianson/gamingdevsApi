import UnprocessableEntityException from "src/utils/handle-error-unique.util";
import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
import { Prisma } from "@prisma/client";
import { Users } from "src/users/entities/users.entities";

@Injectable()
export class GameService {
	constructor(private readonly prisma: PrismaService) {}

	async findAll() {
		return await this.prisma.games.findMany({
			include: {
				genres: true,
			},
		});
	}

	async findById(id: string) {
		const res = await this.prisma.games.findUnique({
			where: { id },
			include: {
				genres: true,
			},
		});

		if (!res) {
			throw new NotFoundException(`${id} not found`);
		}
		return res;
	}

	async create(dto: CreateGameDto, user: Users) {
		if (user.isAdmin) {
			const data: Prisma.GamesCreateInput = {
				title: dto.title,
				description: dto.description,
				image: dto.image,
				year: dto.year,
				score: dto.score,
				trailer: dto.trailer,
				gameplay: dto.gameplay,
				genres: {
					connect: {
						id: dto.genreId,
					},
				},
			};
			await this.prisma.userToGame.create({
				data: {
					userId: user.id,
					cpf: user.cpf,
					email: user.email,
					action: "created",
					game: JSON.stringify(data),
				},
			});
			return await this.prisma.games
				.create({
					data,
					include: {
						genres: true,
					},
				})
				.catch(UnprocessableEntityException);
		} else {
			throw new UnauthorizedException(
				"not authorized",
			);
		}
	}

	async update(
		id: string,
		dto: UpdateGameDto,
		user: Users,
	) {
		if (user.isAdmin) {
			const data: Prisma.GamesUpdateInput = {
				title: dto.title,
				description: dto.description,
				image: dto.image,
				year: dto.year,
				score: dto.score,
				trailer: dto.trailer,
				gameplay: dto.gameplay,
				genres: {
					connect: {
						id: dto.genreId,
					},
				},
			};
			await this.prisma.userToGame.create({
				data: {
					userId: user.id,
					cpf: user.cpf,
					email: user.email,
					action: "updated",
					game: JSON.stringify(data),
				},
			});
			return await this.prisma.games
				.update({
					where: { id },
					data,
					include: {
						genres: true,
					},
				})
				.catch(UnprocessableEntityException);
		} else {
			throw new UnauthorizedException(
				"not authorized",
			);
		}
	}

	async delete(id: string, user: Users) {
		if (user.isAdmin) {
			const data = await this.findById(id);
			await this.prisma.userToGame.create({
				data: {
					userId: user.id,
					cpf: user.cpf,
					email: user.email,
					action: "deleted",
					game: JSON.stringify(data),
				},
			});
			await this.prisma.games.delete({
				where: { id },
			});
		} else {
			throw new UnauthorizedException(
				"not authorized",
			);
		}
	}
}
