import handleErrorConstraintUnique from "../utils/handle-error-unique.util";
import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcryptjs";
import { Users } from "./entities/users.entities";
import { Profiles } from "src/profiles/entities/profiles.entities";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
	private userSelect = {
		id: true,
		name: true,
		email: true,
		updatedAt: true,
		createdAt: true,
	};

	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	async create(dto: CreateUserDto): Promise<{
		id: string;
		name: string;
		email: string;
		createdAt: Date;
		updatedAt: Date;
	}> {
		const hashedPassword = await bcrypt.hash(
			dto.password,
			8,
		);

		const data: CreateUserDto = {
			name: dto.name,
			email: dto.email,
			password: hashedPassword,
			cpf: dto.cpf,
			isAdmin: dto.isAdmin,
		};

		return this.prisma.users
			.create({ data, select: this.userSelect })
			.catch(handleErrorConstraintUnique);
	}

	async findAll(): Promise<
		{
			id: string;
			name: string;
			email: string;
			updatedAt: Date;
			createdAt: Date;
		}[]
	> {
		const res = await this.prisma.users.findMany({
			select: this.userSelect,
		});

		return res;
	}

	async verifyIdAndReturnUser(id: string): Promise<{
		id: string;
		isAdmin: boolean;
		cpf: string;
		profile: Profiles[];
		name: string;
		email: string;
		updatedAt: Date;
		createdAt: Date;
	}> {
		const user = await this.prisma.users.findUnique({
			where: { id },
			select: {
				...this.userSelect,
				isAdmin: true,
				cpf: true,
				profile: true,
			},
		});

		if (!user) {
			throw new NotFoundException(
				`Entrada de id '${id}' não encontrada`,
			);
		}

		return user;
	}

	async findOne(id: string): Promise<{
		id: string;
		isAdmin: boolean;
		cpf: string;
		profile: Profiles[];
		name: string;
		email: string;
		updatedAt: Date;
		createdAt: Date;
	}> {
		return await this.verifyIdAndReturnUser(id);
	}

	async update(
		id: string,
		dto: UpdateUserDto,
		user: Users,
	): Promise<{
		id: string;
		name: string;
		email: string;
		createdAt: Date;
		updatedAt: Date;
	}> {
		const thisUser = await this.verifyIdAndReturnUser(
			id,
		);

		if (dto.password) {
			const hashedPassword = await bcrypt.hash(
				dto.password,
				8,
			);
			dto.password = hashedPassword;
		}
		if (user.isAdmin) {
			return await this.prisma.users
				.update({
					where: { id },
					data: dto,
					select: this.userSelect,
				})
				.catch(handleErrorConstraintUnique);
		}
		if (thisUser.id === user.id) {
			return await this.prisma.users
				.update({
					where: { id },
					data: dto,
					select: this.userSelect,
				})
				.catch(handleErrorConstraintUnique);
		} else {
			throw new UnauthorizedException(
				"not authorized",
			);
		}
	}

	async remove(
		id: string,
		user: Users,
	): Promise<
		| {
				id: string;
				name: string;
				email: string;
				updatedAt: Date;
				createdAt: Date;
		  }
		| UnauthorizedException
	> {
		const thisUser = await this.verifyIdAndReturnUser(
			id,
		);
		if (user.isAdmin) {
			return await this.prisma.users.delete({
				where: { id },
				select: this.userSelect,
			});
		}
		if (thisUser.id === user.id) {
			return await this.prisma.users.delete({
				where: { id },
				select: this.userSelect,
			});
		} else {
			return new UnauthorizedException(
				"not authorized",
			);
		}
	}

	async findUserForEmail(
		email: string,
	): Promise<string[]> {
		const user = await this.prisma.users.findUnique({
			where: { email: email },
		});
		if (!user) {
			throw new NotFoundException();
		}
		console.log(user);
		const token = this.jwtService.sign({ email });

		return [user.id, token];
	}
}
