# MovieList Manager 🎬

![Status](https://img.shields.io/badge/status-em_desenvolvimento-yellow)

Aplicação web para gerenciamento pessoal de listas de filmes, integrando dados de múltiplas fontes e oferecendo uma experiência personalizada aos usuários.
Acessível em [movnet.tech](https://movnet.tech)

## ✨ Funcionalidades Principais

### 🧑‍💻 Autenticação de Usuários
- Criação de conta com e-mail/senha
- Login seguro com JWT (JSON Web Tokens)
- Gerenciamento de sessão do usuário

### 🎥 Gerenciamento de Filmes
- Pesquisa de filmes por título
- Adição/remoção de filmes na lista pessoal
- Persistência dos dados entre sessões
- Organização personalizada de listas

### 🌐 Integração com APIs Externas
- Combinação de dados do TMDB (The Movie Database) e OMDB (Open Movie Database)
- Metadados completos dos filmes:
  - Ano de lançamento
  - Título Original
  - Duração
  - Avaliações
  - Sinopse
  - Informações técnicas

## 🛠 Tecnologias Utilizadas

### Frontend
- **React/TypeScript**: Interface interativa com tipagem estática
- **React Query**: Gerenciamento de estado e cache
- **Zod**: Validação de esquemas de dados
- **React Hook Form**: Gerenciamento performático de formulários
- **React Router DOM**: Sistema de navegação entre páginas
- **Tailwind CSS**: Estilização responsiva e moderna

### Backend
- **C#/.NET**: Construção de API robusta e escalável
- **Entity Framework**: ORM para PostgreSQL
- **Repository Pattern**: Abstração de acesso a dados
- **Clean Architecture**: Separação de camadas
- **JWT**: Autenticação segura
- **Bcrypt**: Criptografia de senhas

### Infraestrutura
- **PostgreSQL**: Banco de dados relacional
- **Docker**: Containerização e ambiente consistente
- **Swagger**: Documentação de API

## 🔍 Endpoints da API

### 👤 Usuário
```bash
GET    /api/User/get-username     # Obtém nome de usuário
GET    /api/User/movies-list      # Lista filmes do usuário
POST   /api/User                  # Registra novo usuário
POST   /api/User/movies/{movieId} # Adiciona filme à lista
DELETE /api/User/movies/{movieId} # Remove filme da lista
```
### 🔑 Autenticação
```bash
POST /api/Auth/login         # Login do usuário
POST /api/Auth/refresh-token # Atualiza token JWT
POST /api/Auth/logout        # Logout do usuário
```
### 🎬 Filmes
```bash
GET /api/Movie/{title}  # Busca filme por título (integração com APIs externas)
```

## Informações Técnicas

### 🏠 Hospedagem
- Projeto hospeadado em uma instância EC2 da AWS.
- Banco de dados em uma instância do RDS.

### 🚢 Docker
Front-end e Back-end rodando como serviços em contêineres Docker.
