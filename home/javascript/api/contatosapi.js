'use strict'

export const pegarListaDeCursosApi = async () => {
    const url = `http://localhost:8080/v1/lion-school/cursos`
    const response = await fetch(url)
    const data = await response.json()
    const array = []
    array.push(data)
    
    return array
}