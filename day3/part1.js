const fs = require('fs')
let pattern = /mul\(\s*\d+\s*,\s*\d+\s*\)/g
let values = /(\d+)\s*,\s*(\d+)/
fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err)
    return
  }
  let matches
  let sum = 0
  while ((matches = pattern.exec(data)) !== null) {
    let numMatch = values.exec(matches[0])
    let firstNum = numMatch[1]
    let secondNum = numMatch[2]
    sum += Number(firstNum) * Number(secondNum)
  }
  console.log(sum)
})
