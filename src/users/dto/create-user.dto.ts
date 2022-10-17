import { ApiProperty } from "@nestjs/swagger";
import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsString,
	Matches,
	MaxLength,
	MinLength,
} from "class-validator";

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: "User Smith Silva",
		description: "User name",
	})
	name: string;

	@IsEmail()
	@ApiProperty({
		example: "user@mail.com",
		description: "User email",
	})
	email: string;

	@IsString()
	@MinLength(8)
	@Matches(
		/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
		{
			message: "Your password must be strong",
		},
	)
	@ApiProperty({
		example: "Abcd*123",
		description:
			"User password => Must have a minimal of 8 characters, one uppercase, one lowercase, one symbol and one number.",
	})
	password: string;

	@IsString()
	@MaxLength(11)
	@Matches(/^(\d{11})$/, {
		message:
			"You must to send a number string with lenght 11",
	})
	@ApiProperty({
		example: "83113205603",
		description:
			"User password => Must have a minimal of 8 characters, one uppercase, one lowercase, one symbol and one number.",
	})
	cpf: string;

	@IsBoolean()
	@ApiProperty({
		example: "false",
		description: "User's credentials level",
	})
	isAdmin: boolean;
}
