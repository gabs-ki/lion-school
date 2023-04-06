'use strict'

import { pegarListaDeCursosApi } from "./api/contatosapi.js"

const cursoss = await pegarListaDeCursosApi()

// export const nomesigla = cursoss[0].cursos

// export const sigla = () => {

//     let siglaa = {}
//     let array = []

//     nomesigla.forEach((nome) => {
//         siglaa = {
//             sigl: nome.sigla
//         } 

//         array.push(siglaa)
//     })

//     return array
// }

// console.log(sigla())


const criarCard = (card) => {
    const cardCurso = document.createElement('div')
    cardCurso.classList.add('cards')
    cardCurso.setAttribute("curso", card.sigla)
    cardCurso.classList.add('curso')
      
    const iconCurso = document.createElement('img')
    iconCurso.classList.add('icone__curso')
    iconCurso.src = card.icone

    const nomeCurso = document.createElement('p')
    nomeCurso.classList.add('nome__card')
    nomeCurso.textContent = card.sigla

    cardCurso.append(
        iconCurso,
        nomeCurso
    )

    cardCurso.addEventListener('click', () => {
        localStorage.setItem('curso', nomeCurso.textContent)
        
        window.location.href = "http://127.0.0.1:5501/turma/index.html"
        
    })
        

    return cardCurso
}


const carregarContatos = () => {
    const container = document.getElementById('container__card')
    const geracaoCursos = cursoss[0].cursos.map(criarCard)
    
    

    container.replaceChildren(...geracaoCursos)
}

carregarContatos()