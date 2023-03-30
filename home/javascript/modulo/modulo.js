var listaCursos = require('../cursos')

const lista = listaCursos.cursos

const getListaCursos = function () {
    let status = true
    let arrayCursos = []
    let jsonCursos = {}
    let jsonCurso = {}

    lista.forEach((cards) => {
        jsonCursos = {
            nome: cards.nome,
            sigla: cards.sigla,
            icone: cards.icone,
            carga: cards.carga
        }

        arrayCursos.push(jsonCursos)
    })
    
    jsonCurso = {
        cursos: arrayCursos
    }

    if(jsonCurso != undefined){
        return jsonCurso
    }else{
        status = false
        return status
    }
}



module.exports = {
    getListaCursos
}
