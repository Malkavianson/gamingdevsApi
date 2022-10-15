import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ProfilesModule } from "./profiles/profiles.module";
import { FavoritesModule } from "./favorites/favorites.module";

@Module({
	imports: [AuthModule, UsersModule, ProfilesModule, FavoritesModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
