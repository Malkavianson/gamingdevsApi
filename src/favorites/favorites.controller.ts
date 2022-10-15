import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DislikeGameDto } from "./dto/dislike.game.dto";
import { FavoriteGameDto } from "./dto/favorite.game.dto";
import { FavoritesService } from "./favorites.service";
import { AuthGuard } from "@nestjs/passport";
import { Favorites } from "@prisma/client";

@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags("Favorites")
@Controller("favorites")
export class FavoritesController {
	constructor(private readonly favoritesService: FavoritesService) {}

	@Post()
	@ApiOperation({
		summary: "Favorite a game",
	})
	async favoriteKindred(@Body() dto: FavoriteGameDto): Promise<Favorites> {
		return await this.favoritesService.favoriteGame(dto);
	}

	@Get("/profiles/:id")
	@ApiOperation({
		summary: "Returns all profiles's favorites by ID",
	})
	async getProfileFavorites(@Param("id") id: string): Promise<Favorites[]> {
		return await this.favoritesService.getProfileFavorites(id);
	}

	@Delete()
	@ApiOperation({
		summary: "Dislike a game",
	})
	@HttpCode(HttpStatus.NO_CONTENT)
	async dislikeGame(@Body() dto: DislikeGameDto): Promise<Favorites> {
		return this.favoritesService.dislikeGame(dto);
	}
}
