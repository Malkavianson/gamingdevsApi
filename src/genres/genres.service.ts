import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { Genre } from "./entities/genre.entity";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateGenreDto } from "./dto/update-genre.dto";
import { Users } from "src/users/entities/users.entities";
import { AdvancedSearchParams } from "src/games/games.service";
import ordering from "src/utils/set-orderBy-params";

@Injectable()
export class GenresService {
	constructor(private readonly prisma: PrismaService) {}

	findAll(): Promise<Genre[]> {
		return this.prisma.genres.findMany();
	}

	async findById(id: string): Promise<Genre> {
		const res = await this.prisma.genres.findUnique({
			where: { id },
			include: {
				games: true,
			},
		});

		if (!res) {
			throw new NotFoundException(
				"Registro com o ${id}",
			);
		}

		return res;
	}

	async advancedSearch(
		id: string,
		order: string,
		sort: string,
		length: number,
		page: number,
	): Promise<Genre> {
		const orderBy = ordering(order, sort);

		const params: AdvancedSearchParams = {
			take: length,
			skip: (page - 1) * length,
		};

		params.orderBy = orderBy;

		const res = await this.prisma.genres.findUnique({
			where: { id },
			include: {
				games: params,
			},
		});

		if (!res) {
			throw new NotFoundException(
				"Registro com o ${id}",
			);
		}

		return res;
	}

	async findOne(id: string): Promise<Genre> {
		return await this.findById(id);
	}

	async create(
		dto: CreateGenreDto,
		user: Users,
	): Promise<Genre> {
		if (user.isAdmin) {
			const data: Genre = { ...dto };
			return await this.prisma.genres.create({
				data,
			});
		} else {
			throw new UnauthorizedException(
				"only admins are allowed to this endpoint",
			);
		}
	}

	async update(
		id: string,
		dto: UpdateGenreDto,
		user: Users,
	): Promise<Genre> {
		if (user.isAdmin) {
			await this.findById(id);
			const data: Partial<Genre> = { ...dto };
			return await this.prisma.genres.update({
				where: { id },
				data,
			});
		} else {
			throw new UnauthorizedException(
				"only admins are allowed to this endpoint",
			);
		}
	}

	async delete(
		id: string,
		user: Users,
	): Promise<Genre | UnauthorizedException> {
		if (user.isAdmin) {
			return await this.prisma.genres.delete({
				where: { id },
			});
		} else {
			return new UnauthorizedException(
				"only admins are allowed to this endpoint",
			);
		}
	}

	async dbinfo(id: string): Promise<number> {
		console.log("entrou");
		const count = await this.prisma.games.count();
		console.log(count);
		return await this.prisma.games.count({
			where: {
				genres: {
					some: {
						id,
					},
				},
			},
		});
	}
}
