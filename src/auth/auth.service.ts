import {
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { ResponseLoginDto } from "./dto/responseLogin.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Users } from "src/users/entities/users.entities";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
	private userSelect = {
		id: true,
		name: true,
		email: true,
		cpf: true,
		password: true,
		updatedAt: true,
		createdAt: true,
	};

	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	async login({
		email,
		password,
	}: LoginDto): Promise<ResponseLoginDto> {
		const user: Users =
			await this.prisma.users.findUnique({
				where: { email },
				select: {
					...this.userSelect,
					isAdmin: true,
					profile: true,
				},
			});

		if (!user) {
			throw new NotFoundException(
				"Invalid email or password ",
			);
		}

		const passwordMatch: boolean = await bcrypt.compare(
			password,
			user.password,
		);

		if (!passwordMatch) {
			throw new NotFoundException(
				"Invalid email or password ",
			);
		}

		delete user.password;

		const token: string = this.jwtService.sign({
			email,
		});

		return { token, user };
	}
}
