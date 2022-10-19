import { Module } from "@nestjs/common";
import { GameService } from "./games.service";
import { GamesController } from "./games.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { PassportModule } from "@nestjs/passport";

@Module({
	imports: [
		PrismaModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
	],
	controllers: [GamesController],
	providers: [GameService],
})
export class GamesModule {}
