import {
	createParamDecorator,
	ExecutionContext,
} from "@nestjs/common";

export const LoggedUser = createParamDecorator(
	(_, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		const user = request.user;

		delete user.password;

		return user;
	},
);
