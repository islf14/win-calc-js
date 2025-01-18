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

const form = document.querySelector('#buttons')
const buttons = form.querySelectorAll('input')

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    btnValue = event.target.value
    switch(btnValue){
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if(rebootEntry == true){
          mainValue = btnValue
          rebootEntry = false
        }else {
          mainValue += btnValue
        }
        lastnumber = mainValue
        writePrimary() //write mainValue
        break;
      case '+':
        primaryValue = mainValue // update data
        operator = btnValue
        rebootEntry = true
        // join = true
        addSecondary()
        writeSecondary() //write secondary
        break;
      case 'C':
        rebootValues()
        break;
      case '=':
        addSecondary()
        result = eval (`${primaryValue} ${operator} ${lastnumber}`)
        join = true
        console.log(`eval: ${primaryValue} ${operator} ${lastnumber} = ${result}`)
        mainValue = result
        primaryValue = result
        writeSecondary()
        writePrimary()
        // join = false
        break;
    }
  })
})

const addSecondary = () => {
  if(secondaryValue == '0' || join == true){
    secondaryValue = mainValue + btnValue // 1. upload number and symbol
    join = false
  } else {
    secondaryValue += mainValue + btnValue //stringg
  }
}

const writeSecondary = () => {
  stack.innerHTML = secondaryValue
}

const writePrimary = () => {
  entry.value = mainValue
}

const rebootValues = () => {
  entry.value = ''
  stack.innerHTML = ''
  mainValue = ''
  secondaryValue = '0'
  operator = ''
  result = 0
  rebootEntry = false
  join = false
}


