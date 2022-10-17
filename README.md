# [NEST API GamingDevs](https://gamingdev.onrender.com)

#### API em NEST para fins de aprendizagem

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

Este é o projeto do módulo cinco do curso de Desenvolvimento Full Stack da Blue Edtech.

Para esta aplicação foi desenvolvida uma API que administra dados de uma gaming store fictícia
Este apresenta fundamentos em NestJS e Prisma, além de conceitos como autenticação, bancos de dados relacionais, filtragem de buscas e documentação de projetos

## Pré-requisitos

-   **Node** com versão superior ou igual que 16.15.0 - [Node Download](https://nodejs.org/pt-br/download/)
-   **NPM** com versão superior ou igual que 8.5.5 - [Npm Download](https://www.npmjs.com/package/download)
-   **Nest.js** com versão superior ou igual que 8.5.5 - [Nest Download](https://docs.nestjs.com/)
-   **PostgreSQL** com versão superior ou igual que 8.2.6 - [PostgreSQL Download](https://www.postgresql.org/download/)

## Scripts disponíveis

Na pasta raíz do projeto podem ser executados os seguintes comandos:

## Clone o repositório:

```
$ gh repo clone Malkavianson/gamingdev
```

## Instalando as dependências:

```
$ npm install
```

## Executando o projeto

### Produção

```
npm run start
```

### Desenvolvimento

```
npm run start:dev
```

Para conseguir trabalhar com o banco de dados você deverá criar um arquivo .env e adicionar uma url de conexão com seu Postgres local com a chave DATABASE_URL.

```
DATABASE_URL="postgresql://yourUser:0000000@localhost:PORT/database"
```

Acesse [http://localhost:3333](http://localhost:3333) para visualizá-lo em seu navegador de forma local

---

> > ## Autor
> >
> > -   [Alexandre dos Santos Pereira Neto](https://www.linkedin.com/in/alexandrespneto/)

## Licença

-   MIT License (MIT)

## Execução

> ## comandos úteis:
>
> > -   nest g resource {nome} --no-spec
>
> > -   prisma generate
> > -   prisma db push
>
> ---
