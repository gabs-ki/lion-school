'use strict'

import { pegarListaDeCursosApi } from "./api/contatosapi.js"

const cursoss = await pegarListaDeCursosApi()


const criarCard = (card) => {

    
    const cardCurso = document.createElement('div')
    cardCurso.classList.add('cards')

      
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
        

    return cardCurso
}

const carregarContatos = () => {
    const container = document.getElementById('container__card')
    const geracaoCursos = cursoss[0].cursos.map(criarCard)

    container.replaceChildren(...geracaoCursos)
}

carregarContatos()