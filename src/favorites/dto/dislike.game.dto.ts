import { ApiProperty } from "@nestjs/swagger";

export class DislikeGameDto {
	@ApiProperty({
		example: "79653a44-4019-11ed-b878-0242ac120002",
		description: "Favorited id",
	})
	favoriteId: string;
}
