'use strict'

export const pegarListaDeAlunosStatusApi = async (cursoAluno, statusAluno) => {
    const url = `http://localhost:8080/v1/lion-school/alunos?status=${statusAluno}&curso=${cursoAluno}`
    const response = await fetch(url)
    const data = await response.json()
    const array = []
    array.push(data)

   
    return array
}



export const pegarListaDeAlunosCursoApi = async (cursoAluno) => {
    const url = `http://localhost:8080/v1/lion-school/alunos/?curso=${cursoAluno}`
    const response = await fetch(url)
    const data = await response.json()
    const array = []
    array.push(data)
   

    return array
}

export const pegarListaDeAlunosApi = async () => {
    const url = `http://localhost:8080/v1/lion-school/alunos/`
    const response = await fetch(url)
    const data = await response.json()
    const array = []
    array.push(data)

    return array
}