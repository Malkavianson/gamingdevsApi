import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
	imports: [
		PrismaModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: "240h" },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
