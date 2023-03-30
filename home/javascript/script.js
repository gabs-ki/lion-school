'use strict'

import { cursos } from "./cursos.js"



const cros = cursos

const criarCard = (indice, curso) => {
    
    const cardCurso = document.createElement('div')
    cardCurso.classList.add('cards')
    cardCurso.id = cursos.sigla
    
    
    const iconCurso = document.createElement('ion-icon')
    iconCurso.name = 'globe-outline'
    iconCurso.classList.add('icone__curso')

    const nomeCurso = document.createElement('p')
    nomeCurso.classList.add('nome__card')
    nomeCurso.textContent = cursos[0].sigla
   
    cardCurso.append(
        
        iconCurso,
        nomeCurso
    )

    return cardCurso
}

const carregarContatos = (indice) => {
    const container = document.getElementById('container__card')
    const geracaoCursos = cursos.map(criarCard)

    container.replaceChildren(...geracaoCursos)
}

carregarContatos()