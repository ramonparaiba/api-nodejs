# api-nodejs
Simple api in development with nodejs, for studys ends

Estou seguindo o seguinte roteiro:
Roteiro de estudos

1- Criar o arquivo package.json para listar nossas dependencias
$ npm init -y

2 - instalar o express - microframework para lidar com rotas(urls) e views(formas de visualizar)
$ npm install express

3 - criar arquivo principal server.js
4 - Criar o primeiro server
const express = require ('express')
const app = express()
app.listen(3000)
5 - A primeira rota a gente nunca esquece
app.get('/', (req, res)=>{
    res.send("Vamos lá rotear!")
})

6 - Pra n ficar feito fresco derrubando e subindo o servidor, o que fazer? NODEMON neeeles amigo!
$ npm install -D nodemon
*devDependencies só serão usadas em modo de desenvolvimento.
para usar o nodemon, criar um script "dev" no package.json no índice "scripts"

"dev": "nodemon server.js"
agora pra rodar, $npm run dev

7 -instalar o Docker para usar o mongodb containerizado.
$docker pull mongo        //puxa o mongo
$ docker run --name mongodb -p 27017:27017 -d mongo      //cria o container e já roda na porta especificada
$docker ps     //ve os containers que estao rodando na máquina.

8 - acessando o as informaçoes do mongo (schemas, databases, etc)
- Robo3t --> robomongo.org
sempre que reiniciar o computador, é preciso startar o container do mongo
$docker start nome_do_servico

9 - Fazer a conexão com o banco de dados dentro do código
$npm install mongoose
mongoose é um ORM(Object Relation Maping) para bancos não relacionais
basicamente ele encapsula a lógica das operações do banco de dados or meio do código
ou seja, as operaçoes no banco (inserts, deletes, updates) são realizadas utiliando código Javascript

10 - No server.js dar um require no 'mongoose'
//inicio do code
mongoose.connect('mongodb://localhost:27017/nodeapi', 
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
//primeiras rotas

11 - Criar o primeiro model (grosso modo é a representação de uma tabela no banco de dados)
criar a árvore de diretórios src>models
e dentro do diretório módels criar o arquivo Product.js (iniciais maiúsuclas mesmo)
12 - configurar o Product.js
dentro desse arquivo, basicamente deve ser informado o schema (campos e tipos de valores que, neste caso, o produto pode ter)

13 - por fim, fazer um require no server.js logo após a conexao  do mongoose.
14 - instalar o require-dir para automatiar esses requires ai, menino.
$npm install require-dir

importar//
const requireDir = require('require-dir')
pronto.. agora é só dar um requireDir ('./src/models') que qualquer model criado já vai ser automaticamente chamado.

15 - Testar natoralmente a inserção de valores no banco
const Product = mongoose.model('Product')

app.get('/', (req, res)=>{
    Product.create({
        title: 'React Native',
        description: 'Build native apps with react',
        url: 'https://github.com/facebook/react-native'
    })
    return res.send("Primeira rota, rota bacana!")
})

16 - SoC - saiba separar as coisa, parça!!
#separa as roltas, cria um arquivo routes.js dentro de src

dentro jogar a rota que tava em server.js.. só lembrar de trocar app.get... por routes.get

#No server.js deve ter uma referência pra escutar as coisas a partir do arquivo rotas... 
app.use('/api', require('./src/routes'))

#Criar dentro de src o diretório controllers, e criar o ProductController.js pra começar a festa

#fazer os controllers e as rotas, index, show, update, destroy. (get, get:id, update:id, delete:id)

17- Implementar paginação
$ npm install mongoose-paginate
dentro do model Product chmar o mongoosePaginate
const mongoosePaginate = require('mongoose-paginate')
.
.
.
antes da ultima ação do model, inserir alinha
ProductSchema.plugin(mongoosePaginate)
##Pensa bem, quem tá listando todos os caras na tela é o controller INDEX()... ele tá usando o método find() pra isso. desse jeito ele tá trazendo tudo, porém queremos limitar a quantidade de itens do retorno... o que fazer?
trocar o find por paginate().. como segue:
const products = await Product.paginate({}, {page: 1, limit: 6})

##Definir parametros para a paginação
na função index, antes do paginate, definir a page de referência (no caso, page=1.
const {page = 1} = req.query
        const products = await Product.paginate({}, {page, limit: 6})


18 - Lidar com CORS (filhadasputa)
$ npm install cors
em server.js chamar ele e começar a usar...

