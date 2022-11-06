import { PrismaModule } from "src/prisma/prisma.module";
import { UsersController } from "./users.controller";
import { PassportModule } from "@nestjs/passport";
import { UsersService } from "./users.service";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
	imports: [
		PrismaModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: "240h" },
		}),
	],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule {}
