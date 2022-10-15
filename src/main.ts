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
		.setTitle("Ryokan")
		.setDescription(
			`Api de controle Ryokan.\n\n

Esta API possui os seguintes recursos:\n
    Usuarios\n
    Mesas\n
    Produtos\n
    Categorias\n
    Pedidos\n
    Autenticação\n
\n
Rotas que não necessitam autenticação:\n
    @GET /status\n
    @POST /users\n
    @GET /products\n
    @GET /products/{id}\n
    @POST /auth/login\n
\n
Modo de usar:\n
    Utilizando @POST /users, registre um novo usuário respeitando seu respectivo 'schema'\n
    Autentique a conexão através da rota @POST /auth/login enviando email e senha e salve o 'TOKEN' gerado\n
    Valide sua conexão com o token com autenticação ao portador(Bearer)\n
\n
    `,
		)
		.setVersion("1.1")
		.addTag("Status")
		.addTag("Users")
		.addTag("Categories")
		.addTag("Products")
		.addTag("Tables")
		.addTag("Orders")
		.addBearerAuth()
		.addServer("https://ryokan-production.up.railway.app/")
		.addServer("http://localhost:3333")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("docs", app, document);

	console.log("Swagger.setup Builded");
	console.log("Mapping routes:");

	await app.listen(PORT, () => console.log(`App bootstraped at http://localhost:${PORT}`));
}
bootstrap();
