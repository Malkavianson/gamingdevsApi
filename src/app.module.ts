import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ProfilesModule } from "./profiles/profiles.module";
import { FavoritesModule } from "./favorites/favorites.module";
import { GamesModule } from "./games/games.module";
import { GenresModule } from "./genres/genres.module";

@Module({
	imports: [
		AuthModule,
		UsersModule,
		ProfilesModule,
		FavoritesModule,
		GamesModule,
		GenresModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
