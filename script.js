const principalScreen = document.getElementById('entry') //entry
let principalStack = '' //mainValue
let principalValue = '' // primaryValue
const secondaryScreen = document.getElementById('stack') //stack
let secondaryStack = '' //secondaryValue
let secondaryValue = '' //lastnumber

let operator = '' // + *
let result = 0
let rebootEntry = false
let join = false
let btnValue = '' // value press
let prevButton = ''

const rebootValues = () => {
  principalScreen.value = ''
  principalStack = ''
  principalValue = ''
  secondaryScreen.innerHTML = ''
  secondaryStack = ''
  secondaryValue = ''
  
  operator = ''
  result = 0
  rebootEntry = false
  join = false
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
        if(rebootEntry == true){
          principalStack = btnValue //save temp principal 
          rebootEntry = false
        }else {
          if(principalStack == '0'){  //if first value is 0
            rebootEntry = true
            principalStack = btnValue
          }else{
            principalStack += btnValue
          }
        }
        secondaryValue = principalStack //save last number from input
        writePrimary(principalStack) //write main screen
        break;

      case '+': case '-': case '*': case '/':
        if(prevButton != btnValue){
          if(join != true){
            processSymbol(btnValue)
          }else{
            processSymbol('=')
            // calcResult()
          }
        }
        break;

      case 'C':
        rebootValues()
        break;
      case '%':
        printAllValues
        break;

      case '=':
        calcResult()
        break;
    }
    prevButton = btnValue
  })
})

const symbolResult = () => {

}

const processSymbol = (buttonVal) => {
  if(principalStack == ''){
    principalStack = '0'
    secondaryValue = '0'
  }
  principalValue = principalStack // update value number one
  operator = btnValue
  if(join == true){ //come from result
    secondaryValue = principalStack // -was result-
    secondaryStack = addSecondary(principalValue,operator,'','')
  }else{
    secondaryStack = addSecondary(principalStack,operator,'','')
  }
  writeSecondary(secondaryStack) //write secondary
  rebootEntry = true
}

const calcResult =() => {
  if(prevButton == btnValue){
    secondaryStack = addSecondary(principalValue,operator,secondaryValue,btnValue)
  }else{
    secondaryStack = addSecondary(secondaryStack,secondaryValue,btnValue,'')
  }
  result = eval (`${principalValue} ${operator} ${secondaryValue}`)
  console.log(`eval: ${principalValue} ${operator} ${secondaryValue} = ${result}`)
  principalStack = result
  principalValue = result
  writeSecondary(secondaryStack)
  writePrimary(principalStack)
  join = true
}

const addSecondary = (value1, value2, value3, value4) => {
  const total = value1.toString() + value2.toString() + value3.toString() + value4.toString()
  return total
}

const writeSecondary = (text) => {
  secondaryScreen.innerHTML = text
}

const writePrimary = (text) => {
  principalScreen.value = text
}

