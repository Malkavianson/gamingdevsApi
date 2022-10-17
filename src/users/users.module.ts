import { PrismaModule } from "src/prisma/prisma.module";
import { UsersController } from "./users.controller";
import { PassportModule } from "@nestjs/passport";
import { UsersService } from "./users.service";
import { Module } from "@nestjs/common";

@Module({
	imports: [
		PrismaModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
	],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule {}
