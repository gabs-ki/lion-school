const express = require('express')

const cors = require('cors')

const bodyParser = require('body-parser')

const listaCursos = require('./modulo.js')

const listaAlunos = require('../../../turma/javascript/modulo/modulo.js')

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
        console.log('aqui é o curso')
        response.status(200)
        response.json(cursos)
    } else {
        response.status(500)
    }
   
   
})

app.get('/v1/lion-school/alunos/', cors(), async function(request, response, next) {

    let statusCode
    let dadosCurso

    let nomeCurso = request.query.curso
    let statusAluno = request.query.status

    if(nomeCurso == null && statusAluno == null) {

       let turma = listaAlunos.getListaTurmaCompleta()
       
       if(turma){
       
        statusCode = 200
        dadosCurso = turma
       } else {
        statusCode = 404
       }

    } else if(nomeCurso != null && statusAluno != null){

        let turmaStatus = listaAlunos.getListaAlunosStatus(nomeCurso,statusAluno)
        
        if(turmaStatus){
         
            statusCode = 200
            dadosCurso = turmaStatus
        } else {
            statusCode = 404
        }

    } else if (nomeCurso != null && statusAluno == null) {

        let turmaCurso = listaAlunos.getListaAlunosCurso(nomeCurso)
        
        
        if(turmaCurso) {
            
            statusCode = 200
            dadosCurso = turmaCurso
        } else {
            statusCode = 404
        }

    } else {
        statusCode = 404
    }
    
    response.status(statusCode)
    response.json(dadosCurso)

})


app.listen(8080, function(){
    console.log('Servidor aguardando requisições na porta 8080.')
}) 