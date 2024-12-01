const fs = require('node:fs')

fs.readFile('./input.txt', 'utf8', (err, data) => {
  let count = 0
  arr = data.split('\n')
  arr.pop()
  let first = []
  let second = []
  arr.forEach((el) => {
    spl = el.split('   ')
    first.push(Number(spl[0]))
    second.push(Number(spl[1]))
  })

  first = first.sort((a, b) => a - b)
  second = second.sort((a, b) => a - b)

  first.forEach((el, i) => {
    if (second[i]) {
      count += Math.abs(el - second[i])
    }
  })
  console.log(count)
})
