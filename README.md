MovieList Manager 🎬
Status: Em Desenvolvimento
Aplicação web para gerenciamento pessoal de listas de filmes, integrando dados de múltiplas fontes e oferecendo uma experiência personalizada aos usuários.

✨ Funcionalidades Principais
🧑‍💻 Autenticação de Usuários
Criação de conta com e-mail/senha

Login seguro com JWT (JSON Web Tokens)

🎥 Gerenciamento de Filmes
Pesquisa de filmes por título

Adição/remoção de filmes na lista pessoal

Persistência dos dados entre sessões

🌐 Integração com APIs Externas
Combinação de dados do TMDB (The Movie Database) e OMDB (Open Movie Database)

Metadados completos dos filmes (ano, direção, duração, avaliações, etc.)

🛠 Tecnologias Utilizadas
Frontend
React/TypeScript: Biblioteca para construção de interfaces interativas e tipagem estática.

React Query: Gerenciamento de estado e cache de dados.

Zod: Validação de esquemas para garantir a integridade dos dados.

React Hook Form: Gerenciamento de formulários de forma performática.

React Router DOM: Roteamento para navegação entre páginas.

Tailwind CSS: Framework CSS utilitário para criação de interfaces modernas e responsivas.

Backend
C# com .NET: Framework robusto para construção de APIs escaláveis.

Entity Framework: ORM para interação com o banco de dados PostgreSQL.

Repository Pattern: Padrão de design para abstrair a lógica de acesso a dados.

Clean Architecture: Separação clara entre camadas (domínio, aplicação, infraestrutura).

JWT: Autenticação segura de usuários.

Bcrypt: Criptografia de senhas para armazenamento seguro.

Banco de Dados
PostgreSQL: Sistema de banco de dados relacional.

Docker: Containerização da aplicação para consistência entre ambientes.

🔍 Endpoints da API
Usuário
GET /api/User/get-username - Retorna o nome de usuário.

GET /api/User/movies-list - Retorna a lista de filmes do usuário.

POST /api/User - Registro de usuário.

POST /api/User/movies/{movieId} - Adiciona filme à lista do usuário.

DELETE /api/User/movies/{movieId} - Remove filme da lista do usuário.

Autenticação
POST /api/Auth/login - Realiza login do usuário.

POST /api/Auth/refresh-token - Atualização de token JWT.

POST /api/Auth/logout - Realiza logout do usuário.

Filmes
GET /api/Movie/{title} - Faz a requisição à API externa passando o título do filme e retorna os dados.
