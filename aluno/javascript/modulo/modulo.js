var listaAlunos = require('../alunos.js')



const getMatricula = function(matricula){
    matriculaAluno = matricula
    let listaInformacoesJson = {}
    let informacoesDisciplinasArray = []
    let informacoesDisciplinasJson

    listaAlunos.alunos.forEach(function(aluno){
        if(matriculaAluno == aluno.matricula){
            listaInformacoesJson = {
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

            aluno.curso[0].disciplinas.forEach(function(listaDisciplina){
                listaInformacoesJson.disciplinas = informacoesDisciplinasArray

                informacoesDisciplinasJson = {
                    nomeDisciplina: listaDisciplina.nome,
                    sigla: listaDisciplina.nome,
                    media: listaDisciplina.media,
                    status: listaDisciplina.status
                }
                informacoesDisciplinasArray.push(informacoesDisciplinasJson)
            })

            
        }
    })
    return listaInformacoesJson
}



module.exports = {
    getMatricula
}