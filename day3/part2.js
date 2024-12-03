const fs = require('fs')
let pattern = /mul\(\d*,\d*\)|do\(\)|don't\(\)/g
let values = /(\d+)\s*,\s*(\d+)/
fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) throw err
  const spl = data.split('\n')
  let sum = 0
  let shouldSum = true
  spl.forEach((el) => {
    let matches
    while ((matches = pattern.exec(el)) != null) {
      if (matches[0] === 'do()') {
        shouldSum = true
      } else if (matches[0] === "don't()") {
        shouldSum = false
      } else if (shouldSum) {
        const nums = values.exec(matches[0])
        if (nums) {
          sum += nums[1] * nums[2]
        }
      }
    }
  })
  console.log(sum)
})
