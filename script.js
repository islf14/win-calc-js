const principalFont = document.getElementById('entry') //entry
let principalStack = '' //mainValue
let principalValue = 0 // primaryValue
const secondaryFont = document.getElementById('stack') //stack
let secondaryStack = '' //secondaryValue
let secondaryValue = '' //lastnumber

let operator = '' // + *
let operatorSecondary = ''
let result = 0
let rebootEntry = true
let join = false
let prevButton = ''
let btnValue = '' // value press

const rebootValues = () => {
  principalFont.value = ''
  principalStack = ''
  principalValue = 0
  secondaryFont.innerHTML = ''
  secondaryStack = ''
  secondaryValue = ''
  
  operator = ''
  operatorSecondary = ''
  result = 0
  rebootEntry = true
  join = false
  prevButton = ''
}

const printAllValues = () => {
  console.log ('-------------------------------------')
  console.log ('principalStack es: ' + principalStack)
  console.log ('principalValue es: ' + principalValue)
  console.log ('secondaryStack es: ' + secondaryStack)
  console.log ('secondaryValue es: ' + secondaryValue)
  console.log ('operator es: ' + operator)
  console.log ('operatorSecondary es: ' + operatorSecondary)
  console.log ('result es: ' + result)
  console.log ('prevButton es: ' + prevButton)
  console.log ('rebootEntry es: ' + rebootEntry)
  console.log ('join es: ' + join)
  console.log ('-------------------------------------')
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
        principalValue = principalStack //save last number from input
        writePrimary(principalStack)
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
            principalValue = principalStack
            writePrimary(principalStack)
          }else{
            principalValue = 0
            rebootEntry = true
          }
        break;

      case 'C':
        rebootValues()
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

const processSymbol = (symbol) => {
  operator = symbol
  if(join == true){ //come from result
    principalValue = result
    join = false
  }
  secondaryValue = principalValue //duplicate value
  secondaryStack = addSecondary(principalValue,operator,'','')
  writeSecondary(secondaryStack)
  principalStack = ''
  operatorSecondary = ''
  rebootEntry = true
}

const calcResult =() => {
  principalStack = ''
  console.log('principal value is: ' + principalValue)
  if(prevButton != btnValue){
    operatorSecondary = operator
  }
  if(operatorSecondary != ''){
    secondaryStack = addSecondary(secondaryValue, operatorSecondary, principalValue, btnValue)
    result = eval (`${secondaryValue} ${operatorSecondary} ${principalValue}`)
    secondaryValue = result /// is necesary for double =
  }else{
    secondaryStack = addSecondary(principalValue,btnValue,'','')
    result = principalValue
  }
  writeSecondary(secondaryStack)
  writePrimary(result)
  operator = ''
  join = true
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
