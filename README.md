## 1. Descrição do projeto

Este projeto gira em torno da ((20240413152844-ruyhrx5 "ideia")) de implementar o magic link auth com Typescript e Javascript. Inicialmente sendo feito com Typescript. O sistema será simples, com algumas poucas rotas e tendo seu foco em apenas implementar esse sistema de autenticação.

De primeira mão não haverá interface gráfica, mas após a API estar completa eu pretendo fazer uma interface gráfica com simples HTML e JS.

### 1.1 Arquitetura

Não será usada nenhuma estratégia específica, apenas rotas simples e cruas.

## 2. Requisitos

### 2.1 Requisitos funcionais

* [x] Deve ser possível registrar um usuário apenas com seu email
* [ ] Deve ser possível re-enviar o token
* [x] Deve existir um middleware que impede usuários não autenticados de acessar a tela de listagem
* [x] Deve ser possível enviar um link de acesso no email do usuário
* [x] Deve ser possível validar o link de acesso enviado no email do usuário
* [x] Deve ser possível visualizar uma listagem de usuários
* [ ] Deve ser possível visualizar uma navbar
* [x] Deve ser possível criar um cookie de autenticação

### 2.2 Regras de negócio

* [x] Em caso do email já estar cadastrado no banco de dados o sistema deve apenas enviar o link para o email do usuário
* [x] O token de acesso deve ser o ID do usuário
* [x] O token de acesso deve ser criptografado
* [x] Não deve ser possível acessar a tela de listagem de usuários caso o usuário tente acessar sem usar o link enviado no email dele
* [x] Assim que o usuário acessar o link o token deve ser invalidado ou deletado

### 2.3 Requisitos não funcionais

* [x] O cookie de autenticação deve possuir 1 semana de duração mínima
* [ ] Deve haver um countdown de 30 segundos para enviar outro token
* [x] O token de acesso deve durar até 1 hora