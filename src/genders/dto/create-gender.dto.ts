import { ApiProperty } from "@nestjs/swagger";

export class CreateGenderDto {
	@ApiProperty({
		description: "Gender name",
		example: "Fantasy",
	})
	name: string;
}
