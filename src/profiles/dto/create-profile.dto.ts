import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProfileDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: "Userskovisk zhenatyy yedok",
		description: "Profile title",
	})
	title: string;

	@IsString()
	@ApiProperty({
		example: "https://www.website.net/image.img",
		description: "Profile ImageURL",
	})
	imageUrl: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: "a3d1217c-4c98-11ed-bdc3-0242ac120002",
		description: "User Id",
	})
	userId: string;
}
