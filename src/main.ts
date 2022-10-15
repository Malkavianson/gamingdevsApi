import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

const PORT = process.env.PORT || 3333;

async function bootstrap() {
	console.clear();
	console.log("Starting and validating");

	const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

	app.set("trust proxy", 1);

	app.useGlobalPipes(new ValidationPipe());

	console.log("Server Started\n\nMapping documentation");

	const config = new DocumentBuilder()
		.setTitle("GamingDevs")
		.setDescription(
			`Api de controle GamingDevs.\n\n

Api de gerenciamento e persistencia de dados fake de jogos para fins educacionais

Esta API possui os seguintes recursos:\n
	Autenticação\n
    Usuarios\n
    Perfis\n
    Favoritos\n
    Jogos\n
    Generos (dos jogos)\n
\n
Rotas que não necessitam autenticação:\n
	Criação de usuários		@POST /users\n
	Autenticação 	 		@POST /auth/login\n
	Visualização de gêneros	@GET /genders\n
    Status do Servidor		@GET /status\n
\n
Modo de usar:\n
    Utilizando @POST /users, registre um novo usuário respeitando seu respectivo 'schema'\n
    Autentique a conexão através da rota @POST /auth/login enviando email e senha e salve o 'TOKEN' gerado\n
    Valide sua conexão com o token com autenticação ao portador(Bearer)\n
\n
IMPORTANTE!\n
	A API ainda possui limitações e ainda está em construção.
	Caso encontre erros ou tenha sugestões, favor enviar 
    `,
		)
		.setVersion("1.1")
		.addTag("Auth")
		.addTag("Users")
		.addTag("Profiles")
		.addTag("Favorites")
		.addTag("Games")
		.addTag("Genders")
		.addTag("Status")
		.addBearerAuth()
		.addServer("http://localhost:3333")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("docs", app, document);

	console.log("Swagger.setup Builded");
	console.log("Mapping routes:");

	await app.listen(PORT, () => console.log(`App bootstraped at http://localhost:${PORT}`));
}
bootstrap();
