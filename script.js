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
          mainValue = btnValue
          rebootEntry = false
        }else {
          mainValue += btnValue
        }
        lastnumber = mainValue
        writePrimary(mainValue) //write mainValue
        break;
      case '+': case '-': case '*': case '/':
        if(prevButton != btnValue){
          primaryValue = mainValue // update data
          operator = btnValue
          if(join == true){
            lastnumber = result
          }
          addSecondary()
          writeSecondary(secondaryValue) //write secondary
          rebootEntry = true
        }
        break;
      case 'C':
        rebootValues()
        break;
      case '=':
        addSecondary()
        console.log(`eval: ${primaryValue} ${operator} ${lastnumber} = ${result}`)
        result = eval (`${primaryValue} ${operator} ${lastnumber}`)
        join = true
        mainValue = result
        primaryValue = result
        writeSecondary(secondaryValue)
        writePrimary(mainValue)
        break;
    }
    prevButton = btnValue
  })
})

const addSecondary = () => {
  if(prevButton == btnValue){
    secondaryValue = primaryValue + operator + lastnumber + btnValue //whe is =
  } else{
    if(secondaryValue == '0' || join == true){
      secondaryValue = mainValue + btnValue // 1. upload number and symbol
      join = false
    } else {
      secondaryValue += mainValue + btnValue //string increment
    }
  }
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
  secondaryValue = '0'
  operator = ''
  primaryValue = ''
  lastnumber = ''
  result = 0
  rebootEntry = false
  join = false
}
