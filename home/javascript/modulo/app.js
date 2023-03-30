const express = require('express')

const cors = require('cors')

const bodyParser = require('body-parser')

const listaCursos = require('./modulo.js')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})

//EndPoints

app.get('/v1/lion-school/cursos', cors(), async function (request, response, next) {

    let cursos = listaCursos.getListaCursos()

    if(cursos) {
        response.status(200)
        response.json(cursos)
    } else {
        response.status(500)
    }
   
   
})

app.listen(8080, function(){
    console.log('Servidor aguardando requisições na porta 8080.')
})