const express = require('express');
const cors = require('cors');
const {errors} = require('celebrate');
const routes = require('./routes');

const app =  express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.listen(3333);




/*
 * Rota / Recurso
 */

 /*
    Métodos HTTP:

    GET: Buscar uma informação no back-end
    POST: Criar uma informação no back-end
    PUT: Alterar uma informação no back-end
    DELETE: Deletar uma informação no back-end
 */

 /**
  * Tipos de parâmetros:
  * 
  * Query Params: Parâmetros nomeados enviados na rota após os '?' (filtro, paginação)
  * ROute Params: Parâmetros ultilizadospara indentificar recursos
  * Request Body: corpo da requisição, utilizado para criar ou alterar recursos
  */
 /**
  * Driver: SELECT * FROM users
  * Query builder: tabela('users').select('*').where()
  */