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
}
