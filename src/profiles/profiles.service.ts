import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import handleErrorConstraintUnique from "src/utils/handle-error-unique.util";
import type { Profiles } from "./entities/profiles.entities";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class ProfilesService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateProfileDto): Promise<Profiles> {
		return await this.prisma.profiles.create({ data: dto }).catch(handleErrorConstraintUnique);
	}

	async findAll(): Promise<Profiles[]> {
		return await this.prisma.profiles.findMany();
	}

	async verifyIdAndReturnProfile(id: string): Promise<Profiles> {
		const profile: Promise<Profiles> = await this.prisma.profiles.findUnique({
			where: { id },
		});

		if (!profile) {
			throw new NotFoundException(`Entrada de id '${id}' não encontrada`);
		}

		return profile;
	}

	async findOne(id: string): Promise<Profiles> {
		return await this.verifyIdAndReturnProfile(id);
	}

	async update(id: string, dto: UpdateProfileDto): Promise<Profiles> {
		await this.verifyIdAndReturnProfile(id);

		return await this.prisma.profiles.update({ where: { id }, data: dto }).catch(handleErrorConstraintUnique);
	}

	async remove(id: string) {
		await this.verifyIdAndReturnProfile(id);

		return this.prisma.profiles.delete({
			where: { id },
			select: { title: true, id: true },
		});
	}
}
