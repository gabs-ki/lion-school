'use strict'

import { pegarListaDeAlunosCursoApi } from "./api/turmaapi.js"

import { pegarListaDeAlunosStatusApi } from "./api/turmaapi.js"

const sigla = localStorage.getItem('curso')
const nomeCurso = localStorage.getItem('nomeCurso')


const devolverArrayStatusFinalizado = async () => {
    const statusFinalizado = document.getElementById('status__finalizado')
    const aluno = await pegarListaDeAlunosStatusApi(sigla, statusFinalizado.textContent)
    

   return aluno
}

const voltarTela = () => {
    const sair = document.getElementById('sair')
    sair.addEventListener('click', () => {
        window.location.href = 'http://127.0.0.1:5500/lion-school/home/index.html'
    })
}

const setarTitulo = () => {
    const container = document.getElementById('container__titulo__turma')

    const titulo = document.createElement('h1')
    titulo.classList.add('titulo__turma')
    titulo.textContent = nomeCurso

    container.append(
        titulo
    )

    return container
}

const devolverArrayStatusCursando = async () => {
    const statusCursando = document.getElementById('status__cursando')
    const aluno = await pegarListaDeAlunosStatusApi(sigla, statusCursando.textContent)

    return aluno
}

const addCursando = await devolverArrayStatusCursando()

const addFinalizados = await devolverArrayStatusFinalizado()

const criarAlunoFinalizados = (card) => {


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

    cardAluno.addEventListener('click', async () => {
        localStorage.setItem('matricula', card.matricula)
       
        
        window.location.href = "http://127.0.0.1:5500/lion-school/aluno/index.html"
    })

    
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

        const geracaoEstudantes = addFinalizados[0].turma.map(criarAlunoFinalizados)
      
        
        container.replaceChildren(...geracaoEstudantes)
        container.replaceChild(filtroPorAnoFinalizados())
        
    })

    cardAluno.addEventListener('click', async () => {
        localStorage.setItem('matricula', card.matricula)
       
        
        window.location.href = "http://127.0.0.1:5500/lion-school/aluno/index.html"
    })
    

    cardAluno.append(
        fotoAluno,
        nomeAluno
    )

    return cardAluno

}

const mostrarAlunosGeral = async () => {
    const inputYear = document.getElementById('input-year')

    const text = document.getElementById('status__geral')
    
    const cardAluno = document.getElementById('lista__alunos')
    text.addEventListener('click', async () => {
        
        const container = document.getElementById('lista__alunos')
    
        const geracaoEstudantes = alunoLista[0].turma.map(criarCard)
  
    
        container.replaceChildren(...geracaoEstudantes)
        container.replaceChild(filtroPorAno())


        if (!inputYear.value) {

            container.replaceChild(
                zerarFiltro()
            )
        } else {

            container.replaceChild(

                filtroPorAnoCursando()
            )
        }
    })
    
    return cardAluno
}

const mostrarAlunosCursando = async () => {
    const statusCursando = document.getElementById('status__cursando')

    const cardAluno = document.getElementById('lista__alunos')

    const inputYear = document.getElementById('input-year')

    statusCursando.addEventListener('click', async () => {

        const container = document.getElementById('lista__alunos')
        const geracaoEstudantes = addCursando[0].turma.map(criarAlunoFinalizados)

        container.replaceChildren(...geracaoEstudantes)
        
        
        if (!inputYear.value) {
            
            container.replaceChild(
                zerarFiltro()
            )
        } else {
            
            container.replaceChild(
                filtroPorAnoCursando()
            )
        }
            
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
    container.replaceChild(mostrarAlunosGeral(), mostrarAlunosCursando(), filtroPorAno())

    
}

const filtroPorAno = () => {

    const container = document.getElementById('lista__alunos')
    let alunos = alunoLista[0].turma.map(criarCard)
   

    const inputYear = document.getElementById('input-year')

    inputYear.addEventListener('keydown', (e) => {

        if (e.key == "Enter") {
            const ano = inputYear.value

            let jsonAlunos = alunosAno(alunoLista[0].turma, ano)
            
            alunos = jsonAlunos.listaAlunos.map(criarCard)

            container.replaceChildren(...alunos)
        }
    })
}

const filtroPorAnoFinalizados = () => {
    const container = document.getElementById('lista__alunos')
    let alunos = alunoLista[0].turma.map(criarCard)
   

    const inputYear = document.getElementById('input-year')

    inputYear.addEventListener('keydown', (e) => {

        if (e.key == "Enter") {
            const ano = inputYear.value

            let jsonAlunos = alunosAno(addFinalizados[0].turma, ano)
            
            
            alunos = jsonAlunos.listaAlunos.map(criarCard)

            container.replaceChildren(...alunos)
        }
    })
}

const filtroPorAnoCursando = () => {
    const container = document.getElementById('lista__alunos')
    let alunos = alunoLista[0].turma.map(criarCard)
   
    const inputYear = document.getElementById('input-year')

    inputYear.addEventListener('keydown', (e) => {

        if (e.key == "Enter") {
            const ano = inputYear.value

            let jsonAlunos = alunosAno(addCursando[0].turma, ano)
          
            alunos = jsonAlunos.listaAlunos.map(criarCard)

            container.replaceChildren(...alunos)
        }
    })
}

const zerarFiltro = () => {
    const container = document.getElementById('lista__alunos')
    let alunos = alunoLista[0].turma.map(criarCard)
   
    const inputYear = document.getElementById('input-year')

    inputYear.addEventListener('keydown', (e) => {

        if (e.key == "Enter") {

                alunos = alunoLista[0].turma.map(criarCard)

                container.replaceChildren(...alunos)
            

        }
    })
}

const alunosAno = (array, anoConclusao) => {
    let ano = anoConclusao
    let lista = array
    let jsonAluno = {}
    let listaAlunos = []
    let jsonLista = {}

    lista.forEach((aluno) => {
        aluno.curso.forEach((alunoDois) => {
            if (alunoDois.conclusao == ano) {

                jsonAluno = {
                    nome: aluno.nome,
                    foto: aluno.foto,
                    matricula: aluno.matricula,
                    sexo: aluno.sexo,
                    status: aluno.status,
                    curso: aluno.curso
                }
                listaAlunos.push(jsonAluno)
            }
       
       
      
            
        })
        
    })

   
    
    jsonLista = {
        listaAlunos
    }

    return jsonLista
}





setarTitulo()
voltarTela()
carregarAlunos() 