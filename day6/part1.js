const fs = require('fs')

let map
let directions = ['^', '>', 'v', '<']
let current = '^'
let guardCoords = { x: 0, y: 0 }

const rotate = () => {
  current = directions[(directions.indexOf(current) + 1) % 4]
}

const move = () => {
  map[guardCoords.y][guardCoords.x] = 'X'
  if (current == '^') {
    guardCoords.y--
  } else if (current == '>') {
    guardCoords.x++
  } else if (current == '<') {
    guardCoords.x--
  } else if (current == 'v') {
    guardCoords.y++
  }
  map[guardCoords.y][guardCoords.x] = current
}

const frontIsOut = () => {
  let { x, y } = guardCoords
  if (current == '^') {
    return y - 1 < 0
  } else if (current == '>') {
    return x + 1 >= map[0].length
  } else if (current == '<') {
    return x - 1 < 0
  } else if (current == 'v') {
    return y + 1 >= map.length
  }
}

const frontIsObstacle = () => {
  let { x, y } = guardCoords
  if (current == '^') {
    return map[y - 1]?.[x] == '#'
  } else if (current == '>') {
    return map[y]?.[x + 1] == '#'
  } else if (current == '<') {
    return map[y]?.[x - 1] == '#'
  } else if (current == 'v') {
    return map[y + 1]?.[x] == '#'
  }
}

const countX = () => {
  let count = 0
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] == 'X') {
        count++
      }
    }
  }
  return count
}

const findGuard = () => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (directions.includes(map[i][j])) {
        guardCoords.x = j
        guardCoords.y = i
        current = map[i][j]
      }
    }
  }
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) throw err
  map = data.split('\n').map((el) => el.split(''))
  findGuard()

  while (!frontIsOut()) {
    while (frontIsObstacle()) {
      rotate()
    }
    console.log('MOVING')
    if (!frontIsOut()) {
      move()
    }
  }

  console.log(map.map((row) => row.join('')).join('\n'))
  console.log(countX())
})
