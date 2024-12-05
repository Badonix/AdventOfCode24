const fs = require('fs')

fs.readFile('input.txt', 'utf-8', (err, data) => {
  let rules = data.split('\n\n')[0]
  let updates = data.split('\n\n')[1].split('\n')
  updates.pop()
  rules = generateMap(rules)
  let count = 0
  updates.forEach((update) => {
    if (checkUpdate(update, rules)) {
      let up = update.split(',')
      let middle = Number(up[(up.length - 1) / 2])
      count += middle
    }
  })
  console.log(count)
})

const checkUpdate = (update, hashmap) => {
  update = update.split(',')
  update = update.map((el) => Number(el))
  let isValid = true
  update.forEach((el, index) => {
    let currentRules = hashmap[el]
    if (currentRules) {
      currentRules.forEach((rule) => {
        if (update.indexOf(rule) < index && update.indexOf(rule) != -1) {
          isValid = false
        }
      })
    }
  })
  return isValid
}

const generateMap = (rules) => {
  let hashmap = {}
  rules.split('\n').forEach((el) => {
    let key = Number(el.split('|')[0])
    let val = Number(el.split('|')[1])
    if (hashmap[key] == undefined) {
      hashmap[key] = [val]
    } else {
      hashmap[key].push(val)
    }
  })
  return hashmap
}
