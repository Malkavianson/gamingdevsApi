import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateGenderDto } from "./dto/create-gender.dto";
import { Gender } from "./entities/gender.entity";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateGenderDto } from "./dto/update-gender.dto";
import { Users } from "src/users/entities/users.entities";

@Injectable()
export class GendersService {
	constructor(private readonly prisma: PrismaService) {}

	findAll(): Promise<Gender[]> {
		return this.prisma.genders.findMany();
	}

	async findById(id: string): Promise<Gender> {
		const res = await this.prisma.genders.findUnique({
			where: { id },
			include: {
				games: true,
			},
		});

		if (!res) {
			throw new NotFoundException("Registro com o ${id}");
		}

		return res;
	}

	async findOne(id: string): Promise<Gender> {
		return await this.findById(id);
	}

	async create(dto: CreateGenderDto, user: Users): Promise<Gender> {
		if (user.isAdmin) {
			const data: Gender = { ...dto };
			return await this.prisma.genders.create({ data });
		} else {
			throw new UnauthorizedException("not authorized");
		}
	}

	async update(id: string, dto: UpdateGenderDto, user: Users): Promise<Gender> {
		if (user.isAdmin) {
			await this.findById(id);
			const data: Partial<Gender> = { ...dto };
			return await this.prisma.genders.update({ where: { id }, data });
		} else {
			throw new UnauthorizedException("not authorized");
		}
	}

	async delete(id: string, user: Users) {
		if (user.isAdmin) {
			return await this.prisma.genders.delete({ where: { id } });
		} else {
			throw new UnauthorizedException("not authorized");
		}
	}
}
