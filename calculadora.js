
const display = document.getElementById('display'); //Utilizando DOM para pegar o display

const numero = document.querySelectorAll('[id*=botao]'); //Utilizando query para selecionar todos as ID que contenham number
console.log(numero)

const operadores = document.querySelectorAll('[id*=operador]');
console.log(operadores)

let novoNumero = true
let operador
let numeroAnterior

const operacaoNova = () => operador != undefined
const calcular = () => {
    if (operacaoNova()) {
        const numeroAtual = parseFloat(display.textContent.replace(',', '.')) //pegar a virgula e trocar por ponto
        novoNumero = true
        if (operador == '+') {
            atualizarDisplay(numeroAnterior + numeroAtual)
        } else if (operador == '-') {
            atualizarDisplay(numeroAnterior - numeroAtual)
        } else if (operador == '*') {
            atualizarDisplay(numeroAnterior * numeroAtual)
        } else if (operador == '/') {
            atualizarDisplay(numeroAnterior / numeroAtual)
        }
    }
}


function atualizarDisplay(texto) {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR'); //trazer o simbolo utilizado nos valores para o Brasil
        novoNumero = false;
    }
    else {
        display.textContent += texto; //concatenar 
    }
}

//capturando o clique de cada botao//
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent)
numero.forEach(numero => numero.addEventListener('click', inserirNumero))

// Ira guardar o operador, o numero e também possibilitar zerar o display da calculadora para fazer a operação //
const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular()
        novoNumero = true
        operador = evento.target.textContent
        numeroAnterior = parseFloat(display.textContent.replace(',', '.'))
        console.log(operador)
    }
}
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador))

//fazer com que o sinal de igual funcione da maneira correta
const acionarIgual = () => {
    calcular()
    operador = undefined;
}
document.getElementById('igual').addEventListener('click', acionarIgual)

//Limpar o display
const limparDisplay = () => display.textContent = ''
document.getElementById('limparDisplay').addEventListener('click', limparDisplay)

//Limpar o calculo para possibilitar que novos sejam feitos
const limparCalculo = () => {
    limparDisplay()
    operador = undefined
    novoNumero = true
    numeroAnterior = undefined
}
document.getElementById('limparCalc').addEventListener('click', limparCalculo)

//dando função ao backspace da calculadora
const removerCaractere = () => display.textContent = display.textContent.slice(0, -1) //utilizando do array para tirar o ultimo caractere
document.getElementById('backspace').addEventListener('click', removerCaractere)

//tornar o numero negativo ou positivo
const inverterSinal = () => {
    novoNumero = true
    atualizarDisplay(display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click', inverterSinal)

//adicionar a virgula ao numero e torna-lo decimal
const existirDecimal = () => display.textContent.indexOf(',') != -1;
const existirValor = () => display.textContent.length > 0;
const adicionarDecimal = () => {
    if (!existirDecimal()) {
        if (existirValor()) {
            atualizarDisplay(',')
        } else {
            atualizarDisplay('0,')
        }
    }
}
document.getElementById('decimal').addEventListener('click', adicionarDecimal)

//utilizar o teclado na calculadora
const teclado = {
    '0': 'botao0',
    '1': 'botao1',
    '2': 'botao2',
    '3': 'botao3',
    '4': 'botao4',
    '5': 'botao5',
    '6': 'botao6',
    '7': 'botao7',
    '8': 'botao8',
    '9': 'botao9',
    'Backspace': 'backspace',
    'Enter': 'igual',
    'c' : 'limparDisplay',
    'Escape': 'limparCalc',
    ',' : 'decimal',
    '/' :  'operadorDivisao',
    '*' : 'operadorMultiplicar',
    '+' : 'operadorAdicao',
    '-': 'operadorSubtracao',
    '=': 'igual'
}
const teclasTeclado = (evento) => {
    const tecla = evento.key
    const teclaExiste = () => Object.keys(teclado).indexOf(tecla) != -1
    if (teclaExiste()) document.getElementById (teclado[tecla]).click()
}
document.addEventListener ('keydown', teclasTeclado);