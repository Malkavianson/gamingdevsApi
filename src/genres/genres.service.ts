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
import {
	AdvancedSearchParams,
	IOrder,
} from "src/utils/types/interfaces/orders";
import ordering from "src/utils/set-orderBy-params";

@Injectable()
export class GenresService {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Returns all genres
	 *
	 * @returns {Promise<Genre>} all genres in database
	 */
	findAll(): Promise<Genre[]> {
		return this.prisma.genres.findMany();
	}

	/**
	 * Find one genre by ID including games
	 *
	 * @param {string} id GenreId
	 * @returns {Promise<Genre>} Games from this genreId
	 */
	async findById(id: string): Promise<Genre> {
		const res = await this.prisma.genres.findUnique({
			where: { id },
			include: {
				games: true,
			},
		});

		if (!res) {
			throw new NotFoundException(
				`Registro com o ${id}`,
			);
		}

		return res;
	}

	/**
	 * Advanced search from database, ordering data by following params:
	 *
	 * @param {string} id Genre id to be searched
	 * @param {string} order Set attribute to be ordered
	 * @param {string} sort ASC or DESC
	 * @param {number} length Set number of games per page
	 * @param {number} page Set selected page at this point
	 * @returns {Promise<Genre>} Genre ordered by current settings
	 */
	async advancedSearch(
		id: string,
		order: string,
		sort: string,
		length: number,
		page: number,
	): Promise<Genre> {
		const orderBy: IOrder = ordering(order, sort);

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
				`Registro com o ${id}`,
			);
		}

		return res;
	}

	/**
	 * Find one genre by ID without games
	 *
	 * @param {string} id GenreId
	 * @returns {Promise<Genre>} Games from this genreId
	 */
	async findOne(id: string): Promise<Genre> {
		return await this.findById(id);
	}

	/**
	 * Create a new genre.
	 *
	 * @param {CreateGenreDto} dto Data to be included in database
	 * @param {Users} user User that is making this alteration
	 * @returns {Promise<Genre>} New genre
	 */
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

	/**
	 * Update a genre
	 *
	 * @param {string} id GenreId to be updated.
	 * @param {UpdateGenreDto} dto DTO data to be updated in database
	 * @param {Users} user User that is making this alteration
	 * @returns {Promise<Genre>} Genre updated
	 */
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

	/**
	 * Delete a genre
	 *
	 * @param {string} id GenreId to be deleted
	 * @param {Users} user User that is making this alteration
	 * @returns Delete confirmation
	 */
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

	/**
	 * Genre info
	 *
	 * @param {string} id GenreId to be counted
	 * @returns Genre's length
	 */
	async dbinfo(id: string): Promise<number> {
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
