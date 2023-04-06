'use strict'



const voltarTela = () => {
    const sair = document.getElementById('sair')
    sair.addEventListener('click', () => {
        window.location.href = 'http://127.0.0.1:5501/turma/index.html'
    })
}

voltarTela()