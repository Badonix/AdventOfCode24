const fs = require('fs')

fs.readFile('input.txt', 'utf-8', (err, data) => {
  let counter = 0
  let arr = data.split('\n')
  arr.pop()
  arr = arr.map((el) => el.split(''))
  console.log(arr)
  for (let i = 0; i < arr.length; i++) {
    for (j = 0; j < arr[0].length; j++) {}
  }
})
