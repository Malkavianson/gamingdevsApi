export default {
	basic: `### Api de gerenciamento e persistencia de dados fake de jogos para fins educacionais

## Esta API possui os seguintes recursos:\n
	Autenticação\n
    Usuarios\n
    Perfis\n
    Favoritos\n
    Jogos\n
    Generos (dos jogos)\n
\n
**Modo de usar:**\n
    Utilizando a rota POST /users, registre um novo usuário respeitando seu respectivo 'schema'\n
    Autentique a conexão através da rota POST /auth/login enviando cpf e senha e salve o 'TOKEN' gerado\n
    Valide sua conexão com o token com autenticação ao portador(Bearer)\n
\n
## Rotas que não necessitam autenticação:\n
	Criação de usuários		@POST /users\n
	Autenticação 	 		@POST /auth/login\n
	Visualização de gêneros	@GET /genres\n
    Status do Servidor		@GET /status\n
\n
# IMPORTANTE!\n
A API ainda possui limitações e ainda está em construção.\n
Caso encontre erros ou tenha sugestões, favor abrir um card em:\n
		https://github.com/Malkavianson/gamingdevsApi/issues\n
	`,
	full: `\n
Api de gerenciamento e persistencia de dados fake de jogos para fins educacionais

### Esta API possui os seguintes recursos:\n
	Autenticação\n
    Usuarios\n
    Perfis\n
    Favoritos\n
    Jogos\n
    Generos (dos jogos)\n
\n\n
# Modo de usar:\n
\n
	Para utilizar uma rota em swagger você precisa sempre selecionar "try it out"\n
	e depois de inserir os dados selecionar "Execute"\n
\n
## Criar novo usuário:\n
A primeira coisa necessária é habilitar o seu cadastro na API, atualmente, é possível setar seu usuário como administrador logo na criação, mas em breve este recurso ficará indisponível\n
Pedimos que use esta ferramenta com cuidado, para não danificar o banco de dados.\n
\n\n
### @POST /users\n
	Criar novo usuário.\n
\n
### @POST /auth/login
	autenticar o usuário\n
	Insira o CPF e a Senha registrada\n
	Como resposta você receberá um TOKEN.\n\n
	Esta credencial deve ser enviada como header no front-end\n
	porém no SWAGGER precisa ser inserida manualmente em AUTHORIZE.\n
\n
### [ Authorize ]\n
	Após autorizar sua navegação você está apto à utilizar a API\n
\n
\n
# USERS\n
Esta rota gerencia todos os **usuários** da aplicação.\n
Os usuários possuem *cpf e email ÚNICOS*\n
Rotas disponíveis:
\n
	@POST /users:\n
		Criar um novo usuário\n
		\n
	@GET /users:\n
		Visualizar todos os usuários\n
		\n
	@GET /users/{id}\n
		Buscar um usuário pelo ID\n
		\n
	@PATCH /users/{id}\n
		Atualiza um usuário pelo ID\n
		\n
	@DELETE /users/{id}\n
		Deleta um usuário pelo ID\n
\n
# PROFILES\n
Esta rota gerencia todos os **perfis** da aplicação.\n
Os perfis são conectados aos **USUÁRIOS** e são estes que irão *FAVORITAR* os *JOGOS*\n
Rotas disponíveis:
\n
	@POST /profiles:\n
		Criar um novo perfil\n
		\n
	@GET /profiles:\n
		Visualizar todos os perfis\n
		\n
	@GET /profiles/{id}\n
		Buscar um perfil pelo ID\n
		\n
	@PATCH /profiles/{id}\n
		Atualiza um perfil pelo ID\n
		\n
	@DELETE /profiles/{id}\n
		Deleta um perfil pelo ID\n
\n
# FAVORITES\n
Essa rota é para gerenciar os **favoritos** dos perfis da aplicação.\n
Os favoritos são as conexões entre os *ids dos perfis* dos usuários e os *ids dos jogos*.\n
Rotas disponíveis:
\n
	@POST /favorites:\n
		Criar uma nova conexão favorita\n
	@DELETE /favorites:\n
		Deletar uma conexão favorita\n
	@GET /favorites/profiles/{id}\n
		Retorna todos as conexões favoritas de um perfil específico
\n
# GAMES\n
Esta rota gerencia todos os **jogos** do banco de dados.\n
Os jogos possuem *nome ÚNICO*\n
Somente **administradores** podem gerenciar jogos\n
\n
## Importante\n
	Os GÊNEROS dos jogos são incluídos UM POR VEZ\n
	e ATUALMENTE é possível apenas incluir gêneros\n
	o método de deleção de gêneros ainda está em desenvolvimento\n
\n
### Para adicionar um novo gênero:\n
Vá até *PATCH /games/{id}*\n
Inclua no **body** da requisição somente a propriedade conforme exemplo:\n
		{
			"genreId": "75s0a58e-fee1-4dqf-93ga-56e65522az1"
		}
\n
Rotas disponíveis:
\n
	POST /games:\n
		Criar um novo jogo\n
		\n
	@GET /games:\n
		Visualizar todos os jogos\n
		\n
	@GET /games/{id}\n
		Buscar um jogo pelo ID\n
		\n
	@PATCH /games/{id}\n
		Atualiza um jogo pelo ID\n
		\n
	@DELETE /games/{id}\n
		Deleta um jogo pelo ID\n
\n
# GENRES\n
Esta rota gerencia todos os **gêneros** da aplicação.\n
Os gêneros são conectados aos **JOGOS** e são estes que irão *FILTRAR* por categoria a exibição do conteúdo\n
Rotas disponíveis:
\n
	@POST /genres:\n
		Criar um novo gênero\n
		\n
	@GET /genres:\n
		Visualizar todos os gêneros\n
		\n
	@GET /genres/{id}\n
		Buscar um gênero pelo ID\n
		\n
	@PATCH /genres/{id}\n
		Atualiza um gênero pelo ID\n
		\n
	@DELETE /genres/{id}\n
		Deleta um gênero pelo ID\n
\n
\n
# IMPORTANTE!\n
A API ainda possui limitações e ainda está em construção.\n
Caso encontre erros ou tenha sugestões, favor abrir um card em:\n
		https://github.com/Malkavianson/gamingdevsApi/issues\n
	`,
};
