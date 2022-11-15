import handleErrorConstraintUnique from "../utils/handle-error-unique.util";
import {
	ImATeapotException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcryptjs";
import { Users } from "./entities/users.entities";
import { JwtService } from "@nestjs/jwt";
import nodeMailer from "nodemailer";
@Injectable()
export class UsersService {
	private userSelect = {
		id: true,
		name: true,
		email: true,
		updatedAt: true,
		createdAt: true,
	};

	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	private async updateUser(
		id: string,
		dto: UpdateUserDto,
	): Promise<Users> {
		return await this.prisma.users
			.update({
				where: { id },
				data: dto,
				select: this.userSelect,
			})
			.catch(handleErrorConstraintUnique);
	}

	async create(dto: CreateUserDto): Promise<Users> {
		const hashedPassword = await bcrypt.hash(
			dto.password,
			8,
		);

		const data: CreateUserDto = {
			name: dto.name,
			email: dto.email,
			password: hashedPassword,
			cpf: dto.cpf,
			isAdmin: false,
		};

		return this.prisma.users
			.create({ data, select: this.userSelect })
			.catch(handleErrorConstraintUnique);
	}

	async findAll(): Promise<Users[]> {
		const res = await this.prisma.users.findMany({
			select: this.userSelect,
		});

		return res;
	}

	async verifyIdAndReturnUser(
		id: string,
	): Promise<Users> {
		const user = await this.prisma.users.findUnique({
			where: { id },
			select: {
				...this.userSelect,
				isAdmin: true,
				cpf: true,
				profile: true,
			},
		});

		if (!user) {
			throw new NotFoundException(
				`Entrada de id '${id}' não encontrada`,
			);
		}

		return user;
	}

	async findOne(id: string): Promise<Users> {
		return await this.verifyIdAndReturnUser(id);
	}

	async update(
		id: string,
		dto: UpdateUserDto,
		user: Users,
	): Promise<ImATeapotException | Users> {
		const thisUser = await this.verifyIdAndReturnUser(
			id,
		);

		if (dto.password) {
			const hashedPassword = await bcrypt.hash(
				dto.password,
				8,
			);
			dto.password = hashedPassword;
		}
		if (user.isAdmin) {
			if (thisUser.id === user.id) {
				this.updateUser(id, dto);
				throw new ImATeapotException({
					message:
						"I'm a teapot < you must to reload your session >",
				});
			} else {
				return await this.prisma.users
					.update({
						where: { id },
						data: dto,
						select: this.userSelect,
					})
					.catch(handleErrorConstraintUnique);
			}
		} else if (thisUser.id === user.id) {
			if (dto.isAdmin) {
				dto.isAdmin = false;
			}
			this.updateUser(id, dto);
			throw new ImATeapotException({
				message:
					"I'm a teapot < you must to reload your session >",
			});
		} else {
			throw new UnauthorizedException(
				"not authorized",
			);
		}
	}

	async remove(
		id: string,
		user: Users,
	): Promise<Users | UnauthorizedException> {
		const thisUser = await this.verifyIdAndReturnUser(
			id,
		);
		if (user.isAdmin) {
			return await this.prisma.users.delete({
				where: { id },
				select: this.userSelect,
			});
		}
		if (thisUser.id === user.id) {
			return await this.prisma.users.delete({
				where: { id },
				select: this.userSelect,
			});
		} else {
			return new UnauthorizedException(
				"not authorized",
			);
		}
	}

	async findUserForEmail(
		email: string,
	): Promise<{ message: string }> {
		const user = await this.prisma.users.findUnique({
			where: { email: email },
		});

		if (!user) {
			return {
				message: "Email sent if it exists",
			};
		}

		const token = this.jwtService.sign({ email });

		const linkRecoveryText = `Olá ${user.name}, \nVocê solicitou o e-mail de recuperação de senha. Clique no link abaixo e siga as instruções para acessar o sistema. \nhttps://gamedevs.vercel.app/recover/${user.id}/${token}.`;
		const linkRecoveryHtml = `<h4>Olá ${user.name},</h4>
		<p>Você solicitou o e-mail de recuperação de senha. Clique <a href="https://gamedevs.vercel.app/recover/${user.id}/${token}">aqui</a> e siga as instruções para acessar o sistema.</p>`;

		this.sendEmail(
			email,
			linkRecoveryText,
			linkRecoveryHtml,
		);

		return {
			message: "Email sent if it exists",
		};
	}

	async sendEmail(
		email: string,
		text: string,
		html: string,
	): Promise<void> {
		const transport = nodeMailer.createTransport({
			host: process.env.HOST_EMAIL,
			port: 587,
			auth: {
				user: process.env.USER_EMAIL,
				pass: process.env.PASS_EMAIL,
			},
		});

		const message = {
			from: "GameDevs <gamedevs.recovery@outlook.com>",
			to: email,
			subject: "Recuperar Senha",
			text: text,
			html: html,
		};

		await transport.sendMail(message);
	}
}
