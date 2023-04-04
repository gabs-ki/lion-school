'use strict'

import { pegarListaDeAlunosApi } from "./api/turmaapi.js"




const criarCard = (card) => {

    const cardAluno = document.createElement('div')
    cardAluno.classList.add('cards__turma')

    const fotoAluno = document.createElement('img')
    fotoAluno.classList.add('foto__estudante')
    fotoAluno.src = card.foto

    const nomeAluno = document.createElement('p')
    nomeAluno.classList.add('descricao__aluno')
    nomeAluno.textContent = card.nome

    if(card.status == "Finalizado"){
        cardAluno.classList.remove('cards__turma')
        cardAluno.classList.add('cards__turma__amarelo')
    }

    cardAluno.append(
        fotoAluno,
        nomeAluno
    )

    return cardAluno

}

const devolverArray = async () => {
    const alunoLista = await pegarListaDeAlunosApi()

    return alunoLista
}

const alunoLista = await devolverArray()
console.log(alunoLista)

const carregarAlunos = () => {
    const container = document.getElementById('lista__alunos')
    
    const geracaoEstudantes = alunoLista[0].turma.map(criarCard)
  
    
    container.replaceChildren(...geracaoEstudantes)
   
    
}

carregarAlunos() 