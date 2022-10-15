import handleErrorConstraintUnique from "../utils/handle-error-unique.util";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
	private userSelect = {
		id: true,
		name: true,
		email: true,
		cpf: true,
		updatedAt: true,
		createdAt: true,
	};

	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateUserDto) {
		const hashedPassword = await bcrypt.hash(dto.password, 8);

		const data: CreateUserDto = {
			name: dto.name,
			email: dto.email,
			password: hashedPassword,
			cpf: dto.cpf,
			isAdmin: dto.isAdmin,
		};

		return this.prisma.users.create({ data, select: this.userSelect }).catch(handleErrorConstraintUnique);
	}

	async findAll() {
		const res = await this.prisma.users.findMany({
			select: {
				...this.userSelect,
				profiles: true,
			},
		});

		return res;
	}

	async verifyIdAndReturnUser(id: string) {
		const user = await this.prisma.users.findUnique({
			where: { id },
			select: {
				...this.userSelect,
				profiles: true,
			},
		});

		if (!user) {
			throw new NotFoundException(`Entrada de id '${id}' não encontrada`);
		}

		return user;
	}

	async findOne(id: string) {
		return await this.verifyIdAndReturnUser(id);
	}

	async update(id: string, dto: UpdateUserDto) {
		await this.verifyIdAndReturnUser(id);

		if (dto.password) {
			const hashedPassword = await bcrypt.hash(dto.password, 8);
			dto.password = hashedPassword;
		}

		return await this.prisma.users.update({ where: { id }, data: dto, select: this.userSelect }).catch(handleErrorConstraintUnique);
	}

	async remove(id: string) {
		await this.verifyIdAndReturnUser(id);

		return await this.prisma.users.delete({
			where: { id },
			select: this.userSelect,
		});
	}
}
