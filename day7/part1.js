const fs = require('fs')
let count = 0

function evaluateLeftToRight(expression) {
  let tokens = expression.split(/(\+|\*)/)
  while (tokens.length != 1) {
    let first = Number(tokens.shift())
    let operation = tokens.shift()
    let second = Number(tokens.shift())
    if (operation == '+') {
      tokens.unshift(first + second)
    } else {
      tokens.unshift(first * second)
    }
  }

  return tokens[0]
}

function generateCombinations(length) {
  const result = []
  const helper = (current) => {
    if (current.length === length) {
      result.push(current)
      return
    }
    helper(current + '+')
    helper(current + '*')
  }
  helper('')
  return result
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log('ERR')
    return
  }
  const equations = data.split('\n').filter((line) => line.trim() !== '')

  equations.forEach((equation) => {
    const clone = equation.split(':')
    const answ = Number(clone[0])
    const secondPart = clone[1].trim().split(' ')

    const possibles = generateCombinations(secondPart.length - 1)

    for (let i = 0; i < possibles.length; i++) {
      let combo = possibles[i]
      let eq = secondPart[0]
      for (let j = 0; j < combo.length; j++) {
        eq += combo[j] + secondPart[j + 1]
      }
      if (evaluateLeftToRight(eq) == answ) {
        count += answ
        break
      }
    }
  })
  console.log(count)
})
