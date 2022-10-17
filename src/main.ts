import sDescription from "./utils/swaggerDocumentation.description";
import { NestExpressApplication } from "@nestjs/platform-express";
import {
	DocumentBuilder,
	SwaggerModule,
} from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const PORT = process.env.PORT || 3333;

async function bootstrap() {
	console.clear();
	console.log("Starting and validating");

	const app =
		await NestFactory.create<NestExpressApplication>(
			AppModule,
			{ cors: true },
		);

	app.set("trust proxy", 1);

	app.useGlobalPipes(new ValidationPipe());

	console.log("Server Started\n\nMapping documentation");

	const config = new DocumentBuilder()
		.setTitle("GamingDevs")
		.setDescription(sDescription.basic)
		.setExternalDoc(
			`Para acessar a documentação completa e um passo a passo detalhado da utilização desta aplicação acesse a rota /documentation ou clique aqui.`,
			"/documentation",
		)
		.setVersion("1.1")
		.addTag("Auth")
		.addTag("Users")
		.addTag("Profiles")
		.addTag("Favorites")
		.addTag("Games")
		.addTag("Genres")
		.addTag("Status")
		.addBearerAuth()
		.addServer("https://gamingdev.onrender.com")
		.addServer("http://localhost:3333")
		.build();
	const config2 = new DocumentBuilder()
		.setTitle("GamingDevs")
		.setDescription(sDescription.full)
		.setExternalDoc(
			`https://github.com/Malkavianson/gamingdevsApi/issues`,
			" https://github.com/Malkavianson/gamingdevsApi/issues",
		)
		.setExternalDoc(`Voltar para a HOME`, "/docs")
		.setVersion("1.1")
		.addTag("Status")
		.build();

	const document = SwaggerModule.createDocument(
		app,
		config,
	);
	const document2 = SwaggerModule.createDocument(
		app,
		config2,
		{ include: [AppModule] },
	);

	SwaggerModule.setup("docs", app, document);
	SwaggerModule.setup("documentation", app, document2);

	console.log("Swagger.setup Builded");
	console.log("Mapping routes:");

	await app.listen(PORT, () =>
		console.log(
			`App bootstraped at http://localhost:${PORT}`,
		),
	);
}
bootstrap();
