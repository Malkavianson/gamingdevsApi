import { Module } from "@nestjs/common";
import { GenresService } from "./genres.service";
import { GenresController } from "./genres.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { PassportModule } from "@nestjs/passport";

@Module({
	imports: [
		PrismaModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
	],
	providers: [GenresService],
	controllers: [GenresController],
})
export class GenresModule {}
