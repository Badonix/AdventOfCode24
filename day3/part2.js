const fs = require('fs')
let pattern = /mul\(\d*,\d*\)|do\(\)|don't\(\)/g
let values = /(\d+)\s*,\s*(\d+)/
fs.readFile('./input.txt', 'utf8', (err, data) => {
  spl = data.split('\n')
  let sum = 0
  spl.forEach((el) => {
    let shouldSum = true
    while ((matches = pattern.exec(el)) != null) {
      if (matches[0] == 'do()') {
        shouldSum = true
      } else if (matches[0] == "don't()") {
        shouldSum = false
      } else {
        if (shouldSum) {
          nums = values.exec(matches[0])
          sum += nums[1] * nums[2]
        }
      }
    }
  })
  console.log(sum)
})
