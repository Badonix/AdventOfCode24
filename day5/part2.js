const fs = require('fs')

fs.readFile('input.txt', 'utf-8', (err, data) => {
  let rules = data.split('\n\n')[0]
  let updates = data.split('\n\n')[1].split('\n')
  updates.pop()
  rules = generateMap(rules)
  let count = 0
  updates.forEach((update) => {
    if (!checkUpdate(update, rules)) {
      let res = sortByRules(update.split(','), rules)
      count += Number(res[(res.length - 1) / 2])
    }
  })
  console.log(count)
})

function sortByRules(input, rules) {
  function getPrecedenceMap(rules) {
    const precedence = {}
    for (const [key, values] of Object.entries(rules)) {
      if (!precedence[key]) precedence[key] = new Set()
      for (const value of values) {
        if (!precedence[value]) precedence[value] = new Set()
        precedence[value].add(key)
      }
    }
    return precedence
  }
  const precedenceMap = getPrecedenceMap(rules)
  function compare(a, b) {
    if (precedenceMap[a] && precedenceMap[a].has(b)) {
      return -1
    }
    if (precedenceMap[b] && precedenceMap[b].has(a)) {
      return 1
    }
    return 0
  }
  return input.sort(compare)
}

const checkUpdate = (update, hashmap) => {
  if (typeof update == 'string') {
    update = update.split(',')
    update = update.map((el) => Number(el))
  }
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
