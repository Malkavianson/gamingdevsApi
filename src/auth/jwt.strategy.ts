import {
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import type { Users } from "src/users/entities/users.entities";
import { PrismaService } from "../prisma/prisma.service";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(
	Strategy,
) {
	constructor(private readonly prisma: PrismaService) {
		super({
			jwtFromRequest:
				ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey:
				"qffca8ij-0q67-48b5-9d42-357g0fe6a010",
		});
	}

	async validate(payload: {
		email: string;
	}): Promise<Users> {
		const user: Users = await this.prisma.users
			.findUnique({
				where: { email: payload.email },
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
