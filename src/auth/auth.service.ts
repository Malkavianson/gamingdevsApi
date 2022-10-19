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
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	async login({
		email,
		password,
	}: LoginDto): Promise<ResponseLoginDto> {
		const user: Users = await this.prisma.users
			.findUnique({ where: { email } })
			.then(res => {
				if (res) {
					const passwordMatch: Promise<boolean> =
						bcrypt
							.compare(password, res.password)
							.then(res => res);
					if (!passwordMatch) {
						throw new NotFoundException(
							"Invalid email or password ",
						);
					}
					return res;
				} else {
					throw new NotFoundException(
						"Invalid email or password ",
					);
				}
			});

		if (!user) {
			throw new NotFoundException(
				"Invalid cpf or password ",
			);
		}

		delete user.password;

		const token: string = this.jwtService.sign({
			email,
		});

		return { token, user };
	}
}
