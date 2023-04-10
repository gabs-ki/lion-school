'use strict'

import { pegarListaDeCursosApi } from "./api/contatosapi.js"

const cursoss = await pegarListaDeCursosApi()




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
    nomeCurso.setAttribute("cursoNome", card.nome)

   

    cardCurso.append(
        iconCurso,
        nomeCurso
    )

    cardCurso.addEventListener('click', () => {
        localStorage.setItem('curso', nomeCurso.textContent)
        localStorage.setItem('nomeCurso', nomeCurso.getAttribute('cursoNome') )
        
        
        window.location.href = "http://127.0.0.1:5500/lion-school/turma/index.html"
        
    })
        

    return cardCurso
}


const carregarContatos = () => {
    const container = document.getElementById('container__card')
    const geracaoCursos = cursoss[0].cursos.map(criarCard)
    
    

    container.replaceChildren(...geracaoCursos)
}

carregarContatos()