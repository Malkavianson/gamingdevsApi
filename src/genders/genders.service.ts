import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateGenderDto } from "./dto/create-gender.dto";
import { Gender } from "./entities/gender.entity";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateGenderDto } from "./dto/update-gender.dto";

@Injectable()
export class GendersService {
	constructor(private readonly prisma: PrismaService) {}

	findAll(): Promise<Gender[]> {
		return this.prisma.genders.findMany();
	}

	async findById(id: string): Promise<Gender> {
		const record = await this.prisma.genders.findUnique({
			where: { id },
			include: {
				games: true,
			},
		});

		if (!record) {
			throw new NotFoundException("Registro com o ${id}");
		}

		return record;
	}

	async findOne(id: string): Promise<Gender> {
		return await this.findById(id);
	}

	async create(dto: CreateGenderDto): Promise<Gender> {
		const data: Gender = { ...dto };
		return await this.prisma.genders.create({ data });
	}

	async update(id: string, dto: UpdateGenderDto): Promise<Gender> {
		await this.findById(id);
		const data: Partial<Gender> = { ...dto };
		return await this.prisma.genders.update({ where: { id }, data });
	}

	async delete(id: string) {
		await this.prisma.genders.delete({ where: { id } });
	}
}
