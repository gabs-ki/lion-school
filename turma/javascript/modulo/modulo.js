var listaTurma = require('../alunos.js')

//Variavel para entrar na Json do Import
const lista = listaTurma.alunos
 

// Traz a lista de alunos completa
const getListaTurmaCompleta = function() {
    let status = true
    let jsonTurma = {}
    let arrayTurma = []
    let jsonAlunosTurma = {}

    //Entrar no import e percorrer o array
    lista.forEach((cardTurma) => {

        //Adiciona os dados em Json
        jsonTurma = {
            foto: cardTurma.foto,
            nome: cardTurma.nome,
            matricula: cardTurma.matricula,
            sexo: cardTurma.sexo,
            curso: cardTurma.curso,
            status: cardTurma.status
        }
        //Adiciona o Json em um Array
        arrayTurma.push(jsonTurma)
    })

    //Adiciona o Array em outro json
    jsonAlunosTurma = {
        turma: arrayTurma
    }

    //Validação de vazio ou erro
    if(jsonTurma != undefined) {
        return jsonAlunosTurma
    } else {
        status = false
        return status
    }
}

//Traz a lista de alunos por curso
const getListaAlunosCurso = function(curso) {
    let cursoSigla = curso
    let status = true
    let jsonAlunosCurso = {}
    let arrayAlunosCurso = []
    let jsonCurso = {}

    

    lista.forEach((cardAlunosCurso) => {

        //Percorrer a lista mais a fundo até chegar no curso
        cardAlunosCurso.curso.forEach((cardCurso) => {

            if(cursoSigla == cardCurso.sigla){
                
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

//Traz a lista de alunos por curso e status
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

//Exporta as funções
module.exports = {
    getListaTurmaCompleta,
    getListaAlunosCurso,
    getListaAlunosStatus
}