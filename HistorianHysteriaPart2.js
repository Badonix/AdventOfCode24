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
  let hashmap = calculateOccurence(first, second)
  first.forEach((num) => {
    count += num * hashmap[num]
  })
  console.log(count)
})

const calculateOccurence = (arr1, arr2) => {
  let map = {}
  arr1.forEach((el) => {
    if (map[el] == undefined) {
      let count = 0
      arr2.forEach((num) => {
        if (num == el) {
          count++
        }
      })
      map[el] = count
    }
  })
  return map
}
