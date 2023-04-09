const express = require('express')

const cors = require('cors')

const bodyParser = require('body-parser')

const listaCursos = require('./modulo.js')

const listaMatriculas = require('../../../aluno/javascript/modulo/modulo.js')

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

app.get('/v1/lion-school/alunos/:matricula', cors(), async function (request, response, next){
    let statusCode
    let dadosAluno = {} 

    let matriculaAluno = request.params.matricula

        if(matriculaAluno == "" || matriculaAluno == undefined || isNaN(matriculaAluno)){
            statusCode = 400
            dadosAluno.message = 'Não foi possível acessar pois os dados de entrada (matricula) não corresponde ao exigido, confira o valor, pois não pode ser vazio e precisar ser a caracteres'
        }else{
            let aluno = listaMatriculas.getMatricula(matriculaAluno)

            if(aluno){
                statusCode = 200
                dadosAluno = aluno
            }else{
                statusCode = 400
            }

            response.status(statusCode)
            response.json(dadosAluno)
        }
})

app.listen(8080, function(){
    console.log('Servidor aguardando requisições na porta 8080.')
}) 