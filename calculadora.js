
const display = document.getElementById('display'); //Utilizando DOM para pegar o display

const numero = document.querySelectorAll('[id*=botao]'); //Utilizando query para selecionar todos as ID que contenham number
console.log(numero)

const operadores = document.querySelectorAll('[id*=operador]');
console.log(operadores)

let novoNumero = true
let operador;
let numeroAnterior;

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto;
        novoNumero = false
    }
    else {
        display.textContent += texto; //concatenar 
    }
}

//capturando o clique de cada botao//
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent)
numero.forEach(numero => numero.addEventListener('click', inserirNumero))

// Ira guardar o operador, o numero e também possibilitar zerar o display da calculadora para fazer a operação
const selecionarOperador = () => {
    if (!novoNumero) {
        novoNumero = true
        operador = evento.target.textContent
        numeroAnterior = display.textContent
        console.log(operador)
    }
}
operadores.forEach(operadores => operadores.addEventListener('click', selecionarOperador))