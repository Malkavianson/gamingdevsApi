import { ApiProperty } from "@nestjs/swagger";

export class CreateGenreDto {
	@ApiProperty({
		description: "Genre name",
		example: "Fantasy",
	})
	name: string;
}
