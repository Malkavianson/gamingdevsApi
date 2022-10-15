import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { Users } from "src/users/entities/users.entities";
import { PrismaService } from "../prisma/prisma.service";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly prisma: PrismaService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: { cpf: string }): Promise<Users> {
		const user: Users = await this.prisma.users
			.findUnique({
				where: { cpf: payload.cpf },
			})
			.then(res => {
				if (res) {
					return res;
				} else {
					throw new UnauthorizedException("Deny");
				}
			});

		if (!user) {
			throw new UnauthorizedException("Deny");
		}

		delete user.password;

		return user;
	}
}
