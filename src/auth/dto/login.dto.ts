import { ApiProperty } from "@nestjs/swagger";
import {
	IsEmail,
	IsNotEmpty,
	IsString,
} from "class-validator";

export class LoginDto {
	@IsEmail()
	@IsNotEmpty()
	@ApiProperty({
		description: "User email",
		example: "user@mail.com",
	})
	email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "User password",
		example: "1234@Abcd",
	})
	password: string;
}
