const entry = document.getElementById('entry')
const stack = document.getElementById('stack')

let mainValue = '' //string for show
let lastnumber = ''
let primaryValue = '' // string for control
let secondaryValue = '' //string
let btnValue = '' // value press
let operator = '' // + *
let result = 0
let rebootEntry = false
let join = false
let prevButton = ''

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
          mainValue = btnValue //save temp principal 
          rebootEntry = false
        }else {
          if(mainValue == '0'){  //if first value is 0
            rebootEntry = true
            mainValue = btnValue
          }else{
            mainValue += btnValue
          }
        }
        lastnumber = mainValue //save last number from input
        writePrimary(mainValue) //write main screen
        break;

      case '+': case '-': case '*': case '/':
        if(prevButton != btnValue){
          if(mainValue == ''){
            mainValue = '0'
            lastnumber = '0'
          }
          operator = btnValue
          primaryValue = mainValue // update value number one
          if(join == true){ //come from result
            lastnumber = mainValue // -was result-
            secondaryValue = addSecondary(primaryValue,operator,'','')
          }else{
            secondaryValue = addSecondary(mainValue,operator,'','')
          }
          writeSecondary(secondaryValue) //write secondary
          rebootEntry = true
        }
        break;

      case 'C':
        rebootValues()
        break;
      case '%':
        printAllValues
        break;

      case '=':
        if(prevButton == btnValue){
          secondaryValue = addSecondary(primaryValue,operator,lastnumber,btnValue)
        }else{
          secondaryValue = addSecondary(secondaryValue,lastnumber,btnValue,'')
        }
        result = eval (`${primaryValue} ${operator} ${lastnumber}`)
        console.log(`eval: ${primaryValue} ${operator} ${lastnumber} = ${result}`)
        mainValue = result
        primaryValue = result
        writeSecondary(secondaryValue)
        writePrimary(mainValue)
        join = true
        break;
    }
    prevButton = btnValue
  })
})

const processSymbol = () => {

}

const calcResult =() => {

}

const addSecondary = (value1, value2, value3, value4) => {
  const total = value1.toString() + value2.toString() + value3.toString() + value4.toString()
  return total
}

const writeSecondary = (text) => {
  stack.innerHTML = text
}

const writePrimary = (text) => {
  entry.value = text
}

const rebootValues = () => {
  entry.value = ''
  stack.innerHTML = ''
  mainValue = ''
  secondaryValue = ''
  operator = ''
  primaryValue = ''
  lastnumber = ''
  result = 0
  rebootEntry = false
  join = false
}
