const principalFont = document.getElementById('entry')
let principalStack = '0'
let principalValue = 0
principalFont.value = principalStack
const secondaryFont = document.getElementById('stack')
let secondaryStack = ''
let secondaryValue1 = 0
let secondaryValue2 = ''

let operator = '' // + *
let operatorSecondary = ''
let result = 0
let rebootEntry = true
let prevButton = ''
let btnValue = '' // value press

const rebootValues = () => {
  principalStack = '0'
  principalFont.value = principalStack
  principalValue = 0
  secondaryFont.innerHTML = ''
  secondaryStack = ''
  secondaryValue1 = 0
  secondaryValue2 = ''
  
  operator = ''
  operatorSecondary = ''
  result = 0
  rebootEntry = true
  prevButton = ''
}

const printAllValues = () => {
  console.log ('==================================')
  console.log ('principalStack es: ' + principalStack)
  console.log ('principalValue es: ' + principalValue)
  console.log ('result es: ' + result)
  console.log ('------------------------------')
  console.log ('secondaryStack es: ' + secondaryStack)
  console.log ('secondaryValue1 es: ' + secondaryValue1)
  console.log ('secondaryValue2 es: ' + secondaryValue2)
  console.log ('------------------------------')
  console.log ('prevButton es: ' + prevButton)
  console.log ('operator es: ' + operator)
  console.log ('operatorSecondary es: ' + operatorSecondary)
  console.log ('rebootEntry es: ' + rebootEntry)
  console.log ('==================================')
}
const form = document.querySelector('#buttons')
const buttons = form.querySelectorAll('input')

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    btnValue = event.target.value
    switch(btnValue){

      case '0': case '1': case '2': case '3': case '4':
      case '5': case '6': case '7': case '8': case '9':
        if(prevButton == '='){
          rebootValues()
        }
        if(rebootEntry == true || principalStack == '' || principalStack  == '0'){
          if(btnValue != '0'){
            rebootEntry = false
          }
          principalStack = btnValue /// when begin is here
        }else {
          principalStack += btnValue
        }
        updatePrincipal()
        break;
      
      case '.':
        if(principalStack.search(/[.]/) == -1){
          if(principalStack == '' || prevButton == '='){
            principalStack = '0.'
          }else{
            principalStack += '.'
          }
          rebootEntry = false
          updatePrincipal()
        }
        break;
      
      case '+/-':
          if(principalStack.search(/[-]/) == -1){
            principalStack = '-' + principalStack
          }else{
            principalStack = principalStack.slice(1,principalStack.length)
          }
          rebootEntry = false
          updatePrincipal()
        break;
      
      case '+': case '-': case '*': case '/':
        if(prevButton != btnValue){
          if(operator != ''){
            calcResult()
          }
          processSymbol(btnValue)
        }
        break;

      case 'del':
          if(principalStack.length > 0){
            principalStack = principalStack.slice(0,-1)
            updatePrincipal()
          }else{
            principalValue = 0
            secondaryValue1 = 0
            rebootEntry = true
          }
        break;
      
      case 'CE':
        principalStack = '0'
        principalValue = 0
        writePrimary(principalStack)
        break;

      case 'C':
        rebootValues()
        break;
      
      case 'x^1/2':
        if(principalStack != 0){
          writeSecondary(`${principalStack}^(1/2)`)
          principalStack = Math.sqrt(principalStack)
          updatePrincipal()
          rebootEntry = true
        }
        break;
      
      case 'x^2':
        if(principalStack != 0){
          writeSecondary(`${principalStack}^2`)
          principalStack = principalStack * principalStack
          updatePrincipal()
          rebootEntry = true
        }
        break;
      case '1/x':
        if(principalStack != 0){
          writeSecondary(`1/${principalStack}`)
          principalStack = 1 / principalStack
          updatePrincipal()
          rebootEntry = true
        }
        break;
      case '%':
        printAllValues()
        break;

      case '=':
        calcResult()
        break;
    }
    prevButton = btnValue
  })
})

const updatePrincipal = () => {
  principalValue = principalStack
  secondaryValue1 = principalValue
  writePrimary(principalStack)
}

const processSymbol = (symbol) => {
  operator = symbol
  secondaryValue1 = principalValue
  secondaryValue2 = secondaryValue1 //duplicate value, in result
  secondaryStack = addSecondary(secondaryValue1,operator,'','')
  writeSecondary(secondaryStack)
  principalStack = ''
  operatorSecondary = ''
  rebootEntry = true
}

const calcResult =() => {
  if(prevButton != btnValue){ // when they are not two =
    operatorSecondary = operator
  }
  if(operatorSecondary != ''){
    secondaryStack = addSecondary(secondaryValue2, operatorSecondary, secondaryValue1, btnValue)
    result = eval (`${secondaryValue2} ${operatorSecondary} ${secondaryValue1}`)
    secondaryValue2 = result /// is necesary for double =
  }else{
    secondaryStack = addSecondary(secondaryValue1,btnValue,'','')
    result = secondaryValue1
  }
  principalValue = result //check if result is not deleted
  principalStack = result
  writeSecondary(secondaryStack)
  writePrimary(principalStack)
  operator = ''
}

const addSecondary = (value1, value2, value3, value4) => {
  const total = value1.toString() + value2.toString() + value3.toString() + value4.toString()
  return total
}

const writeSecondary = (text) => {
  secondaryFont.innerHTML = text
}

const writePrimary = (text) => {
  principalFont.value = text
}
