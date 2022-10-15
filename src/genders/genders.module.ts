import { Module } from "@nestjs/common";
import { GendersService } from "./genders.service";
import { GendersController } from "./genders.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { PassportModule } from "@nestjs/passport";

@Module({
	imports: [PrismaModule, PassportModule.register({ defaultStrategy: "jwt" })],
	providers: [GendersService],
	controllers: [GendersController],
})
export class GendersModule {}
