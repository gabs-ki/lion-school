var listaTurma = require('../alunos.js')

const lista = listaTurma.alunos
 


const getListaTurmaCompleta = function() {
    let status = true
    let jsonTurma = {}
    let arrayTurma = []
    let jsonAlunosTurma = {}

    lista.forEach((cardTurma) => {
        jsonTurma = {
            foto: cardTurma.foto,
            nome: cardTurma.nome,
            matricula: cardTurma.matricula,
            sexo: cardTurma.sexo,
            curso: cardTurma.curso,
            status: cardTurma.status
        }

        arrayTurma.push(jsonTurma)
    })

    jsonAlunosTurma = {
        turma: arrayTurma
    }

    if(jsonTurma != undefined) {
        return jsonAlunosTurma
    } else {
        status = false
        return status
    }
}

const getListaAlunosCurso = function(curso) {
    let status = true
    let jsonAlunosCurso = {}
    let arrayAlunosCurso = []
    let jsonCurso = {}

    

    lista.forEach((cardAlunosCurso) => {

        cardAlunosCurso.curso.forEach((cardCurso) => {

            if(curso == cardCurso.sigla){
                
                jsonAlunosCurso = {
                    foto: cardAlunosCurso.foto,
                    nome: cardAlunosCurso.nome,
                    matricula: cardAlunosCurso.matricula,
                    sexo: cardAlunosCurso.sexo,
                    curso: cardAlunosCurso.curso,
                    status: cardAlunosCurso.status
                }
                
                arrayAlunosCurso.push(jsonAlunosCurso)
            }

           
        })
        
    })

    

    jsonCurso = {
        turma: arrayAlunosCurso
    }

    if(jsonAlunosCurso != null) {
        return jsonCurso
    } else {
        status = false
        return status
    }
}


const getListaAlunosStatus = function(curso,status) {
    let statusAluno = status
    let cursoAluno = curso
    let statusBoolean = true
    let jsonAlunosCursoStatus = {}
    let arrayAlunosCursoStatus = []
    let jsonCursoStatus = {}

    lista.forEach((cardAlunosCurso) => {

        cardAlunosCurso.curso.forEach((cardCurso) => {

            if(cursoAluno == cardCurso.sigla && statusAluno == cardAlunosCurso.status && cursoAluno != undefined){
                
                jsonAlunosCursoStatus = {
                    foto: cardAlunosCurso.foto,
                    nome: cardAlunosCurso.nome,
                    matricula: cardAlunosCurso.matricula,
                    sexo: cardAlunosCurso.sexo,
                    curso: cardAlunosCurso.curso,
                    status: cardAlunosCurso.status
                }
                
                arrayAlunosCursoStatus.push(jsonAlunosCursoStatus)

               
            } 

           
        })
        
    })

    jsonCursoStatus = {
        turma: arrayAlunosCursoStatus
    }

    if(jsonAlunosCursoStatus != null) {
        return jsonCursoStatus
    } else {
        statusBoolean = false
        return statusBoolean
    }
}


module.exports = {
    getListaTurmaCompleta,
    getListaAlunosCurso,
    getListaAlunosStatus
}