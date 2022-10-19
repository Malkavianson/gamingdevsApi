import { ProfilesController } from "./profiles.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { ProfilesService } from "./profiles.service";
import { PassportModule } from "@nestjs/passport";
import { Module } from "@nestjs/common";

@Module({
	imports: [
		PrismaModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
	],
	controllers: [ProfilesController],
	providers: [ProfilesService],
})
export class ProfilesModule {}
