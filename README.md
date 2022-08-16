<h1>Desafio QuikDev Back-end</h1>

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TypeORM](https://img.shields.io/badge/typeorm-%23000000.svg?style=for-the-badge&logo=typeormt&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Desafio

- Contrução de sistema de autenticação por token
- Criação de post e realização de CRUD 
- Criação de comentários dos post 
  - Colocar checagem de permissão se possuir autenticação
- Com as postagens é preciso fazer um CRUD simples com algumas exigências
  - Apenas o próprio usuário pode editar ou excluir as postagens


### Documentação da API

```
- GET /users retorna a lista de usuarios cadastrados

- POST /users cadastra novo usuario
  - name
  - username
  - password

- PUT /users/[id] atualiza dado do usuario
  - name
  - username
  - *Necessario passar o BearerToken*

- DELETE /users/[id] deleta um usuario
  - id
  - *Necessario o usuario não ter nenhum post cadatrado*
  - *Necessario passar o BearerToken*
```
```
- GET /posts retorna lista de post
  - username
  - password
  - *Necessario passar o BearerToken*

- POST /posts cadastra um novo post
  - title
  - content
  - *Necessario passar o BearerToken*

- PUT /posts/[id] atualiza um post
  - title
  - content
  - *Necessario passar o BearerToken*

- DELETE /posts[id] deleta um post
  - *Necessario passar o BearerToken*
```
```
- GET /comments retorna comentario de um post
  - post _ID DO POST_
  - username
  - password
  - *Necessario passar o BearerToken*

- POST /comments cria um comentario em um post
  - postId 
  - content
  - *Necessario passar o BearerToken*

- PUT /comments/[id comentario] atualiza comentario de uma post
  - content
  - *Necessario passar o BearerToken*

- DELETE /comments/[id comentario] deleta um comentario
  - *Necessario passar o BearerToken*
```
```
- POST /auth/login realiza login
  - username
  - password
  - *Necessario passar o BearerToken*
```
<span style="font-size: 20px">OBS:
  - Para exclusão de um usuario é necessario que o usuario não tenha nenhum post e comentario cadastro no seu usuario;
  - Apenas o proprio usuario que fez o comentario que pode realizar edição e atualização e exclusão, da mesma maneria o post</span>

### Requerimentos

- Nodejs: 16.13.2

## Instalação

```bash
$ git clone git@github.com:leonardo534/desafio-quikdev-backend.git desafio-quikdev-backend
$ cd desafio-quikdev-backend
$ npm install
```

## Rodando o codigo

```bash
# Utilizando NPM:

$ npm run start
ou  
$ npm run start:dev

```

```bash
# Utilizando docker:

$ docker compose up

```