var listaAlunos = require('../alunos.js')

 
//Traz o aluno de acordo com a matrícula
const getMatricula = function(matricula){
    alunoMatricula = matricula
    let listaJson = {}
    let disciplinasArray = []
    let disciplinasJson = {}

    listaAlunos.alunos.forEach((aluno) => {
        if(alunoMatricula == aluno.matricula){
            listaJson = {
                nome: aluno.nome,
                foto: aluno.foto,
                matricula: aluno.matricula,
                sexo: aluno.sexo,
                status: aluno.status,
                nomeCurso: aluno.curso[0].nome,
                sigla: aluno.curso[0].sigla,
                icone: aluno.curso[0].icone,
                conclusao: aluno.curso[0].conclusao
            }

            aluno.curso[0].disciplinas.forEach((listaDisciplina) => {
                listaJson.disciplinas = disciplinasArray

                disciplinasJson = {
                    nomeDisciplina: listaDisciplina.nome,
                    sigla: listaDisciplina.nome,
                    media: listaDisciplina.media,
                    status: listaDisciplina.status
                }
                disciplinasArray.push(disciplinasJson)
            })

            
        }
    })
    return listaJson
}


//Exporta as funções
module.exports = {
    getMatricula
}