import { UnprocessableEntityException } from "@nestjs/common";

const handleErrorConstraintUnique = (
	error: Error,
): never => {
	const splitedMessage = error.message.split("`");

	const errorMessage = `${
		splitedMessage[splitedMessage.length - 2]
	} already registred`;

	throw new UnprocessableEntityException(errorMessage);
};

export default handleErrorConstraintUnique;
