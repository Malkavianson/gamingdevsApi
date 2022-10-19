import { ApiProperty } from "@nestjs/swagger";
import {
	IsNotEmpty,
	IsString,
	IsUUID,
} from "class-validator";

export class CreateGameDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: "Splatterhouse",
		description: "Game title",
	})
	title: string;

	@IsString()
	@ApiProperty({
		example:
			"https://www.imdb.com/title/tt1774580/mediaviewer/rm1344495104/?ref_=tt_ov_i",
		description: "Game cover URL image",
	})
	image: string;

	@IsString()
	@ApiProperty({
		example:
			"Follow Rick and his mysterious Terror Mask as he unmercifully tears, cuts and beats his way through denizens of unearthly creatures in an epic adventure to rescue his girlfriend from the clutches of deranged occult figure Dr. West.",
		description: "Game description",
	})
	description: string;

	@IsString()
	@ApiProperty({
		example: "2010",
		description: "Game release year ",
	})
	year: string;

	@IsString()
	@ApiProperty({
		example: "7.1",
		description: "Imdb Score rating",
	})
	score: string;

	@IsString()
	@ApiProperty({
		example:
			"https://www.youtube.com/watch?v=1s6CumuY0BI",
		description: "Imdb Score rating",
	})
	trailer: string;

	@IsString()
	@ApiProperty({
		example: "https://youtu.be/RBS97dueij8",
		description: "Link to Gameplay in youtube",
	})
	gameplay: string;

	@IsUUID(undefined, { each: true })
	@ApiProperty({
		example: "54c0a38e-fee1-4dbf-95ff-56e352211ef1",
		description: "genre id",
	})
	genreId: string;
}
