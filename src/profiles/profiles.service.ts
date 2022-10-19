import handleErrorConstraintUnique from "src/utils/handle-error-unique.util";
import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { Users } from "src/users/entities/users.entities";
import { Profiles } from "./entities/profiles.entities";

@Injectable()
export class ProfilesService {
	constructor(private readonly prisma: PrismaService) {}

	async create(
		dto: CreateProfileDto,
		user: Users,
	): Promise<Profiles> {
		if (user.isAdmin) {
			const data: Prisma.ProfilesCreateInput = {
				title: dto.title,
				imageUrl: dto.imageUrl,
				user: {
					connect: {
						id: dto.userId,
					},
				},
			};

			return await this.prisma.profiles
				.create({ data })
				.catch(handleErrorConstraintUnique);
		} else {
			const data: Prisma.ProfilesCreateInput = {
				title: dto.title,
				imageUrl: dto.imageUrl,
				user: {
					connect: {
						id: user.id,
					},
				},
			};

			return await this.prisma.profiles
				.create({ data })
				.catch(handleErrorConstraintUnique);
		}
	}

	async findAll(): Promise<
		(Profiles & {
			user: {
				id: string;
				name: string;
				email: string;
			};
		})[]
	> {
		return await this.prisma.profiles.findMany({
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
			},
		});
	}

	async verifyIdAndReturnProfile(id: string): Promise<
		Profiles & {
			user: {
				id: string;
				name: string;
				email: string;
			};
		}
	> {
		const profile =
			await this.prisma.profiles.findUnique({
				where: { id },
				include: {
					user: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
				},
			});

		if (!profile) {
			throw new NotFoundException(
				`Entrada de id '${id}' não encontrada`,
			);
		}

		return profile;
	}

	async findOne(id: string): Promise<
		Profiles & {
			user: {
				id: string;
				name: string;
				email: string;
			};
		}
	> {
		return await this.verifyIdAndReturnProfile(id);
	}

	async update(
		id: string,
		dto: UpdateProfileDto,
		user: Users,
	): Promise<Profiles> {
		const isOwner = await this.verifyIdAndReturnProfile(
			id,
		);
		if (user.isAdmin) {
			return await this.prisma.profiles
				.update({ where: { id }, data: dto })
				.catch(handleErrorConstraintUnique);
		} else {
			if (user.id === isOwner.user.id) {
				return await this.prisma.profiles
					.update({
						where: { id },
						data: dto,
					})
					.catch(handleErrorConstraintUnique);
			} else {
				throw new UnauthorizedException(
					"User is not allowed to patch this profile. Please verify user.id",
				);
			}
		}
	}

	async remove(
		id: string,
		user: Users,
	): Promise<
		| {
				id: string;
				title: string;
		  }
		| UnauthorizedException
	> {
		const isOwner = await this.verifyIdAndReturnProfile(
			id,
		);
		if (user.isAdmin) {
			return this.prisma.profiles.delete({
				where: { id },
				select: { title: true, id: true },
			});
		} else {
			if (user.id === isOwner.user.id) {
			} else {
				return new UnauthorizedException(
					"User is not allowed to delete this profile. Please verify user.id",
				);
			}
		}
	}
}
