'use strict'

import { pegarListaDeAlunosMatriculaApi } from './api/alunoapi.js'

const matricula = localStorage.getItem('matricula')

const devolverJsonMatriculaAlunos = async () => {
    const aluno = await pegarListaDeAlunosMatriculaApi(matricula)
    const arrayAlunos = []
    const jsonAlunos = {}

    arrayAlunos.push(aluno)

    jsonAlunos.matriculas = arrayAlunos

    

    return jsonAlunos
}

const aluno = await devolverJsonMatriculaAlunos()

const voltarTela = () => {
    const sair = document.getElementById('sair')
    sair.addEventListener('click', () => {
        window.location.href = 'http://127.0.0.1:5500/lion-school/turma/index.html'
    })
}

const criarAluno = (card) => {
    const cardAluno = document.createElement('div')
    cardAluno.classList.add('aluno')

    const fotoAluno = document.createElement('img')
    fotoAluno.classList.add('perfil__aluno')
    fotoAluno.src = card.foto

    const nomeAluno = document.createElement('p')
    nomeAluno.classList.add('descricao__aluno')
    nomeAluno.textContent = card.nome

    cardAluno.append(
        fotoAluno,
        nomeAluno
    )

    return cardAluno
}

const ctx = document.getElementById('myChart')

const atualizarGrafico = async () => {

    const nomeDisciplinas = aluno.matriculas[0].disciplinas.map((index) => {
       
        return index.nomeDisciplina
    })
   
    const checagemDeNotas = aluno.matriculas[0].disciplinas.map((index) => {
       
        return index.media
    })

    console.log( checagemDeNotas)

    let arrayColors = []

    checagemDeNotas.forEach((mediaMateria) => {
        if (mediaMateria >= 0 && mediaMateria < 50) {
            arrayColors.push("rgba(193, 16, 16, 1)")
        } else if (mediaMateria >= 50 && mediaMateria < 80) {
            arrayColors.push("rgba(299, 182, 87, 1")
        } else if (mediaMateria >= 80 && mediaMateria <= 100) {
            arrayColors.push("rgba(51, 71, 176, 1)")
        }
    });

    const myChart = new Chart(ctx, {
        
        type: 'bar',
        data: {
            labels: nomeDisciplinas,
            datasets: [
                {
                    label: 'Media de Notas',
                    data: checagemDeNotas,
                    borderWidth: 1,
                    borderRadius: 10,
                    backgroundColor: arrayColors
                }
            ],
        },
        options: {
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
          
    })

   
}

const carregarAlunos = async () => {
    const container = document.getElementById('conteudo__aluno')
    const geracaoEstudantes = aluno.matriculas.map(criarAluno)

    
    
    container.replaceChildren(...geracaoEstudantes)
    
}

atualizarGrafico()

carregarAlunos()

voltarTela()