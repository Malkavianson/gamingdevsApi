import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	UnauthorizedException,
	UseGuards,
} from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiOperation,
	ApiTags,
} from "@nestjs/swagger";
import { Favorite } from "./entities/favorites.entities";
import { DislikeGameDto } from "./dto/dislike.game.dto";
import { FavoriteGameDto } from "./dto/favorite.game.dto";
import { FavoritesService } from "./favorites.service";
import { AuthGuard } from "@nestjs/passport";
import { LoggedUser } from "src/auth/loggeduser.decorator";
import { Users } from "src/users/entities/users.entities";

@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags("Favorites")
@Controller("favorites")
export class FavoritesController {
	constructor(
		private readonly favoritesService: FavoritesService,
	) {}

	@Post()
	@ApiOperation({
		summary: "Favorite a game",
	})
	async favoriteKindred(
		@Body() dto: FavoriteGameDto,
		@LoggedUser() user: Users,
	): Promise<Favorite> {
		return await this.favoritesService.favoriteGame(
			dto,
			user,
		);
	}

	@Get("/profiles/:id")
	@ApiOperation({
		summary: "Returns all profiles's favorites by ID",
		description:
			"Insert **profileId** to show favorites",
	})
	async getProfileFavorites(
		@Param("id") id: string,
		@LoggedUser() user: Users,
	): Promise<Favorite[]> {
		return await this.favoritesService.getProfileFavorites(
			id,
			user,
		);
	}

	@Delete()
	@ApiOperation({
		summary: "Dislike a game",
	})
	@HttpCode(HttpStatus.NO_CONTENT)
	async dislikeGame(
		@Body() dto: DislikeGameDto,
		@LoggedUser() user: Users,
	): Promise<Favorite | UnauthorizedException> {
		return this.favoritesService.dislikeGame(dto, user);
	}

	// @Get()
	// async allFavorites(): Promise<void> {
	// 	return await this.favoritesService.allFavorites();
	// }
}
