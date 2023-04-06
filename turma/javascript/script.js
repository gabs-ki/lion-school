'use strict'

import { pegarListaDeAlunosApi, pegarListaDeAlunosCursoApi } from "./api/turmaapi.js"

import { pegarListaDeAlunosStatusApi } from "./api/turmaapi.js"

const sigla = localStorage.getItem('curso')

const devolverArrayStatusFinalizado = async () => {
    const statusFinalizado = document.getElementById('status__finalizado')
    const aluno = await pegarListaDeAlunosStatusApi(sigla, statusFinalizado.textContent)
    

   return aluno
}

const voltarTela = () => {
    const sair = document.getElementById('sair')
    sair.addEventListener('click', () => {
        window.location.href = 'http://127.0.0.1:5501/home/index.html'
    })
}

const devolverArrayStatusCursando = async () => {
    const statusCursando = document.getElementById('status__cursando')
    const aluno = await pegarListaDeAlunosStatusApi(sigla, statusCursando.textContent)

    return aluno
}

const addCursando = await devolverArrayStatusCursando()

const addFinalizados = await devolverArrayStatusFinalizado()

const criarAluno = (card) => {
    const cardAluno = document.createElement('div')
    cardAluno.classList.add('cards__turma')
    cardAluno.setAttribute('matricula', card.matricula)

    const fotoAluno = document.createElement('img')
    fotoAluno.classList.add('foto__estudante')
    fotoAluno.src = card.foto
    

    const nomeAluno = document.createElement('p')
    nomeAluno.classList.add('descricao__aluno')
    nomeAluno.textContent = card.nome

    if(card.status == "Finalizado" ){
        cardAluno.classList.remove('cards__turma')
        cardAluno.classList.add('cards__turma__amarelo')
    }
    
    cardAluno.append(
        fotoAluno,
        nomeAluno
    )

    return cardAluno
}

const criarCard = (card) => {

    const cardAluno = document.createElement('div')
    cardAluno.classList.add('cards__turma')
    cardAluno.setAttribute('matricula', card.matricula)

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

    const statusFinalizado = document.getElementById('status__finalizado')

    statusFinalizado.addEventListener('click', async () => {

        let container =  document.getElementById('lista__alunos')

        const geracaoEstudantes = addFinalizados[0].turma.map(criarAluno)
      
        
        container.replaceChildren(...geracaoEstudantes)
      
        
    })

    cardAluno.addEventListener('click', async () => {
        localStorage.setItem('matricula', card.matricula)
       
        
        window.location.href = "http://127.0.0.1:5501/aluno/index.html"
    })
    

    cardAluno.append(
        fotoAluno,
        nomeAluno
    )

    return cardAluno

}

const mostrarAlunosGeral = async () => {
    const text = document.getElementById('status__geral')
    
    const cardAluno = document.getElementById('lista__alunos')
    text.addEventListener('click', async () => {
        
        const container = document.getElementById('lista__alunos')
    
        const geracaoEstudantes = alunoLista[0].turma.map(criarCard)
  
    
        container.replaceChildren(...geracaoEstudantes)
    })
    
    return cardAluno
}

const mostrarAlunosCursando = async () => {
    const statusCursando = document.getElementById('status__cursando')

    const cardAluno = document.getElementById('lista__alunos')
    statusCursando.addEventListener('click', async () => {
        const container = document.getElementById('lista__alunos')
        const geracaoEstudantes = addCursando[0].turma.map(criarAluno)

        container.replaceChildren(...geracaoEstudantes)
    })

    return cardAluno
}

const devolverArray = async () => {
    const alunoLista = await pegarListaDeAlunosCursoApi(sigla)
    return alunoLista
}


const alunoLista = await devolverArray()


const carregarAlunos = () => {
    const container = document.getElementById('lista__alunos')
    
    const geracaoEstudantes = alunoLista[0].turma.map(criarCard)
  
    
    container.replaceChildren(...geracaoEstudantes)
    container.replaceChild(mostrarAlunosGeral(), mostrarAlunosCursando())
   
    
}

voltarTela()
carregarAlunos() 