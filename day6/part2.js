const fs = require('fs')

let map
let directions = ['^', '>', 'v', '<']
let current = '^'
let guardCoords = { x: 0, y: 0 }
let startCoords = { x: 0, y: 0 }

const rotate = () => {
  current = directions[(directions.indexOf(current) + 1) % 4]
}

const move = () => {
  map[guardCoords.y][guardCoords.x] = 'X'
  if (current === '^') {
    guardCoords.y--
  } else if (current === '>') {
    guardCoords.x++
  } else if (current === '<') {
    guardCoords.x--
  } else if (current === 'v') {
    guardCoords.y++
  }
  map[guardCoords.y][guardCoords.x] = current
}

const frontIsOut = () => {
  let { x, y } = guardCoords
  if (current === '^') {
    return y - 1 < 0
  } else if (current === '>') {
    return x + 1 >= map[0].length
  } else if (current === '<') {
    return x - 1 < 0
  } else if (current === 'v') {
    return y + 1 >= map.length
  }
}

const frontIsObstacle = () => {
  let { x, y } = guardCoords
  if (current === '^') {
    return map[y - 1]?.[x] === '#'
  } else if (current === '>') {
    return map[y]?.[x + 1] === '#'
  } else if (current === '<') {
    return map[y]?.[x - 1] === '#'
  } else if (current === 'v') {
    return map[y + 1]?.[x] === '#'
  }
}

const countX = () => {
  let count = 0
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === 'X') {
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
        startCoords.x = j
        startCoords.y = i
        current = '^'
      }
    }
  }
}

const smartMove = () => {
  while (frontIsObstacle()) {
    rotate()
  }
  if (!frontIsOut()) {
    move()
  }
}

let count = 0
let history = []

const isInHistory = ({ x, y, orientation }) => {
  return history.some(
    (item) => item.x === x && item.y === y && item.orientation === orientation,
  )
}
const playGame = () => {
  while (!frontIsOut()) {
    smartMove()
    let curr = { x: guardCoords.x, y: guardCoords.y, orientation: current }
    if (isInHistory(curr)) {
      count++
      break
    }
    history.push(curr)
  }
  guardCoords.x = startCoords.x
  guardCoords.y = startCoords.y
  current = '^'
  history = []
}

const printMap = () => {
  console.log(map.map((row) => row.join('')).join('\n'))
  console.log('\n')
}

const cloneMap = (originalMap) => {
  return originalMap.map((row) => [...row])
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) throw err
  map = data
    .split('\n')
    .filter((row) => row.trim() !== '')
    .map((el) => el.split(''))
  findGuard()

  const originalMap = cloneMap(map)

  let prev = 0
  let iterCount = 0
  for (let i = 0; i < originalMap.length; i++) {
    for (let j = 0; j < originalMap[0].length; j++) {
      iterCount++
      if (
        originalMap[i][j] !== '#' &&
        !directions.includes(originalMap[i][j])
      ) {
        map = cloneMap(originalMap)
        guardCoords.x = startCoords.x
        guardCoords.y = startCoords.y
        map[i][j] = '#'
        playGame()
      }
      if (count != prev) {
        console.log(
          count,
          (iterCount / (originalMap.length * originalMap[0].length)) * 100 +
            '%',
        )
      }
      prev = count
    }
  }
})
