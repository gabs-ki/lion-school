'use strict'

export const pegarListaDeAlunosMatriculaApi = async (matriculaAluno) => {
    const url = `http://localhost:8080/v1/lion-school/alunos/${matriculaAluno}`
    const response = await fetch(url)
    const data = await response.json()
   
    return data
}