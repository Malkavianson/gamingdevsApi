import handleErrorConstraintUnique from "../utils/handle-error-unique.util";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import type { Users } from "./entities/users.entities";
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

	async create(dto: CreateUserDto): Promise<Users | void> {
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

	async findAll(): Promise<Users[]> {
		const res = await this.prisma.users.findMany({
			select: {
				...this.userSelect,
				profiles: true,
			},
		});

		return res;
	}

	async verifyIdAndReturnUser(id: string): Promise<Users> {
		const user: Users | null = await this.prisma.users.findUnique({
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

	findOne(id: string): Promise<Users> {
		return this.verifyIdAndReturnUser(id);
	}

	async update(id: string, dto: UpdateUserDto): Promise<Users | void> {
		await this.verifyIdAndReturnUser(id);

		if (dto.password) {
			const hashedPassword = await bcrypt.hash(dto.password, 8);
			dto.password = hashedPassword;
		}

		return this.prisma.users.update({ where: { id }, data: dto, select: this.userSelect }).catch(handleErrorConstraintUnique);
	}

	async remove(id: string): Promise<Users> {
		await this.verifyIdAndReturnUser(id);

		return this.prisma.users.delete({
			where: { id },
			select: this.userSelect,
		});
	}
}
