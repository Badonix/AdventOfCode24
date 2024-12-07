const fs = require('fs')
let count = 0

function evaluateLeftToRight(expression) {
  let tokens = expression.split(/(\+|\*|\|)/)
  while (tokens.length != 1) {
    let first = Number(tokens.shift())
    let operation = tokens.shift()
    let second = Number(tokens.shift())
    if (operation == '+') {
      tokens.unshift(first + second)
    } else if (operation == '*') {
      tokens.unshift(first * second)
    } else {
      tokens.unshift(first.toString() + second.toString())
    }
  }

  return tokens[0]
}

let iterCount = 0
function generateCombinations(length) {
  const result = []
  const helper = (current) => {
    if (current.length === length) {
      result.push(current)
      return
    }
    if (current.length > length) {
      return
    }
    helper(current + '+')
    helper(current + '*')
    helper(current + '|')
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

  let current = 0
  equations.forEach((equation) => {
    iterCount++
    const clone = equation.split(':')
    const answ = Number(clone[0])
    const secondPart = clone[1].trim().split(' ')

    const possibles = generateCombinations(secondPart.length - 1)

    let found = false
    let total = possibles.length * possibles.length
    for (let i = 0; i < possibles.length; i++) {
      current++
      let combo = possibles[i]
      let eq = secondPart[0]
      for (let j = 0; j < combo.length; j++) {
        eq += combo[j] + secondPart[j + 1]
      }
      if (evaluateLeftToRight(eq) == answ) {
        count += answ
        console.log(
          `[${iterCount}/850](${Math.round((iterCount * 100) / 850)}%) - ${eq}`,
        )
        found = true
        break
      }
    }
    if (!found) {
      console.log(
        `[${iterCount}/850](${Math.round((iterCount * 100) / 850)}%)  - X`,
      )
    }
  })
  console.log(count)
})
