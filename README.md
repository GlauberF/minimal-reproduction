# PWA Vimbo

Nova estrutura em Angular.<br>
Tornando a criação de novos APP mais fácil, rápido e o mais dinâmico possível.

## Setup Inicial

-   git clone
-   npm install
-   Subir o server em desenvolvimento
    -   `npm run start`

## lint

-   toda vez que for fazer um `git -m commit` , será passado automaticamente um lint (verifica padrões estabelecidos pela Vimbo e Boas Práticas) e um format.
    Isso evita que algo chegue em nosso repositório fora de padrão ou com erros de linguage básico.
-   se quiser forçar rodar `ng lint` e format `"./node_modules/.bin/prettier '**/*.{ts,js,json,css,scss}' '.prettierignore*/{__name__,__directory__}/**' --write"`

## Dados de login homologação

**User Da Vimbo:**
glauber@vimbo.com.br / 123456

**User Normal:**
glauber_funez@hotmail.com / 123456 homologaç Homologação

## Boas Práticas

-   Utiliar as boas práticas da linguagem JavaScript e TypeScript
-   Utilizamos SSR, entao toda a manipulacao deve ser utilizando **VirtualDOMService**
-   Melhorias, sempre é bem vindo melhorias, se em algum lugar você acredita que poderia ser feito melhor, entre em contato com o Glauber, antes de qual quer alteração.
-   Utilizar nomenclatura, comentários etc.. em Inglês

## Bibliotecas

-   Utilizamos Angular Material
-   Componentes nossos mesmos
-   Nos forms detais, utilizamos a biblioteca (https://ngx-formly.github.io/ngx-formly/ui/material), (https://ngx-formly.github.io/ngx-formly/examples/introduction).

## Checklist - Alteração CRUD Padrão

- renomear arquivos e pasta de forma coerente ao componente que será feito e o nome deve ser em inglês

- **Pasta (component root):**
	- **.html**
		- renomear nome do componente/seletor sidebar
		- renomear nome do componente/seletor listar
	- **.scss normal **
		- alterar selector principal
	- **.thema.scss**
		- alterar nome dos seletores (separação se necessário utilizar hífen(-) )
		- alterar nome do thema para ser compativel como componente que esta fazendo (normalmente é nome-do-componente-frontend-structure-code-theme)
		- chamar dentro do thema pai
	- **.model.ts**
		- declarar todos os campos, mesmo que for utilizar somente uns
		- renomear export (PascalCase)
	- **.component.ts**
		- renomear export (PascalCase)
		- verificar se funções/variavel etc .. sao necessárias
	- **module.ts**
		- alterar caminho das chamas a componentes
		- renomear export (PascalCase)
		- verificar se os imports sao necessários ou se precisa fazer alguma mudança
	- **.settinges.ts**
		- alterar valor nas declarações, Obs: Arquivo responsável por setar algumas constantes utilizadas dentro do componente, evitando alguns trabalhos de mudança internos e repetitivos (ex: URL base do componente).
		- renomear export (PascalCase)


- **Pasta (componente list)**
	- **.html**
		- a principio só dar uma verificada mas esta ok
	- **.scss**
		- alterar nome dos seletores (separação se necessário utilizar hífen(-) )
		- dar uma verificada se precisa mudar algo a mais, mas a principio nao precisa
	- **.component.ts**
		- renomear export (PascalCase)
		- verificar se nao precisa criar alguma funçào ou váriavel a mais
		- dar uma geral, inclusive ver se nao tem import ou funçoes que nao sao utilizadas
		- ajustar strutura json (se tive vindo via HTTP ja estara ok e para alterar utilizar editor online)


- **Pasta (component details)**
	- **.html**
		- alterar campo na variavel title
		- verificar demais variaveis por garantia, exemplo avatar, pois tem CRUD que precisa do avatar e outros não
	- **.scss**
		- alterar nome dos seletores (separação se necessário utilizar hífen(-) )
		- dar uma verificada se precisa mudar algoa mais, mas a principio nao precisa
	- **.component.ts**
		- renomear export (PascalCase)
		- verificar se nao precisa criar alguma funçào ou váriavel a mais
		- alterar strutura json (se tive vindo via HTTP ja estara ok e para alterar utilizar editor online)
		- alterar o createForm com os campos do model certo
		- verificar se precisa criar mais funções ou váriaveis
		- dar uma geral, inclusive ver se nao tem import ou funçoes que nao sao utilizadas


- **Pasta (sidabars)**
	- **.html** 
		- a principio só dar uma verificada mas esta ok
	- **.scss**
		- renomear selector css
	- **.component**
		- renomear export (PascalCase)
		- verificar urls
		- dar uma geral
		- verificar ou acrecentar filtros (se tive vindo via HTTP ja estara ok e para alterar utilizar editor online)
		
		
- **Pasta (services)**
	- **.service.ts**
		- renomear export (PascalCase)
		- verificar URL API
		- verificar urls interna no navigate ou location
		- verificar o nome nas concatenações de mensagem
	- **queries.ts**
		- utilizado somente para GraphQl, os tipos são definidos em (src/@vimbo/graphql/type), se não tiver um tipo, crie um seguindo como padrão os outros.
		- alterar query conforme precisa

**Obs:**

-   Nome dos export deve ser sempre PascalCase (todas as primeiras letras em maiúscula e sem espaço conforme o prórpio nome PascalCase).
-   Deve ser utilizado inglês como prioridade (função, váriavel, descrições etc ..).
-   em todo span, placeholder, button etc, utilizar directive (transl) e escrever normal, pois depois dos arquivo de idioma, é so usar como selector a propria palavra ou frase e se a tradução por algum motivio falhar, nao vai bugar, pois for escrita noraml em portugues.
    matTooltip e alguns outros lugares precisa utilizar {{'palavra ou frase' | translater}}.
-   Utilizar sempre os melhores padrão de desenvolvimento.

-   PRINCIPALMENTE, NÃO TER PREGUIÇA DE OLHAR TODOS OS ARQUIVOS, PARA VER SE TUDO QUE DEFINIDO ESTA SENDO USADO!

## Mensagens de commit styleguide

[tipo do commit][escopo componente/modulo/app]: [descrição]<br>
[corpo opcional]<br>
[rodapé opcional]

Tipo | Type
------------ | -------------
feat | são quaisquer adições ao código. Enquanto elas podem alterar parte do código já existente, o foco dela é a implementação de features novas ao ecossistema
fix | refere-se às correções de bugs. Caso seu time trabalhe com issues ou com Jira, é possível com smart commits associar seu commit a uma issue e alterar seu estado com keywords como resolve, fix, solves. Em geral, essas marcações devem vir na descrição ou no footer.
refactor | refere-se a quaisquer mudanças que atinjam o código, porém não alterem sua funcionalidade. Alterou o formato de como é processamento em determinada parte da sua tela, mas manteve a mesma funcionalidade? Declare como refactor.
others | Alterações que não se encaixa nos mecnionados acima

### Exemplo
```bash
git commit -m "feat(component): Adiciona intrusões de contribuisão
>
> Foi adicionado ao arquivo README.md intrusões de
> como fazer um bom commit"
``` 
